import type { Template } from "@/lib/firebase/schema";

export const 학생자치: Template = {
  id: "edu-student-council",
  name: "학생자치 의견 수렴",
  description: "학생회·학생자치회에서 활용하는 자유 의견 수렴 양식. 학교 생활·행사·규칙 개선 제안 중심.",
  category: "학생자치",
  source: "사용자제공",
  isOfficial: true,
  usageCount: 0,
  tags: ["학생자치", "학생회", "의견수렴", "자유응답"],
  questions: [
    {
      id: "q1",
      type: "long",
      title: "우리 학교(또는 학급)에서 가장 좋다고 생각하는 점은 무엇인가요?",
      required: false,
    },
    {
      id: "q2",
      type: "long",
      title: "우리 학교(또는 학급)에서 꼭 바뀌었으면 하는 점은 무엇인가요?",
      required: true,
    },
    {
      id: "q3",
      type: "multiple",
      title: "올해 학생회가 중점적으로 추진했으면 하는 활동은? (모두 선택)",
      required: true,
      options: [
        { id: "a", label: "학교 행사·축제" },
        { id: "b", label: "학교 규칙 개선" },
        { id: "c", label: "동아리 활성화" },
        { id: "d", label: "친구 사이 화합 캠페인" },
        { id: "e", label: "환경·봉사 활동" },
      ],
    },
    {
      id: "q4",
      type: "long",
      title: "올해 진행했으면 하는 행사나 이벤트 아이디어를 자유롭게 적어주세요.",
      required: false,
    },
    {
      id: "q5",
      type: "long",
      title: "학생회·학교에 전하고 싶은 말을 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
