"use client";
import { useBuilder } from "@/stores/surveyBuilder";
import type { Question, Condition } from "@/lib/firebase/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

export function ConditionBuilder({ question }: { question: Question }) {
  const survey = useBuilder((s) => s.survey);
  const updateQuestion = useBuilder((s) => s.updateQuestion);
  const condition: Condition = question.showIf ?? { operator: "AND", rules: [] };
  const qIndex = survey.questions.findIndex((q) => q.id === question.id);
  const earlierQuestions = survey.questions.slice(0, qIndex).filter((q) => q.type !== "section");

  const addRule = () => {
    const firstQ = earlierQuestions[0];
    if (!firstQ) return;
    const newRule = { questionId: firstQ.id, operator: "eq" as const, value: "" };
    updateQuestion(question.id, {
      showIf: { ...condition, rules: [...condition.rules, newRule] },
    });
  };

  if (earlierQuestions.length === 0) {
    return (
      <p className="text-xs text-slate-500">앞선 문항이 있어야 조건을 설정할 수 있어요.</p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm">다음 조건이</span>
        <Select
          value={condition.operator}
          onValueChange={(v: string) =>
            updateQuestion(question.id, {
              showIf: { ...condition, operator: v as "AND" | "OR" },
            })
          }
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">모두</SelectItem>
            <SelectItem value="OR">하나라도</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm">맞을 때 표시</span>
      </div>

      {condition.rules.map((rule, i) => {
        const target = earlierQuestions.find((q) => q.id === rule.questionId);
        return (
          <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <Select
              value={rule.questionId}
              onValueChange={(v) => {
                const rules = [...condition.rules];
                rules[i] = { ...rules[i]!, questionId: v };
                updateQuestion(question.id, { showIf: { ...condition, rules } });
              }}
            >
              <SelectTrigger className="flex-1 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {earlierQuestions.map((q) => (
                  <SelectItem key={q.id} value={q.id}>
                    {q.title.slice(0, 20)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={rule.operator}
              onValueChange={(v) => {
                const rules = [...condition.rules];
                rules[i] = { ...rules[i]!, operator: v as Condition["rules"][0]["operator"] };
                updateQuestion(question.id, { showIf: { ...condition, rules } });
              }}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eq">같음</SelectItem>
                <SelectItem value="neq">다름</SelectItem>
                <SelectItem value="gt">초과</SelectItem>
                <SelectItem value="lt">미만</SelectItem>
                <SelectItem value="contains">포함</SelectItem>
              </SelectContent>
            </Select>
            {target?.options ? (
              <Select
                value={String(rule.value)}
                onValueChange={(v) => {
                  const rules = [...condition.rules];
                  rules[i] = { ...rules[i]!, value: v };
                  updateQuestion(question.id, { showIf: { ...condition, rules } });
                }}
              >
                <SelectTrigger className="flex-1 h-8">
                  <SelectValue placeholder="값" />
                </SelectTrigger>
                <SelectContent>
                  {target.options.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="text"
                value={String(rule.value)}
                onChange={(e) => {
                  const rules = [...condition.rules];
                  rules[i] = { ...rules[i]!, value: e.target.value };
                  updateQuestion(question.id, { showIf: { ...condition, rules } });
                }}
                className="flex-1 h-8 text-sm"
                placeholder="값"
              />
            )}
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => {
                const rules = condition.rules.filter((_, idx) => idx !== i);
                updateQuestion(question.id, { showIf: { ...condition, rules } });
              }}
              aria-label="조건 삭제"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        );
      })}

      <Button size="sm" variant="outline" onClick={addRule} className="w-full">
        <Plus className="h-3 w-3" /> 조건 추가
      </Button>
    </div>
  );
}
