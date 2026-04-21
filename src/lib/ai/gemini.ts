import type { Question, Option } from "@/lib/firebase/schema";
import { nanoid } from "nanoid";

const MODEL = "gemini-2.5-flash-lite";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export interface QuestionGenInput {
  topic: string;
  target: "teacher";
  desiredOutcome: string;
  questionCount: number;
  preferredTypes?: string[];
}

interface RawQuestion {
  type: Question["type"];
  title: string;
  description?: string;
  required?: boolean;
  options?: Array<{ label: string }>;
  scale?: { min: number; max: number; labels?: string[] };
}

export async function generateQuestions(input: QuestionGenInput): Promise<Question[]> {
  if (input.target !== "teacher") {
    throw new Error("AI 문항 생성은 교사 대상 설문에서만 사용할 수 있어요.");
  }
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API 키가 설정되지 않았어요.");
  }

  const prompt = buildPrompt(input);

  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.6,
        topP: 0.9,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Gemini API 오류 (${res.status}): ${errText.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) throw new Error("AI 응답이 비어있어요.");

  let parsed: RawQuestion[];
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned) as RawQuestion[];
  } catch {
    throw new Error("AI 응답 파싱 실패. 다시 시도해주세요.");
  }
  if (!Array.isArray(parsed)) {
    throw new Error("AI가 배열을 반환하지 않았어요.");
  }

  return parsed.map((raw): Question => {
    const id = nanoid(8);
    const options: Option[] | undefined = raw.options?.map((o) => ({
      id: nanoid(4),
      label: o.label,
    }));
    return {
      id,
      type: raw.type,
      title: raw.title,
      description: raw.description,
      required: raw.required ?? true,
      options,
      scale: raw.scale,
    };
  });
}

function buildPrompt(input: QuestionGenInput): string {
  return `당신은 한국 초·중등 교육 현장의 교사 대상 설문 설계 전문가입니다.
한국교육과정평가원과 각 시도교육청의 공식 교사 설문 양식(수업평가, 학교자체평가, 동료평가 등)을 참고하여
아래 요청에 맞는 설문 문항을 설계합니다.

[요청]
- 주제: ${input.topic}
- 얻고 싶은 결과: ${input.desiredOutcome}
- 문항 수: ${input.questionCount}개
- 선호 문항 유형: ${input.preferredTypes?.join(", ") ?? "자유"}

[출력 형식]
다음 JSON 배열 형식으로만 응답하세요. 다른 설명·머리말·마크다운·코드펜스 일절 금지.

[
  {
    "type": "likert5" | "single" | "multiple" | "short" | "long" | "rank" | "nps",
    "title": "문항 제목 (존댓말)",
    "description": "보조 설명 (선택)",
    "required": true,
    "options": [{ "label": "선택지" }],
    "scale": { "min": 1, "max": 5, "labels": ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"] }
  }
]

[제약]
- 5점 리커트는 반드시 labels 5개 포함
- 객관식은 최소 4개, 최대 7개 선택지
- 주관식(short/long)은 1~2개만 (설문 피로도 고려)
- 한국어 존댓말, 교육청 감사·민원 대응 가능한 중립적 표현
- ${input.questionCount}개 정확히 출력`;
}
