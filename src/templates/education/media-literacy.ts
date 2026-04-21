import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

export const 미디어리터러시: Template = {
  id: "edu-media-literacy",
  name: "미디어 리터러시 진단",
  description: "교육부 미디어 리터러시 진단 양식. 정보 비판·가짜뉴스 식별·미디어 윤리 영역을 확인합니다.",
  category: "디지털",
  source: "교육부",
  isOfficial: true,
  usageCount: 0,
  tags: ["미디어", "가짜뉴스", "비판적사고", "교육부"],
  questions: [
    { id: "q1", type: "likert5", title: "나는 인터넷이나 SNS의 정보가 항상 사실이 아닐 수 있다는 것을 안다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "나는 본 기사나 영상이 사실인지 다른 자료로 확인해 본다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "나는 가짜뉴스(허위 정보)를 구별할 수 있다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "나는 광고와 일반 콘텐츠를 구분할 수 있다.", required: true, scale: SCALE },
    {
      id: "q5",
      type: "single",
      title: "정보를 가장 자주 얻는 매체는?",
      required: true,
      options: [
        { id: "a", label: "유튜브·동영상" },
        { id: "b", label: "SNS(인스타·틱톡 등)" },
        { id: "c", label: "포털 뉴스" },
        { id: "d", label: "신문·방송" },
        { id: "e", label: "책·교과서" },
      ],
    },
    { id: "q6", type: "likert5", title: "나는 댓글이나 게시물을 올릴 때 다른 사람의 입장을 생각한다.", required: true, scale: SCALE },
    { id: "q7", type: "likert5", title: "나는 저작권의 의미를 알고 다른 사람의 자료를 함부로 사용하지 않는다.", required: true, scale: SCALE },
    {
      id: "q8",
      type: "long",
      title: "가짜뉴스나 잘못된 정보 때문에 곤란했던 경험이 있다면 자유롭게 적어주세요.",
      required: false,
    },
  ],
};
