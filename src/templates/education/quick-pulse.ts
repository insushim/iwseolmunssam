import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];

export const 빠른펄스: Template = {
  id: "edu-quick-pulse",
  name: "빠른 펄스 (수업 직후)",
  description: "수업 직후 30초 안에 끝나는 초간단 체크. NPS + 5점척도 + 한 줄 피드백.",
  category: "기타",
  source: "사용자제공",
  isOfficial: true,
  usageCount: 0,
  tags: ["펄스", "NPS", "즉시", "초간단"],
  questions: [
    {
      id: "q1",
      type: "nps",
      title: "이번 수업을 친구에게 추천한다면 몇 점을 주시겠습니까?",
      description: "0점(전혀 추천하지 않음) ~ 10점(매우 강력히 추천)",
      required: true,
      scale: { min: 0, max: 10 },
    },
    {
      id: "q2",
      type: "likert5",
      title: "오늘 수업을 통해 새로운 것을 배웠다.",
      required: true,
      scale: { min: 1, max: 5, labels: LIKERT5_LABELS },
    },
    {
      id: "q3",
      type: "long",
      title: "오늘 수업에 대해 한 줄로 의견을 남겨주세요.",
      required: false,
    },
  ],
};
