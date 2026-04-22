import { onCall, HttpsError, CallableRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { setGlobalOptions } from 'firebase-functions/v2';
import { logger } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { customAlphabet } from 'nanoid';

admin.initializeApp();
const db = admin.firestore();

setGlobalOptions({ region: 'asia-northeast3', maxInstances: 10 });

const REGION = 'asia-northeast3';
const TZ = 'Asia/Seoul';

const nanoidShortCode = customAlphabet('0123456789', 6);
const nanoidToken = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 10);

interface SurveyQuestion {
  id: string;
  type: string;
  text: string;
  options?: string[];
  required?: boolean;
}

interface ConsentPayload {
  required: boolean;
  items: string[];
  retention: number;
  customText?: string;
}

interface BrandingPayload {
  color: string;
  logo?: string;
}

interface CreateSurveyData {
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  retentionDays?: number;
  duplicateMode?: 'none' | 'fingerprint' | 'hash' | 'token';
  anonymous?: boolean;
  targetType?: 'student' | 'parent' | 'teacher';
  consent?: ConsentPayload;
  branding?: BrandingPayload;
  locale?: string[];
}

interface SubmitResponseData {
  surveyId: string;
  answers: Record<string, unknown>;
  fingerprint?: string;
  hash?: string;
  token?: string;
  clientMeta?: Record<string, unknown>;
}

interface GenerateTokensData {
  surveyId: string;
  count: number;
}

function requireAuth(req: CallableRequest): string {
  const uid = req.auth?.uid;
  if (!uid) {
    throw new HttpsError('unauthenticated', '로그인이 필요합니다.');
  }
  return uid;
}

async function uniqueShortCode(): Promise<string> {
  for (let i = 0; i < 10; i++) {
    const code = nanoidShortCode();
    const exists = await db
      .collection('surveys')
      .where('shortCode', '==', code)
      .limit(1)
      .get();
    if (exists.empty) return code;
  }
  throw new HttpsError('internal', 'shortCode 생성 실패');
}

export const createSurvey = onCall(
  { region: REGION, cors: true },
  async (req: CallableRequest<CreateSurveyData>) => {
    const teacherId = requireAuth(req);
    const data = req.data;

    if (!data?.title || typeof data.title !== 'string') {
      throw new HttpsError('invalid-argument', 'title이 필요합니다.');
    }
    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      throw new HttpsError('invalid-argument', 'questions가 필요합니다.');
    }
    const retentionDays = Math.min(Math.max(Number(data.retentionDays ?? 7), 1), 30);

    const shortCode = await uniqueShortCode();
    const now = admin.firestore.Timestamp.now();
    const autoDeleteAt = admin.firestore.Timestamp.fromMillis(
      now.toMillis() + retentionDays * 24 * 60 * 60 * 1000,
    );

    const targetType: 'student' | 'parent' | 'teacher' =
      data.targetType === 'parent' || data.targetType === 'teacher' ? data.targetType : 'student';
    const consent: ConsentPayload = data.consent ?? { required: false, items: [], retention: 7 };
    const branding: BrandingPayload = {
      color: data.branding?.color ?? '#6366f1',
      ...(data.branding?.logo ? { logo: data.branding.logo } : {}),
    };
    const locale: string[] = Array.isArray(data.locale) && data.locale.length > 0 ? data.locale : ['ko'];

    const surveyRef = db.collection('surveys').doc();
    await surveyRef.set({
      id: surveyRef.id,
      teacherId,
      title: data.title,
      description: data.description ?? '',
      questions: data.questions,
      shortCode,
      status: 'open',
      duplicateMode: data.duplicateMode ?? 'fingerprint',
      anonymous: data.anonymous ?? true,
      retentionDays,
      responseCount: 0,
      createdAt: now,
      updatedAt: now,
      autoDeleteAt,
      targetType,
      consent,
      branding,
      locale,
    });

    return { surveyId: surveyRef.id, shortCode, autoDeleteAt: autoDeleteAt.toMillis() };
  },
);

export const submitResponse = onCall(
  { region: REGION, cors: true },
  async (req: CallableRequest<SubmitResponseData>) => {
    const data = req.data;
    if (!data?.surveyId || typeof data.surveyId !== 'string') {
      throw new HttpsError('invalid-argument', 'surveyId가 필요합니다.');
    }
    if (!data.answers || typeof data.answers !== 'object') {
      throw new HttpsError('invalid-argument', 'answers가 필요합니다.');
    }

    const surveyRef = db.collection('surveys').doc(data.surveyId);
    const surveySnap = await surveyRef.get();
    if (!surveySnap.exists) {
      throw new HttpsError('not-found', '설문을 찾을 수 없습니다.');
    }
    const survey = surveySnap.data()!;
    if (survey.status !== 'open') {
      throw new HttpsError('failed-precondition', '마감된 설문입니다.');
    }
    if (survey.autoDeleteAt && survey.autoDeleteAt.toMillis() < Date.now()) {
      throw new HttpsError('failed-precondition', '만료된 설문입니다.');
    }

    const dupMode = survey.duplicateMode ?? 'fingerprint';
    const responsesRef = surveyRef.collection('responses');

    if (dupMode === 'fingerprint' && data.fingerprint) {
      const dup = await responsesRef
        .where('fingerprint', '==', data.fingerprint)
        .limit(1)
        .get();
      if (!dup.empty) {
        throw new HttpsError('already-exists', '이미 응답하셨습니다.');
      }
    } else if (dupMode === 'hash' && data.hash) {
      const dup = await responsesRef.where('hash', '==', data.hash).limit(1).get();
      if (!dup.empty) {
        throw new HttpsError('already-exists', '이미 응답하셨습니다.');
      }
    }

    // IP 절대 저장 안 함 — clientMeta에서 ip 필드 제거
    const safeMeta: Record<string, unknown> = { ...(data.clientMeta ?? {}) };
    delete safeMeta.ip;
    delete safeMeta.IP;
    delete safeMeta.remoteAddress;
    delete safeMeta.xForwardedFor;

    const responseRef = responsesRef.doc();
    const payload: Record<string, unknown> = {
      id: responseRef.id,
      surveyId: data.surveyId,
      answers: data.answers,
      submittedAt: admin.firestore.Timestamp.now(),
      clientMeta: safeMeta,
    };
    if (data.fingerprint) payload.fingerprint = data.fingerprint;
    if (data.hash) payload.hash = data.hash;

    if (dupMode === 'token') {
      if (!data.token) {
        throw new HttpsError('invalid-argument', '토큰이 필요합니다.');
      }
      const tokenRef = surveyRef.collection('tokens').doc(data.token);
      await db.runTransaction(async (tx) => {
        const tokenSnap = await tx.get(tokenRef);
        if (!tokenSnap.exists) {
          throw new HttpsError('not-found', '유효하지 않은 토큰입니다.');
        }
        const tokenData = tokenSnap.data()!;
        if (tokenData.used) {
          throw new HttpsError('already-exists', '이미 사용된 토큰입니다.');
        }
        tx.update(tokenRef, {
          used: true,
          usedAt: admin.firestore.Timestamp.now(),
        });
        payload.token = data.token;
        tx.set(responseRef, payload);
        tx.update(surveyRef, {
          responseCount: admin.firestore.FieldValue.increment(1),
        });
      });
    } else {
      await responseRef.set(payload);
      await surveyRef.update({
        responseCount: admin.firestore.FieldValue.increment(1),
      });
    }

    return { responseId: responseRef.id };
  },
);

export const generateTokens = onCall(
  { region: REGION, cors: true },
  async (req: CallableRequest<GenerateTokensData>) => {
    const teacherId = requireAuth(req);
    const data = req.data;

    if (!data?.surveyId || typeof data.surveyId !== 'string') {
      throw new HttpsError('invalid-argument', 'surveyId가 필요합니다.');
    }
    const count = Math.floor(Number(data.count));
    if (!Number.isFinite(count) || count < 1 || count > 500) {
      throw new HttpsError('invalid-argument', 'count는 1~500 사이여야 합니다.');
    }

    const surveyRef = db.collection('surveys').doc(data.surveyId);
    const surveySnap = await surveyRef.get();
    if (!surveySnap.exists) {
      throw new HttpsError('not-found', '설문을 찾을 수 없습니다.');
    }
    if (surveySnap.data()!.teacherId !== teacherId) {
      throw new HttpsError('permission-denied', '권한이 없습니다.');
    }

    const tokens: string[] = [];
    const now = admin.firestore.Timestamp.now();
    // Firestore batch limit = 500
    const batch = db.batch();
    const tokensRef = surveyRef.collection('tokens');
    const seen = new Set<string>();
    while (tokens.length < count) {
      const t = nanoidToken();
      if (seen.has(t)) continue;
      seen.add(t);
      tokens.push(t);
      batch.set(tokensRef.doc(t), {
        id: t,
        surveyId: data.surveyId,
        used: false,
        createdAt: now,
      });
    }
    await batch.commit();

    return { tokens, count: tokens.length };
  },
);

async function deleteCollection(
  collectionRef: admin.firestore.CollectionReference,
  batchSize = 400,
): Promise<number> {
  let total = 0;
  while (true) {
    const snap = await collectionRef.limit(batchSize).get();
    if (snap.empty) break;
    const batch = db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    total += snap.size;
    if (snap.size < batchSize) break;
  }
  return total;
}

export const autoDelete = onSchedule(
  {
    schedule: 'every 1 hours',
    timeZone: TZ,
    region: REGION,
  },
  async () => {
    const now = admin.firestore.Timestamp.now();
    const expired = await db
      .collection('surveys')
      .where('autoDeleteAt', '<=', now)
      .limit(50)
      .get();

    if (expired.empty) {
      logger.info('[autoDelete] 만료된 설문 없음');
      return;
    }

    let surveyCount = 0;
    let responseCount = 0;
    let tokenCount = 0;

    for (const doc of expired.docs) {
      const surveyRef = doc.ref;
      responseCount += await deleteCollection(surveyRef.collection('responses'));
      tokenCount += await deleteCollection(surveyRef.collection('tokens'));
      await surveyRef.delete();
      surveyCount += 1;
    }

    logger.info('[autoDelete] 완료', { surveyCount, responseCount, tokenCount });
  },
);
