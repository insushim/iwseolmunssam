"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBuilder } from "@/stores/surveyBuilder";
import { useAuth } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Save, Send, Sparkles } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { toast } from "sonner";
import Link from "next/link";
import { AIGeneratorDialog } from "./AIGeneratorDialog";
import { SaveTemplateDialog } from "./SaveTemplateDialog";

export function BuilderHeader({ onPreview }: { onPreview: () => void }) {
  const router = useRouter();
  const { user } = useAuth();
  const survey = useBuilder((s) => s.survey);
  const setMeta = useBuilder((s) => s.setMeta);
  const reset = useBuilder((s) => s.reset);
  const [publishing, setPublishing] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);

  const handlePublish = async () => {
    if (!user) {
      toast.error("로그인이 필요해요");
      return;
    }
    if (survey.questions.length === 0) {
      toast.error("문항을 1개 이상 추가해주세요");
      return;
    }
    setPublishing(true);
    try {
      const create = httpsCallable<unknown, { surveyId: string; shortCode: string; autoDeleteAt: number }>(functions, "createSurvey");
      const res = await create({
        title: survey.title,
        description: survey.description,
        questions: survey.questions,
        anonymous: survey.isAnonymous,
        duplicateMode: survey.duplicatePrevention,
        retentionDays: survey.retention.serverDays,
        targetType: survey.targetType,
        consent: survey.consent,
        branding: survey.branding,
        locale: survey.locale,
      });
      if (!res.data?.surveyId) {
        throw new Error("게시 응답이 올바르지 않습니다.");
      }
      toast.success("설문이 게시되었어요!");
      reset();
      router.push(`/surveys/${res.data.surveyId}/share`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "게시 실패";
      toast.error(msg);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <header className="border-b bg-white px-4 py-3 flex items-center gap-4">
      <Link href="/dashboard" className="font-bold text-sm text-indigo-600">
        ← 대시보드
      </Link>
      <Input
        value={survey.title}
        onChange={(e) => setMeta("title", e.target.value)}
        className="max-w-md font-medium"
        placeholder="설문 제목"
      />
      <div className="flex-1" />
      {survey.targetType === "teacher" && (
        <Button variant="outline" onClick={() => setAiOpen(true)}>
          <Sparkles className="h-4 w-4" />
          AI 생성
        </Button>
      )}
      <Button variant="outline" onClick={() => setSaveOpen(true)}>
        <Save className="h-4 w-4" />
        내 템플릿 저장
      </Button>
      <Button variant="outline" onClick={onPreview}>
        <Eye className="h-4 w-4" />
        미리보기
      </Button>
      <Button onClick={handlePublish} disabled={publishing}>
        <Send className="h-4 w-4" />
        {publishing ? "게시 중..." : "게시하기"}
      </Button>
      <AIGeneratorDialog open={aiOpen} onOpenChange={setAiOpen} />
      <SaveTemplateDialog open={saveOpen} onOpenChange={setSaveOpen} />
    </header>
  );
}
