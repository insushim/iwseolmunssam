import { customAlphabet } from "nanoid";
import {
  writeBatch,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

const tokenAlphabet = customAlphabet("ABCDEFGHJKMNPQRSTUVWXYZ23456789", 10);

export async function generateTokens(
  surveyId: string,
  count: number,
  labels?: string[]
): Promise<string[]> {
  const batch = writeBatch(db);
  const tokens: string[] = [];
  for (let i = 0; i < count; i++) {
    const id = tokenAlphabet();
    tokens.push(id);
    const ref = doc(db, `surveys/${surveyId}/tokens/${id}`);
    batch.set(ref, {
      id,
      label: labels?.[i] ?? null,
      used: false,
      createdAt: Timestamp.now(),
    });
  }
  await batch.commit();
  return tokens;
}

export async function consumeToken(surveyId: string, tokenId: string): Promise<boolean> {
  const ref = doc(db, `surveys/${surveyId}/tokens/${tokenId}`);
  const snap = await getDoc(ref);
  if (!snap.exists() || snap.data().used) return false;
  await updateDoc(ref, { used: true, usedAt: Timestamp.now() });
  return true;
}
