import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 학부모만족도: Template = {
  id: "edu-parent-satisfaction",
  name: "학부모 만족도 조사",
  description: "시도교육청 표준 학부모 만족도 양식. 교육과정·생활지도·소통·시설 등을 진단합니다.",
  category: "학부모만족도",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["학부모", "만족도", "학교운영", "필수조사"],
  questions: [
    {
      id: "q0",
      type: "section",
      title: "안내드립니다",
      description: "학부모님의 소중한 의견은 학교 교육 개선을 위한 자료로만 활용되며, 응답은 익명으로 처리됩니다. 솔직한 답변을 부탁드립니다.",
      required: false,
    },
    { id: "q1", type: "likert5", title: "학교의 교육과정이 자녀의 성장에 도움이 된다고 생각한다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "담임 선생님께서 자녀에게 관심을 가지고 지도하신다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "학교는 학생의 인성 및 생활 지도에 노력하고 있다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "학교는 학부모와 원활하게 소통하고 있다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "학교 행사 및 가정통신문 안내가 충분히 이루어진다.", required: true, scale: SCALE },
    { id: "q6", type: "likert5", title: "학교의 안전 관리 및 학교폭력 예방 활동에 만족한다.", required: true, scale: SCALE },
    { id: "q7", type: "likert5", title: "학교의 급식 및 보건 위생 관리에 만족한다.", required: true, scale: SCALE },
    { id: "q8", type: "likert5", title: "학교의 시설 및 환경에 만족한다.", required: true, scale: SCALE },
    { id: "q9", type: "likert5", title: "전반적으로 우리 학교에 만족한다.", required: true, scale: SCALE },
    {
      id: "q10",
      type: "long",
      title: "학교 운영에 대해 건의하고 싶은 사항이나 의견을 자유롭게 적어주시기 바랍니다.",
      required: false,
    },
  ],
};
