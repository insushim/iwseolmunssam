"use client";
import { useBuilder } from "@/stores/surveyBuilder";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsPanel() {
  const survey = useBuilder((s) => s.survey);
  const setMeta = useBuilder((s) => s.setMeta);

  return (
    <div className="p-4 space-y-4 border-t">
      <h3 className="text-xs font-semibold uppercase text-slate-500">설문 설정</h3>

      <div className="space-y-2">
        <Label>응답 대상</Label>
        <Select
          value={survey.targetType}
          onValueChange={(v) => setMeta("targetType", v as typeof survey.targetType)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">학생</SelectItem>
            <SelectItem value="parent">학부모</SelectItem>
            <SelectItem value="teacher">교직원</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="anon">익명 설문</Label>
        <Switch
          id="anon"
          checked={survey.isAnonymous}
          onCheckedChange={(v) => setMeta("isAnonymous", v)}
        />
      </div>

      <div className="space-y-2">
        <Label>중복 방지 방식</Label>
        <Select
          value={survey.duplicatePrevention}
          onValueChange={(v) =>
            setMeta("duplicatePrevention", v as typeof survey.duplicatePrevention)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">없음 (자유 응답)</SelectItem>
            <SelectItem value="token">일회용 토큰</SelectItem>
            <SelectItem value="fingerprint">기기 지문</SelectItem>
            <SelectItem value="hash">학번+생일 해시</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>서버 보관 기간</Label>
        <Select
          value={String(survey.retention.serverDays)}
          onValueChange={(v) =>
            setMeta("retention", { ...survey.retention, serverDays: parseInt(v) })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1일</SelectItem>
            <SelectItem value="3">3일</SelectItem>
            <SelectItem value="7">7일</SelectItem>
            <SelectItem value="30">30일 (권장 X)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-slate-500">기간 만료 후 서버에서 자동 삭제됩니다.</p>
      </div>
    </div>
  );
}
