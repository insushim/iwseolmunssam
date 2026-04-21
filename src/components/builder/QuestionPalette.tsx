"use client";
import { useBuilder } from "@/stores/surveyBuilder";
import {
  Circle,
  CheckSquare,
  BarChart3,
  Star,
  ListOrdered,
  Type,
  AlignLeft,
  Image as ImageIcon,
  Minus,
  Gauge,
} from "lucide-react";
import type { Question } from "@/lib/firebase/schema";

const TYPES: Array<{
  type: Question["type"];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { type: "single", label: "객관식 (단일)", icon: Circle },
  { type: "multiple", label: "객관식 (복수)", icon: CheckSquare },
  { type: "likert5", label: "5점 리커트", icon: BarChart3 },
  { type: "likert7", label: "7점 리커트", icon: BarChart3 },
  { type: "rank", label: "순위 정하기", icon: ListOrdered },
  { type: "short", label: "단답 주관식", icon: Type },
  { type: "long", label: "서술 주관식", icon: AlignLeft },
  { type: "imageChoice", label: "이미지 선택", icon: ImageIcon },
  { type: "star", label: "별점", icon: Star },
  { type: "nps", label: "NPS (0~10)", icon: Gauge },
  { type: "section", label: "섹션 구분", icon: Minus },
];

export function QuestionPalette() {
  const addQuestion = useBuilder((s) => s.addQuestion);
  return (
    <div className="p-4 space-y-1">
      <h3 className="text-xs font-semibold uppercase text-slate-500 mb-2">문항 추가</h3>
      {TYPES.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => addQuestion(type)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-left text-sm"
        >
          <Icon className="h-4 w-4 text-slate-400" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
