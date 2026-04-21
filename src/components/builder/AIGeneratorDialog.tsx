"use client";
import { useState } from "react";
import { useBuilder } from "@/stores/surveyBuilder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateQuestions } from "@/lib/ai/gemini";
import { Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function AIGeneratorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const survey = useBuilder((s) => s.survey);
  const loadFromTemplate = useBuilder((s) => s.loadFromTemplate);
  const [topic, setTopic] = useState("");
  const [outcome, setOutcome] = useState("");
  const [count, setCount] = useState(8);
  const [loading, setLoading] = useState(false);

  if (survey.targetType !== "teacher") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              교사 설문에서만 사용 가능
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              AI 문항 생성은 <b>교사·교직원 대상 설문</b>에서만 사용할 수 있어요.
            </p>
            <p>
              학생·학부모 대상 설문에서는 응답자 데이터 보호와 법적 안전성을 위해
              AI를 거치지 않습니다. 검증된 템플릿이나 직접 작성하기를 이용해주세요.
            </p>
            <p className="text-xs text-slate-500">
              설문 설정에서 응답 대상을 &quot;교직원&quot;으로 변경하면 AI 생성을
              사용할 수 있어요.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("설문 주제를 입력해주세요");
      return;
    }
    setLoading(true);
    try {
      const questions = await generateQuestions({
        topic: topic.trim(),
        target: "teacher",
        desiredOutcome: outcome.trim() || "교내 의견 수렴",
        questionCount: count,
      });
      loadFromTemplate(questions);
      toast.success(`${questions.length}개 문항이 생성되었어요`);
      onOpenChange(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "AI 문항 생성 실패";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI 문항 자동 생성
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
            <strong>안내:</strong> 입력한 <b>주제</b>는 Google Gemini로 전송됩니다. 응답
            결과는 전송되지 않습니다. (모델: gemini-2.5-flash-lite)
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="topic">설문 주제</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="예: 학년말 교육과정 운영 평가"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="outcome">얻고 싶은 결과 (선택)</Label>
            <Textarea
              id="outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="예: 내년도 학사일정 수립을 위한 개선점 파악"
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="count">문항 수 (3~20)</Label>
            <Input
              id="count"
              type="number"
              min={3}
              max={20}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value || "8"))}
            />
          </div>
          <Button onClick={handleGenerate} disabled={!topic || loading} className="w-full">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "생성 중..." : "문항 생성하기"}
          </Button>
          <p className="text-xs text-slate-500 text-center">
            기존 문항은 새로 생성된 문항으로 대체됩니다.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
