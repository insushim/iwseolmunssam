"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { Survey, Question, Option } from "@/lib/firebase/schema";

interface BuilderStore {
  survey: Survey;
  selectedQuestionId: string | null;
  isDirty: boolean;
  setMeta: <K extends keyof Survey>(key: K, value: Survey[K]) => void;
  addQuestion: (type: Question["type"]) => string;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  removeQuestion: (id: string) => void;
  reorderQuestions: (from: number, to: number) => void;
  duplicateQuestion: (id: string) => void;
  addOption: (questionId: string) => void;
  updateOption: (questionId: string, optionId: string, updates: Partial<Option>) => void;
  removeOption: (questionId: string, optionId: string) => void;
  select: (id: string | null) => void;
  reset: (initial?: Survey) => void;
  loadFromTemplate: (questions: Question[]) => void;
}

const emptyQuestion = (type: Question["type"]): Question => {
  const baseOptions: Option[] = ["single", "multiple", "imageChoice", "rank"].includes(type)
    ? [
        { id: nanoid(4), label: "선택지 1" },
        { id: nanoid(4), label: "선택지 2" },
      ]
    : [];

  return {
    id: nanoid(8),
    type,
    title: type === "section" ? "섹션 제목" : "질문을 입력하세요",
    required: false,
    options: baseOptions.length ? baseOptions : undefined,
    scale:
      type === "likert5"
        ? { min: 1, max: 5, labels: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"] }
        : type === "likert7"
          ? { min: 1, max: 7 }
          : type === "nps"
            ? { min: 0, max: 10 }
            : type === "star"
              ? { min: 1, max: 5 }
              : undefined,
  };
};

const emptySurvey = (): Survey => ({
  id: nanoid(10),
  teacherId: "",
  title: "제목 없는 설문",
  description: "",
  targetType: "student",
  isAnonymous: true,
  duplicatePrevention: "token",
  questions: [],
  consent: { required: true, items: [], retention: 7 },
  branding: { color: "#4F46E5" },
  distribution: { shortCode: "", qrUrl: "", expiresAt: null },
  retention: { serverDays: 1, autoDeleteAt: null },
  status: "draft",
  createdAt: null,
  updatedAt: null,
  locale: ["ko"],
});

export const useBuilder = create<BuilderStore>()(
  persist(
    (set) => ({
      survey: emptySurvey(),
      selectedQuestionId: null,
      isDirty: false,
      setMeta: (key, value) =>
        set((s) => ({ survey: { ...s.survey, [key]: value }, isDirty: true })),
      addQuestion: (type) => {
        const newQ = emptyQuestion(type);
        set((s) => ({
          survey: { ...s.survey, questions: [...s.survey.questions, newQ] },
          selectedQuestionId: newQ.id,
          isDirty: true,
        }));
        return newQ.id;
      },
      updateQuestion: (id, updates) =>
        set((s) => ({
          survey: {
            ...s.survey,
            questions: s.survey.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
          },
          isDirty: true,
        })),
      removeQuestion: (id) =>
        set((s) => ({
          survey: {
            ...s.survey,
            questions: s.survey.questions.filter((q) => q.id !== id),
          },
          selectedQuestionId: s.selectedQuestionId === id ? null : s.selectedQuestionId,
          isDirty: true,
        })),
      reorderQuestions: (from, to) =>
        set((s) => {
          const q = [...s.survey.questions];
          const [moved] = q.splice(from, 1);
          if (moved) q.splice(to, 0, moved);
          return { survey: { ...s.survey, questions: q }, isDirty: true };
        }),
      duplicateQuestion: (id) =>
        set((s) => {
          const idx = s.survey.questions.findIndex((q) => q.id === id);
          if (idx === -1) return s;
          const orig = s.survey.questions[idx]!;
          const dup: Question = {
            ...orig,
            id: nanoid(8),
            title: `${orig.title} (복사본)`,
            options: orig.options?.map((o) => ({ ...o, id: nanoid(4) })),
          };
          const q = [...s.survey.questions];
          q.splice(idx + 1, 0, dup);
          return { survey: { ...s.survey, questions: q }, isDirty: true };
        }),
      addOption: (questionId) =>
        set((s) => ({
          survey: {
            ...s.survey,
            questions: s.survey.questions.map((q) => {
              if (q.id !== questionId) return q;
              const opts = q.options ?? [];
              return {
                ...q,
                options: [...opts, { id: nanoid(4), label: `선택지 ${opts.length + 1}` }],
              };
            }),
          },
          isDirty: true,
        })),
      updateOption: (questionId, optionId, updates) =>
        set((s) => ({
          survey: {
            ...s.survey,
            questions: s.survey.questions.map((q) =>
              q.id !== questionId
                ? q
                : {
                    ...q,
                    options: q.options?.map((o) => (o.id === optionId ? { ...o, ...updates } : o)),
                  }
            ),
          },
          isDirty: true,
        })),
      removeOption: (questionId, optionId) =>
        set((s) => ({
          survey: {
            ...s.survey,
            questions: s.survey.questions.map((q) =>
              q.id !== questionId
                ? q
                : { ...q, options: q.options?.filter((o) => o.id !== optionId) }
            ),
          },
          isDirty: true,
        })),
      select: (id) => set({ selectedQuestionId: id }),
      reset: (initial) => set({ survey: initial ?? emptySurvey(), isDirty: false, selectedQuestionId: null }),
      loadFromTemplate: (questions) =>
        set((s) => ({
          survey: { ...s.survey, questions: questions.map((q) => ({ ...q, id: nanoid(8) })) },
          isDirty: true,
        })),
    }),
    { name: "surveysaem-builder" }
  )
);
