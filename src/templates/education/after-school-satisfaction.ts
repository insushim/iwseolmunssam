import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 방과후만족도: Template = {
  id: "edu-after-school-satisfaction",
  name: "방과후 프로그램 만족도",
  description: "시도교육청 방과후학교 만족도 표준 양식. 강좌 내용·강사·시설·운영 만족도를 확인합니다.",
  category: "급식방과후",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["방과후", "만족도", "프로그램"],
  questions: [
    { id: "q1", type: "likert5", title: "방과후 프로그램의 내용이 흥미롭고 유익하다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "강사 선생님께서 친절하고 잘 가르치신다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "프로그램에 사용되는 교재·교구가 적절하다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "수업 장소(교실·강당)와 시설이 적절하다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "전반적으로 방과후 프로그램에 만족한다.", required: true, scale: SCALE },
    {
      id: "q6",
      type: "long",
      title: "추가로 개설되었으면 하는 강좌나 개선 의견이 있다면 적어주세요.",
      required: false,
    },
  ],
};
