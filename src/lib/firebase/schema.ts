import type { Timestamp } from "firebase/firestore";

export type QuestionType =
  | "single"
  | "multiple"
  | "likert5"
  | "likert7"
  | "rank"
  | "short"
  | "long"
  | "imageChoice"
  | "star"
  | "section"
  | "nps";

export interface Option {
  id: string;
  label: string;
  image?: string;
  translations?: Record<string, string>;
}

export interface Condition {
  operator: "AND" | "OR";
  rules: Array<{
    questionId: string;
    operator: "eq" | "neq" | "gt" | "lt" | "contains";
    value: string | number;
  }>;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  image?: string;
  latex?: string;
  required: boolean;
  options?: Option[];
  scale?: { min: number; max: number; labels?: string[] };
  showIf?: Condition;
  translations?: Record<string, { title: string; description?: string }>;
}

export interface ConsentConfig {
  required: boolean;
  items: string[];
  retention: number;
  customText?: string;
}

export interface SurveyDistribution {
  shortCode: string;
  qrUrl: string;
  expiresAt: Timestamp | null;
  maxResponses?: number | null;
}

export interface SurveyRetention {
  serverDays: number;
  autoDeleteAt: Timestamp | null;
}

export interface Survey {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  targetType: "student" | "parent" | "teacher";
  isAnonymous: boolean;
  duplicatePrevention: "fingerprint" | "token" | "hash" | "none";
  questions: Question[];
  consent: ConsentConfig;
  branding: { color: string; logo?: string };
  distribution: SurveyDistribution;
  retention: SurveyRetention;
  status: "draft" | "open" | "closed" | "archived";
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  locale: string[];
}

export type AnswerValue = string | number | string[] | boolean;

export interface Response {
  id: string;
  submittedAt: Timestamp;
  fingerprint?: string | null;
  tokenId?: string | null;
  hashId?: string | null;
  answers: Record<string, AnswerValue>;
  locale: string;
  clientMeta: {
    userAgent: string;
    screenSize: string;
  };
}

export interface Token {
  id: string;
  label?: string | null;
  used: boolean;
  usedAt?: Timestamp | null;
  createdAt: Timestamp;
}

export interface Teacher {
  uid: string;
  email: string;
  displayName: string;
  school?: string;
  grade?: string;
  templates: string[];
  preferences: {
    defaultRetention: number;
    defaultAnonymous: boolean;
    language: string;
  };
  createdAt: Timestamp;
}

export type TemplateCategory =
  | "학생실태"
  | "학부모만족도"
  | "학교폭력실태"
  | "독서실태"
  | "수업만족도"
  | "학교자체평가"
  | "교직원"
  | "진로"
  | "디지털"
  | "급식방과후"
  | "체험학습"
  | "학생자치"
  | "기타";

export interface Template {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  source: "평가원" | "교육부" | "시도교육청" | "사용자제공";
  isOfficial: boolean;
  questions: Question[];
  usageCount: number;
  tags: string[];
}
