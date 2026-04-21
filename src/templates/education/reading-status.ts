import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];

export const 독서실태: Template = {
  id: "edu-reading-status",
  name: "학생 독서 실태 조사",
  description: "한국교육과정평가원 독서 실태 조사 양식 기반. 독서 빈도·태도·환경을 진단합니다.",
  category: "독서실태",
  source: "평가원",
  isOfficial: true,
  usageCount: 0,
  tags: ["독서", "학생", "평가원", "초등", "중등"],
  questions: [
    {
      id: "q1",
      type: "single",
      title: "지난 한 달 동안 교과서 외에 읽은 책은 몇 권인가요?",
      required: true,
      options: [
        { id: "a", label: "한 권도 읽지 않았다" },
        { id: "b", label: "1~2권" },
        { id: "c", label: "3~5권" },
        { id: "d", label: "6~10권" },
        { id: "e", label: "10권 이상" },
      ],
    },
    {
      id: "q2",
      type: "single",
      title: "하루 평균 책을 읽는 시간은 얼마나 되나요?",
      required: true,
      options: [
        { id: "a", label: "전혀 읽지 않는다" },
        { id: "b", label: "30분 미만" },
        { id: "c", label: "30분 ~ 1시간" },
        { id: "d", label: "1시간 ~ 2시간" },
        { id: "e", label: "2시간 이상" },
      ],
    },
    {
      id: "q3",
      type: "multiple",
      title: "주로 읽는 책의 종류는 무엇인가요? (모두 선택)",
      required: true,
      options: [
        { id: "a", label: "동화/소설(문학)" },
        { id: "b", label: "위인전/역사" },
        { id: "c", label: "과학/수학" },
        { id: "d", label: "만화/그래픽노블" },
        { id: "e", label: "학습 참고서" },
      ],
    },
    {
      id: "q4",
      type: "likert5",
      title: "나는 책 읽기를 좋아한다.",
      required: true,
      scale: { min: 1, max: 5, labels: LIKERT5_LABELS },
    },
    {
      id: "q5",
      type: "likert5",
      title: "책을 읽으면 새로운 것을 알게 되어 즐겁다.",
      required: true,
      scale: { min: 1, max: 5, labels: LIKERT5_LABELS },
    },
    {
      id: "q6",
      type: "single",
      title: "책을 주로 어디에서 구하나요?",
      required: true,
      options: [
        { id: "a", label: "학교 도서관" },
        { id: "b", label: "공공 도서관" },
        { id: "c", label: "서점에서 구매" },
        { id: "d", label: "전자책/온라인" },
        { id: "e", label: "집에 있는 책" },
      ],
    },
    {
      id: "q7",
      type: "long",
      title: "책을 더 많이 읽기 위해 학교나 선생님께 바라는 점이 있다면 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
