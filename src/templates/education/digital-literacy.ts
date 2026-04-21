import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 디지털역량: Template = {
  id: "edu-digital-literacy",
  name: "디지털 역량 조사",
  description: "교육부 디지털 시민 역량 진단 양식. 디지털 기기 활용·정보 검색·보안·윤리 영역을 진단합니다.",
  category: "디지털",
  source: "교육부",
  isOfficial: true,
  usageCount: 0,
  tags: ["디지털", "AI", "정보윤리", "교육부"],
  questions: [
    { id: "q1", type: "likert5", title: "나는 컴퓨터나 태블릿을 수업에 필요한 만큼 잘 사용할 수 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "나는 인터넷에서 필요한 정보를 잘 찾을 수 있다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "나는 인터넷에서 찾은 정보가 믿을 만한지 판단할 수 있다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "나는 문서·발표 자료를 디지털 도구로 만들 수 있다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "나는 비밀번호 관리·개인정보 보호의 중요성을 알고 실천한다.", required: true, scale: SCALE },
    { id: "q6", type: "likert5", title: "나는 온라인에서 다른 사람을 존중하며 예절을 지킨다.", required: true, scale: SCALE },
    {
      id: "q7",
      type: "single",
      title: "하루 평균 스마트폰·태블릿·PC를 사용하는 시간(학습 외)은?",
      required: true,
      options: [
        { id: "a", label: "1시간 미만" },
        { id: "b", label: "1~2시간" },
        { id: "c", label: "2~4시간" },
        { id: "d", label: "4~6시간" },
        { id: "e", label: "6시간 이상" },
      ],
    },
    {
      id: "q8",
      type: "multiple",
      title: "AI(예: 챗봇, 번역기)를 어디에 사용해 본 적 있나요? (모두 선택)",
      required: false,
      options: [
        { id: "a", label: "숙제·과제 도움" },
        { id: "b", label: "글쓰기·번역" },
        { id: "c", label: "검색·질문" },
        { id: "d", label: "그림·영상 만들기" },
        { id: "e", label: "사용해 본 적 없다" },
      ],
    },
    { id: "q9", type: "likert5", title: "학교에서 디지털·AI 교육을 충분히 받고 있다.", required: true, scale: SCALE },
    {
      id: "q10",
      type: "long",
      title: "디지털·AI 교육에서 더 배우고 싶은 내용이 있다면 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
