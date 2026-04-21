"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import type { Question, Response } from "@/lib/firebase/schema";
import { aggregateChoice, aggregateScale } from "@/lib/analytics/aggregate";

const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"];

export function ResultChart({
  question,
  responses,
}: {
  question: Question;
  responses: Response[];
}) {
  if (question.type === "single" || question.type === "multiple" || question.type === "imageChoice") {
    const data = aggregateChoice(question, responses).map((d) => ({
      name: d.label,
      값: d.count,
      퍼센트: d.percent,
    }));
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(v) => `${v}명`}
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
            />
            <Bar dataKey="값" radius={[0, 6, 6, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
              <LabelList dataKey="값" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (
    question.type === "likert5" ||
    question.type === "likert7" ||
    question.type === "star" ||
    question.type === "nps"
  ) {
    const agg = aggregateScale(question, responses);
    const min = question.scale?.min ?? 1;
    const data = agg.distribution.map((count, i) => ({
      name: String(min + i),
      값: count,
    }));
    return (
      <div>
        <div className="flex items-center justify-around mb-4">
          <Stat label="평균" value={agg.avg.toFixed(2)} />
          <Stat label="응답 수" value={String(agg.count)} />
          <Stat label="만점" value={String(question.scale?.max ?? "-")} />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(v) => [`${v}명`, "응답"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="값" fill="#4F46E5" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="값" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return null;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-2xl font-bold text-indigo-600">{value}</div>
    </div>
  );
}
