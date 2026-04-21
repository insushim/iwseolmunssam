"use client";
import { useBuilder } from "@/stores/surveyBuilder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ConditionBuilder } from "./ConditionBuilder";

export function QuestionEditor() {
  const survey = useBuilder((s) => s.survey);
  const selectedQuestionId = useBuilder((s) => s.selectedQuestionId);
  const updateQuestion = useBuilder((s) => s.updateQuestion);
  const addOption = useBuilder((s) => s.addOption);
  const updateOption = useBuilder((s) => s.updateOption);
  const removeOption = useBuilder((s) => s.removeOption);

  const question = survey.questions.find((q) => q.id === selectedQuestionId);

  if (!question) {
    return (
      <div className="p-4 text-center text-sm text-slate-500">
        문항을 선택하면 여기서 편집할 수 있어요.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-xs font-semibold uppercase text-slate-500">문항 속성</h3>

      <div className="space-y-2">
        <Label htmlFor="q-title">질문</Label>
        <Textarea
          id="q-title"
          value={question.title}
          onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="q-desc">보조 설명 (선택)</Label>
        <Textarea
          id="q-desc"
          value={question.description ?? ""}
          onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
          rows={2}
          placeholder="문항에 대한 추가 안내"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="q-required">필수 응답</Label>
        <Switch
          id="q-required"
          checked={question.required}
          onCheckedChange={(v) => updateQuestion(question.id, { required: v })}
        />
      </div>

      {(question.type === "single" ||
        question.type === "multiple" ||
        question.type === "imageChoice" ||
        question.type === "rank") && (
        <div className="space-y-2">
          <Label>선택지</Label>
          <div className="space-y-2">
            {(question.options ?? []).map((o, i) => (
              <div key={o.id} className="flex gap-2">
                <Input
                  value={o.label}
                  onChange={(e) => updateOption(question.id, o.id, { label: e.target.value })}
                  placeholder={`선택지 ${i + 1}`}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeOption(question.id, o.id)}
                  aria-label="선택지 삭제"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => addOption(question.id)}>
              <Plus className="h-3 w-3" />
              선택지 추가
            </Button>
          </div>
        </div>
      )}

      {(question.type === "likert5" || question.type === "likert7" || question.type === "star" || question.type === "nps") && (
        <div className="space-y-2">
          <Label>척도 범위</Label>
          <div className="flex gap-2 items-center text-sm">
            <span className="text-slate-500">최소</span>
            <Input
              type="number"
              className="w-16"
              value={question.scale?.min ?? 1}
              onChange={(e) =>
                updateQuestion(question.id, {
                  scale: {
                    ...(question.scale ?? { min: 1, max: 5 }),
                    min: parseInt(e.target.value || "1"),
                  },
                })
              }
            />
            <span className="text-slate-500">최대</span>
            <Input
              type="number"
              className="w-16"
              value={question.scale?.max ?? 5}
              onChange={(e) =>
                updateQuestion(question.id, {
                  scale: {
                    ...(question.scale ?? { min: 1, max: 5 }),
                    max: parseInt(e.target.value || "5"),
                  },
                })
              }
            />
          </div>
        </div>
      )}

      <div className="pt-4 border-t space-y-2">
        <Label className="text-xs uppercase">조건부 표시</Label>
        <ConditionBuilder question={question} />
      </div>
    </div>
  );
}
