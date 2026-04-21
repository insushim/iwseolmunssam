import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 교직원의견: Template = {
  id: "edu-staff-opinion",
  name: "교직원 의견 조사",
  description: "시도교육청 교직원 의견 조사 표준 양식. 학교 운영·소통·업무·전문성·복지 영역.",
  category: "교직원",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["교직원", "교사", "학교운영", "동료평가"],
  questions: [
    {
      id: "q0",
      type: "section",
      title: "안내",
      description: "본 조사는 학교 운영 개선을 위해 실시되며, 응답은 익명으로 수집·집계됩니다. 동료 교직원으로서 솔직한 의견을 부탁드립니다.",
      required: false,
    },
    { id: "q1", type: "likert5", title: "학교의 비전과 목표가 구성원들과 충분히 공유되고 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "학교장의 의사결정 과정이 민주적이고 합리적이다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교직원 간 의사소통이 원활하게 이루어진다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "업무 분장이 공정하고 합리적으로 이루어진다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "행정 업무 부담이 적정하여 수업·생활지도에 집중할 수 있다.", required: true, scale: SCALE },
    { id: "q6", type: "likert5", title: "교원의 전문성 신장을 위한 연수 및 지원이 충분하다.", required: true, scale: SCALE },
    { id: "q7", type: "likert5", title: "학생 생활지도 및 학부모 민원 대응에 학교 차원의 지원이 적절하다.", required: true, scale: SCALE },
    { id: "q8", type: "likert5", title: "교직원의 복지 및 근무 환경(휴게·시설)이 만족스럽다.", required: true, scale: SCALE },
    { id: "q9", type: "likert5", title: "전반적으로 우리 학교에서 근무하는 것에 만족한다.", required: true, scale: SCALE },
    {
      id: "q10",
      type: "long",
      title: "학교 운영 개선을 위해 제안하고 싶은 사항을 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
