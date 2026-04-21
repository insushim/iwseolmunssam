import type { Question, Response } from "@/lib/firebase/schema";

export interface ChoiceCount {
  optionId: string;
  label: string;
  count: number;
  percent: number;
}

export function aggregateChoice(question: Question, responses: Response[]): ChoiceCount[] {
  if (!question.options) return [];
  const total = responses.length;
  return question.options.map((o) => {
    const count = responses.filter((r) => {
      const a = r.answers[question.id];
      return Array.isArray(a) ? a.includes(o.id) : a === o.id;
    }).length;
    return {
      optionId: o.id,
      label: o.label,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
    };
  });
}

export function aggregateScale(
  question: Question,
  responses: Response[]
): { values: number[]; avg: number; count: number; distribution: number[] } {
  const values = responses
    .map((r) => r.answers[question.id])
    .filter((v): v is number => typeof v === "number");
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const min = question.scale?.min ?? 1;
  const max = question.scale?.max ?? 5;
  const distribution: number[] = [];
  for (let i = min; i <= max; i++) {
    distribution.push(values.filter((v) => v === i).length);
  }
  return { values, avg, count: values.length, distribution };
}
