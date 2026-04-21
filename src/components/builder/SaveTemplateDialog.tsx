"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useBuilder } from "@/stores/surveyBuilder";
import { useAuth } from "@/stores/auth";
import { saveCustomTemplate } from "@/lib/firebase/customTemplates";
import type { TemplateCategory } from "@/lib/firebase/schema";

const CATEGORIES: TemplateCategory[] = [
  "학생실태",
  "학부모만족도",
  "교직원",
  "수업만족도",
  "학교자체평가",
  "진로",
  "디지털",
  "급식방과후",
  "체험학습",
  "학생자치",
  "기타",
];

export function SaveTemplateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { user } = useAuth();
  const survey = useBuilder((s) => s.survey);
  const [name, setName] = useState(survey.title || "");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TemplateCategory>("기타");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      toast.error("로그인이 필요해요");
      return;
    }
    if (!name.trim()) {
      toast.error("템플릿 이름을 입력해주세요");
      return;
    }
    if (survey.questions.length === 0) {
      toast.error("문항을 1개 이상 추가해주세요");
      return;
    }
    setSaving(true);
    try {
      await saveCustomTemplate(user.uid, {
        name: name.trim(),
        description: description.trim(),
        category,
        questions: survey.questions,
      });
      toast.success("내 템플릿에 저장되었어요");
      onOpenChange(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "저장 실패";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5 text-indigo-600" />
            내 템플릿으로 저장
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            현재 만든 설문을 자신의 템플릿으로 저장하면, 다음에 같은 양식으로 빠르게
            새 설문을 만들 수 있어요.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="tpl-name">템플릿 이름</Label>
            <Input
              id="tpl-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 우리 반 주간 펄스"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tpl-desc">설명 (선택)</Label>
            <Textarea
              id="tpl-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="템플릿 용도, 사용 방법 등"
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label>카테고리</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as TemplateCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            <Save className="h-4 w-4" />
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
