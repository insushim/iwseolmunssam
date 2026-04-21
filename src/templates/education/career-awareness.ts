import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 진로인식: Template = {
  id: "edu-career-awareness",
  name: "진로 인식 조사",
  description: "한국교육과정평가원·커리어넷 기반 진로 성숙도 진단. 자기이해·직업관·진로 탐색 활동을 확인합니다.",
  category: "진로",
  source: "평가원",
  isOfficial: true,
  usageCount: 0,
  tags: ["진로", "커리어넷", "자기이해", "초등", "중등"],
  questions: [
    { id: "q1", type: "likert5", title: "나는 내가 잘하는 것이 무엇인지 알고 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "나는 내가 좋아하는 일이 무엇인지 알고 있다.", required: true, scale: SCALE },
    {
      id: "q3",
      type: "single",
      title: "나의 장래 희망(꿈)이 정해져 있나요?",
      required: true,
      options: [
        { id: "a", label: "확실하게 정해져 있다" },
        { id: "b", label: "대체로 정해져 있다" },
        { id: "c", label: "여러 개를 고민 중이다" },
        { id: "d", label: "아직 잘 모르겠다" },
        { id: "e", label: "전혀 생각해 본 적이 없다" },
      ],
    },
    {
      id: "q4",
      type: "multiple",
      title: "내 진로(꿈)에 대해 정보를 얻는 방법은? (모두 선택)",
      required: true,
      options: [
        { id: "a", label: "부모님이나 가족" },
        { id: "b", label: "선생님" },
        { id: "c", label: "책이나 영상(유튜브 등)" },
        { id: "d", label: "커리어넷·진로정보망" },
        { id: "e", label: "친구" },
      ],
    },
    { id: "q5", type: "likert5", title: "나는 다양한 직업에 대해 관심을 가지고 알아본다.", required: true, scale: SCALE },
    { id: "q6", type: "likert5", title: "나는 꿈을 이루기 위해 무엇을 해야 할지 계획을 세우고 있다.", required: true, scale: SCALE },
    { id: "q7", type: "likert5", title: "학교의 진로 수업이나 진로 체험 활동이 도움이 된다.", required: true, scale: SCALE },
    {
      id: "q8",
      type: "long",
      title: "진로(꿈) 찾기와 관련해 학교나 선생님께 바라는 점을 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
