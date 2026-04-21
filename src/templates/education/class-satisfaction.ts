import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 수업만족도: Template = {
  id: "edu-class-satisfaction",
  name: "수업 만족도 조사",
  description: "시도교육청 수업 만족도 표준 양식. 수업 내용·방법·교사 상호작용을 진단합니다.",
  category: "수업만족도",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["수업", "만족도", "학생평가", "리커트"],
  questions: [
    { id: "q1", type: "likert5", title: "수업 내용이 이해하기 쉽다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "선생님께서 수업 준비를 잘 해 오신다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "수업 시간에 다양한 활동(토론, 모둠, 실습)이 이루어진다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "선생님께서 학생의 질문에 친절하게 답해 주신다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "수업이 흥미롭고 재미있다.", required: true, scale: SCALE },
    { id: "q6", type: "likert5", title: "수업을 통해 새로운 것을 배우고 있다고 느낀다.", required: true, scale: SCALE },
    { id: "q7", type: "likert5", title: "선생님께서 학생을 공평하게 대하신다.", required: true, scale: SCALE },
    { id: "q8", type: "likert5", title: "전반적으로 이 수업에 만족한다.", required: true, scale: SCALE },
    {
      id: "q9",
      type: "long",
      title: "수업에서 가장 좋았던 점이 있다면 적어주세요.",
      required: false,
    },
    {
      id: "q10",
      type: "long",
      title: "수업에서 개선되었으면 하는 점이 있다면 적어주세요.",
      required: false,
    },
  ],
};
