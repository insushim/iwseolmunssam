"use client";
import { useState, useMemo } from "react";
import { useBuilder } from "@/stores/surveyBuilder";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QuestionRenderer } from "@/components/respondent/QuestionRenderer";
import { Button } from "@/components/ui/button";
import { evaluateCondition } from "@/lib/survey/logic";
import type { AnswerValue } from "@/lib/firebase/schema";

export function PreviewDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const survey = useBuilder((s) => s.survey);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [idx, setIdx] = useState(0);

  const visible = useMemo(
    () =>
      survey.questions.filter(
        (q) => q.type !== "section" && (!q.showIf || evaluateCondition(q.showIf, answers))
      ),
    [survey.questions, answers]
  );
  const current = visible[idx];

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogTitle className="sr-only">미리보기</DialogTitle>
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            미리보기 — 응답자에게는 이렇게 보입니다 ({idx + 1}/{visible.length || 1})
          </p>
          {current ? (
            <>
              <QuestionRenderer
                question={current}
                value={answers[current.id]}
                onChange={(v) => setAnswers({ ...answers, [current.id]: v })}
                index={idx + 1}
                total={visible.length}
              />
              <div className="flex justify-between pt-4">
                <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
                  이전
                </Button>
                <Button
                  disabled={idx === visible.length - 1}
                  onClick={() => setIdx(idx + 1)}
                >
                  다음
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-slate-500 py-12">표시할 문항이 없어요.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
