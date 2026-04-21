import type { Survey } from "@/lib/firebase/schema";

export interface ConsentText {
  title: string;
  purpose: string;
  items: string[];
  retention: string;
  thirdParty: string;
  rightsToRefuse: string;
  legalBasis: string;
  contact: string;
}

export function generateConsent(
  survey: Survey,
  teacherName: string,
  school: string
): ConsentText {
  const isStudent = survey.targetType === "student";
  const isParent = survey.targetType === "parent";
  const isTeacher = survey.targetType === "teacher";
  const anon = survey.isAnonymous;

  const items: string[] = [];
  if (!anon) {
    if (isStudent) items.push("학년/반/번호");
    if (isParent) items.push("학부모 성함", "자녀 학년·반");
    if (isTeacher) items.push("담당 학년/교과");
  }
  items.push("설문 응답 내용");
  if (anon) items.push("(개인식별정보는 수집하지 않습니다)");

  const targetLabel = isStudent ? "학생" : isParent ? "학부모" : "교직원";

  return {
    title: `「${survey.title}」 개인정보 수집·이용 안내`,
    purpose: `${school || "본교"} ${targetLabel} 대상 교육활동 목적의 의견 수렴`,
    items,
    retention: anon
      ? `본 설문의 응답 데이터는 서버에 최대 ${survey.retention.serverDays}일 보관 후 자동 삭제되며, 익명 집계 결과만 보존됩니다.`
      : `본 설문의 응답 데이터는 수집 목적 달성 후 즉시 파기되며, 보관 기간은 최대 ${survey.retention.serverDays}일입니다.`,
    thirdParty:
      "수집된 개인정보는 제3자에게 제공되지 않으며, 국외로 이전되지 않습니다. (서버 위치: 대한민국 서울)",
    rightsToRefuse: "본 설문 참여는 자율이며, 동의하지 않으셔도 불이익이 없습니다.",
    legalBasis: "「개인정보 보호법」 제15조 제1항 및 「초·중등교육법」 제20조에 근거합니다.",
    contact: `문의: ${school || "학교"} ${teacherName || "담당 교사"}`,
  };
}
