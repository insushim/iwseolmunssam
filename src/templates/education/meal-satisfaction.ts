import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 급식만족도: Template = {
  id: "edu-meal-satisfaction",
  name: "급식 만족도 조사",
  description: "시도교육청 학교급식 만족도 표준 양식. 메뉴·맛·위생·영양·잔반량을 진단합니다.",
  category: "급식방과후",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["급식", "만족도", "영양", "위생"],
  questions: [
    { id: "q1", type: "likert5", title: "급식 메뉴가 다양하고 변화가 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "급식의 위생 상태(식기·조리·배식)가 청결하다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "급식의 맛에 만족한다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "급식의 양이 적절하다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "급식이 영양적으로 균형 잡혀 있다고 생각한다.", required: true, scale: SCALE },
    {
      id: "q6",
      type: "single",
      title: "평소 급식 잔반(남기는 양)은 어느 정도인가요?",
      required: true,
      options: [
        { id: "a", label: "거의 남기지 않는다" },
        { id: "b", label: "1/4 정도 남긴다" },
        { id: "c", label: "절반 정도 남긴다" },
        { id: "d", label: "대부분 남긴다" },
        { id: "e", label: "전혀 먹지 않는다" },
      ],
    },
    {
      id: "q7",
      type: "long",
      title: "먹고 싶은 메뉴나 급식에 대한 건의사항을 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
