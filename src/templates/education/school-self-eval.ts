import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 학교자체평가: Template = {
  id: "edu-school-self-eval",
  name: "학교 자체평가",
  description: "시도교육청 학교 자체평가 표준 양식. 교육과정·학생지도·교직원·학부모·시설 등 5개 영역.",
  category: "학교자체평가",
  source: "시도교육청",
  isOfficial: true,
  usageCount: 0,
  tags: ["자체평가", "학교운영", "교육과정", "필수조사"],
  questions: [
    { id: "s1", type: "section", title: "1. 교육과정 운영", required: false },
    { id: "q1", type: "likert5", title: "학교 교육과정이 학생의 수준과 흥미를 반영하여 운영되고 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "교과 수업이 학생 참여 중심으로 이루어지고 있다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "창의적 체험활동(자율·동아리·봉사·진로)이 충실히 운영되고 있다.", required: true, scale: SCALE },

    { id: "s2", type: "section", title: "2. 학생 생활지도", required: false },
    { id: "q4", type: "likert5", title: "학교는 학생의 인성 함양을 위해 노력한다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "학교폭력 예방 및 안전 교육이 효과적으로 이루어진다.", required: true, scale: SCALE },
    { id: "q6", type: "likert5", title: "학생 상담 및 진로지도가 잘 이루어진다.", required: true, scale: SCALE },

    { id: "s3", type: "section", title: "3. 교직원 협력 및 전문성", required: false },
    { id: "q7", type: "likert5", title: "교직원 간 협력과 소통이 원활하다.", required: true, scale: SCALE },
    { id: "q8", type: "likert5", title: "교직원의 전문성 향상을 위한 연수와 지원이 충분하다.", required: true, scale: SCALE },
    { id: "q9", type: "likert5", title: "학교장의 리더십이 학교 운영에 긍정적 영향을 미친다.", required: true, scale: SCALE },

    { id: "s4", type: "section", title: "4. 학부모·지역사회 소통", required: false },
    { id: "q10", type: "likert5", title: "학교와 학부모 간 소통이 원활하다.", required: true, scale: SCALE },
    { id: "q11", type: "likert5", title: "학부모의 학교 교육 활동 참여 기회가 충분히 제공된다.", required: true, scale: SCALE },
    { id: "q12", type: "likert5", title: "지역사회 자원을 활용한 교육이 이루어진다.", required: true, scale: SCALE },

    { id: "s5", type: "section", title: "5. 학교 시설 및 환경", required: false },
    { id: "q13", type: "likert5", title: "교실 및 학교 시설이 학습에 적합하게 관리되고 있다.", required: true, scale: SCALE },
    { id: "q14", type: "likert5", title: "급식, 보건, 위생 환경이 적절히 관리되고 있다.", required: true, scale: SCALE },
    { id: "q15", type: "likert5", title: "전반적으로 우리 학교 운영에 만족한다.", required: true, scale: SCALE },
  ],
};
