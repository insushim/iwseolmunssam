import type { Question, Template, TemplateCategory } from "@/lib/firebase/schema";

export const L5 = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
export const S5 = { min: 1, max: 5, labels: L5 };

let counter = 0;
const nextId = () => {
  counter++;
  return `q${counter}`;
};
export const resetQid = () => {
  counter = 0;
};

export const lk = (title: string, required = true): Question => ({
  id: nextId(),
  type: "likert5",
  title,
  required,
  scale: S5,
});

export const sh = (title: string, required = false): Question => ({
  id: nextId(),
  type: "short",
  title,
  required,
});

export const lo = (title: string, required = false): Question => ({
  id: nextId(),
  type: "long",
  title,
  required,
});

export const sg = (
  title: string,
  options: string[],
  required = true
): Question => ({
  id: nextId(),
  type: "single",
  title,
  required,
  options: options.map((label, i) => ({ id: String.fromCharCode(97 + i), label })),
});

export const mu = (
  title: string,
  options: string[],
  required = false
): Question => ({
  id: nextId(),
  type: "multiple",
  title,
  required,
  options: options.map((label, i) => ({ id: String.fromCharCode(97 + i), label })),
});

export const st = (title: string, max = 5): Question => ({
  id: nextId(),
  type: "star",
  title,
  required: true,
  scale: { min: 1, max },
});

export const np = (title: string): Question => ({
  id: nextId(),
  type: "nps",
  title,
  required: true,
  scale: { min: 0, max: 10 },
});

export const sec = (title: string, description?: string): Question => ({
  id: nextId(),
  type: "section",
  title,
  required: false,
  description,
});

export function makeTemplate(
  id: string,
  name: string,
  category: TemplateCategory,
  builder: () => Question[],
  tags: string[] = []
): Template {
  resetQid();
  return {
    id,
    name,
    category,
    source: "사용자제공",
    isOfficial: false,
    questions: builder(),
    usageCount: 0,
    tags,
  };
}
