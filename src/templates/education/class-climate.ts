import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 학급분위기: Template = {
  id: "edu-class-climate",
  name: "학급 분위기 진단",
  description: "시도교육청 학급 분위기·또래관계 진단. 학생 간 관계·소속감·학급 규칙 인식을 확인합니다.",
  category: "학생실태",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["학급", "또래관계", "소속감", "생활지도"],
  questions: [
    { id: "q1", type: "likert5", title: "우리 반 친구들은 서로 사이좋게 지낸다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "나는 우리 반에 소속감을 느낀다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "어려운 일이 있을 때 도와줄 친구가 있다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "우리 반에는 함께 지키는 규칙이 있다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "우리 반에서는 서로 다른 의견을 존중한다.", required: true, scale: SCALE },
    { id: "q6", type: "likert5", title: "나는 학교에 오는 것이 즐겁다.", required: true, scale: SCALE },
    {
      id: "q7",
      type: "long",
      title: "우리 반이 더 좋은 분위기가 되기 위해 바뀌었으면 하는 점을 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
