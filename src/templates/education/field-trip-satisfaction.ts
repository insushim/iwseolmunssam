import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 체험학습만족도: Template = {
  id: "edu-field-trip-satisfaction",
  name: "체험학습 만족도 조사",
  description: "시도교육청 현장체험학습 만족도 표준 양식. 체험 장소·내용·안전·운영을 진단합니다.",
  category: "체험학습",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["체험학습", "현장학습", "수학여행", "만족도"],
  questions: [
    { id: "q1", type: "likert5", title: "체험학습 장소가 학습 목표에 적합했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "체험 활동이 흥미롭고 유익했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "이동·식사·일정 등 운영이 원활했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "체험학습 중 안전 관리가 잘 이루어졌다.", required: true, scale: SCALE },
    {
      id: "q5",
      type: "long",
      title: "다음 체험학습에 가고 싶은 장소나 건의 사항을 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
