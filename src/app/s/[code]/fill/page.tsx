"use client";
import { use, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase/client";
import type { Survey, AnswerValue } from "@/lib/firebase/schema";
import { evaluateCondition } from "@/lib/survey/logic";
import { getFingerprint } from "@/lib/survey/fingerprint";
import { consumeToken } from "@/lib/survey/tokens";
import { QuestionRenderer } from "@/components/respondent/QuestionRenderer";
import { ProgressBar } from "@/components/respondent/ProgressBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FillPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const sp = useSearchParams();
  const router = useRouter();
  const sid = sp.get("sid");
  const tokenId = sp.get("t");

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!sid) return;
    getDoc(doc(db, "surveys", sid)).then((snap) => {
      if (snap.exists()) setSurvey({ ...(snap.data() as Survey), id: snap.id });
    });
  }, [sid]);

  const visibleQuestions = useMemo(() => {
    if (!survey) return [];
    return survey.questions.filter(
      (q) => q.type !== "section" && (!q.showIf || evaluateCondition(q.showIf, answers))
    );
  }, [survey, answers]);

  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }
  if (visibleQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <p className="text-slate-600">표시할 문항이 없어요.</p>
      </div>
    );
  }

  const current = visibleQuestions[currentIdx]!;
  const progress = ((currentIdx + 1) / visibleQuestions.length) * 100;

  const handleNext = async () => {
    if (
      current.required &&
      (answers[current.id] === undefined ||
        answers[current.id] === "" ||
        (Array.isArray(answers[current.id]) && (answers[current.id] as string[]).length === 0))
    ) {
      toast.error("이 문항은 필수입니다");
      return;
    }
    if (currentIdx < visibleQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let fingerprint: string | null = null;
      if (survey.duplicatePrevention === "fingerprint") {
        fingerprint = await getFingerprint();
      }
      if (survey.duplicatePrevention === "token" && tokenId) {
        const ok = await consumeToken(survey.id, tokenId);
        if (!ok) {
          toast.error("이미 사용된 코드이거나 유효하지 않은 코드입니다");
          setSubmitting(false);
          return;
        }
      }
      await addDoc(collection(db, `surveys/${survey.id}/responses`), {
        submittedAt: Timestamp.now(),
        answers,
        fingerprint,
        tokenId: tokenId ?? null,
        locale: "ko",
        clientMeta: {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          screenSize:
            typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "",
        },
      });
      router.push(`/s/${code}/done`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "제출 실패";
      toast.error(msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <header className="p-4">
        <ProgressBar value={progress} />
      </header>
      <main className="flex-1 flex items-start sm:items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <QuestionRenderer
              question={current}
              value={answers[current.id]}
              onChange={(v) => setAnswers({ ...answers, [current.id]: v })}
              index={currentIdx + 1}
              total={visibleQuestions.length}
            />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="p-4 border-t bg-white/80 backdrop-blur sticky bottom-0">
        <div className="max-w-2xl mx-auto flex justify-between gap-3">
          <Button
            variant="outline"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
          >
            이전
          </Button>
          <Button onClick={handleNext} disabled={submitting} className="min-w-24">
            {submitting
              ? "제출 중..."
              : currentIdx === visibleQuestions.length - 1
                ? "제출"
                : "다음"}
          </Button>
        </div>
      </footer>
    </div>
  );
}
