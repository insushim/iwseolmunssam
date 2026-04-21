import type { Template, Question } from "@/lib/firebase/schema";

const L5 = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const S5 = { min: 1, max: 5, labels: L5 };

let qid = 0;
const q = (
  type: Question["type"],
  title: string,
  opts?: { required?: boolean; description?: string; options?: string[]; scale?: Question["scale"] }
): Question => {
  qid++;
  const base: Question = {
    id: `q${qid}`,
    type,
    title,
    required: opts?.required ?? true,
    description: opts?.description,
  };
  if (opts?.options) base.options = opts.options.map((label, i) => ({ id: String.fromCharCode(97 + i), label }));
  if (opts?.scale) base.scale = opts.scale;
  if (type === "likert5" && !base.scale) base.scale = S5;
  return base;
};
const resetQid = () => { qid = 0; };

const t = (id: string, name: string, questions: Question[], tags: string[]): Template => {
  resetQid();
  return {
    id,
    name,
    category: "교직원",
    source: "사용자제공",
    isOfficial: false,
    questions,
    usageCount: 0,
    tags,
  };
};

export const TEACHER_TEMPLATES: Template[] = [
  t("teacher-01-curriculum-h1", "학기말 교육과정 운영 평가", [
    q("likert5", "이번 학기 교육과정은 학년 특성에 맞게 운영되었다."),
    q("likert5", "교과 간 연계·통합 수업이 충분히 이루어졌다."),
    q("likert5", "프로젝트·주제중심 수업이 효과적으로 진행되었다."),
    q("likert5", "평가 계획이 수업과 일관성 있게 운영되었다."),
    q("likert5", "업무로 인해 수업 준비에 지장을 받지 않았다."),
    q("long", "이번 학기 교육과정 운영에서 개선할 점을 적어주세요.", { required: false }),
    q("long", "내년도에 시도해보고 싶은 수업 방식이나 프로젝트가 있다면?", { required: false }),
  ], ["교직원", "교육과정", "학기말"]),

  t("teacher-02-curriculum-year", "학년말 교육과정 종합평가", [
    q("likert5", "연간 교육과정 운영 계획은 학교 실정에 맞게 수립되었다."),
    q("likert5", "학년 간·학교급 간 연계가 원활했다."),
    q("likert5", "성취기준 기반 평가가 안착되었다."),
    q("likert5", "학기 중 교육과정 조정이 필요한 부분은 반영되었다."),
    q("likert5", "학부모·학생 의견이 교육과정에 반영되었다."),
    q("likert5", "전반적으로 올해 교육과정 운영에 만족한다."),
    q("long", "내년도 교육과정 편성 시 반영할 제안을 적어주세요.", { required: false }),
  ], ["교직원", "교육과정", "학년말"]),

  t("teacher-03-school-self-eval", "학교 자체평가 교사 의견", [
    q("likert5", "학교의 교육 비전·목표가 교직원 간에 공유되고 있다."),
    q("likert5", "학교 자체평가 지표가 학교 실정에 적합하다."),
    q("likert5", "자체평가 결과가 실제 학교 개선으로 이어진다."),
    q("likert5", "자체평가 과정에 교사 의견이 충분히 반영된다."),
    q("single", "자체평가에서 가장 중점적으로 다뤄야 할 영역은?", {
      options: ["교육과정·수업", "생활지도", "학부모·지역 연계", "복지·안전", "행정·재정"],
    }),
    q("long", "자체평가 지표 중 조정이 필요한 항목을 적어주세요.", { required: false }),
  ], ["교직원", "자체평가"]),

  t("teacher-04-grade-collab", "동학년 협의 만족도", [
    q("likert5", "동학년 협의가 정기적으로 이루어진다."),
    q("likert5", "동학년 협의 내용이 실제 수업에 도움이 된다."),
    q("likert5", "수업 자료·평가 도구를 원활히 공유하고 있다."),
    q("likert5", "동학년 협의에서 서로 존중하는 분위기가 형성되어 있다."),
    q("short", "동학년 협의 주기로 적절한 빈도를 적어주세요. (주 1회 등)", { required: false }),
    q("long", "개선할 점이나 건의사항을 적어주세요.", { required: false }),
  ], ["교직원", "동료", "협의"]),

  t("teacher-05-grade-leader", "학년 부장 리더십 평가", [
    q("likert5", "학년 부장은 학년 업무를 공정하게 배분한다."),
    q("likert5", "학년 부장은 구성원 의견을 경청하고 반영한다."),
    q("likert5", "학년 부장은 문제 발생 시 신속하게 조율한다."),
    q("likert5", "학년 부장은 학년 구성원의 전문성을 지원한다."),
    q("likert5", "전반적으로 학년 부장의 리더십에 만족한다."),
    q("long", "학년 부장에게 바라는 점이 있다면 적어주세요.", { required: false }),
  ], ["교직원", "리더십", "동료"]),

  t("teacher-06-principal-comm", "관리자 소통 만족도", [
    q("likert5", "교장·교감 선생님은 교직원 의견에 귀 기울인다."),
    q("likert5", "중요한 의사결정 과정이 투명하게 공유된다."),
    q("likert5", "갈등·민원 상황에서 관리자의 지원을 받고 있다."),
    q("likert5", "학교 비전과 방향성이 명확히 제시된다."),
    q("likert5", "관리자는 교사의 전문성을 존중한다."),
    q("long", "소통을 위해 개선할 사항을 적어주세요.", { required: false }),
  ], ["교직원", "관리자", "소통"]),

  t("teacher-07-admin-load", "학교 행정 업무 부담도", [
    q("likert5", "현재 맡은 행정 업무의 양이 적정하다."),
    q("likert5", "행정 업무가 수업 준비를 방해하지 않는다."),
    q("single", "가장 부담되는 업무 영역은?", {
      options: ["공문 처리", "예산·회계", "정보공시·감사", "학생 생활지도 기록", "외부 공모·사업", "기타"],
    }),
    q("likert5", "학교 내 업무 간소화 노력이 이루어지고 있다."),
    q("long", "줄이거나 개선했으면 하는 업무를 구체적으로 적어주세요.", { required: false }),
  ], ["교직원", "업무", "부담"]),

  t("teacher-08-duty-fairness", "업무분장 공정성 인식", [
    q("likert5", "올해 업무분장 과정이 공정했다."),
    q("likert5", "개인의 전문성·희망이 반영되었다."),
    q("likert5", "업무량이 구성원 간에 고르게 배분되었다."),
    q("likert5", "업무분장 결과에 대해 설명이 충분했다."),
    q("long", "내년도 업무분장에 대한 건의사항을 적어주세요.", { required: false }),
  ], ["교직원", "업무분장"]),

  t("teacher-09-meeting", "회의 운영 만족도", [
    q("likert5", "학교 회의가 적정한 빈도로 진행된다."),
    q("likert5", "회의 안건이 사전에 충분히 공유된다."),
    q("likert5", "회의 시간이 목적에 비해 적절하다."),
    q("likert5", "회의에서 자유롭게 의견을 낼 수 있는 분위기다."),
    q("single", "회의 방식 중 가장 선호하는 형태는?", {
      options: ["대면 전체회의", "학년/부서 소회의", "비대면(화상)", "서면 공람·댓글", "혼합"],
    }),
    q("long", "회의 운영 개선 제안을 적어주세요.", { required: false }),
  ], ["교직원", "회의"]),

  t("teacher-10-wellbeing", "교직원 휴게·복지 환경", [
    q("likert5", "교직원 휴게 공간이 충분하고 쾌적하다."),
    q("likert5", "점심·쉬는 시간에 실질적으로 쉴 수 있다."),
    q("likert5", "냉난방·공기질 등 근무 환경이 적정하다."),
    q("likert5", "교직원 복지(간식·동아리 등)에 만족한다."),
    q("long", "개선이 필요한 복지·환경 요소를 적어주세요.", { required: false }),
  ], ["교직원", "복지", "환경"]),

  t("teacher-11-vision", "학교 비전·목표 공유", [
    q("likert5", "학교의 비전이 명확히 제시되어 있다."),
    q("likert5", "비전이 실제 학교 운영에 반영된다."),
    q("likert5", "교직원들이 비전에 공감하고 있다."),
    q("likert5", "학생·학부모에게도 비전이 공유된다."),
    q("long", "비전을 강화하거나 수정할 제안을 적어주세요.", { required: false }),
  ], ["교직원", "비전"]),

  t("teacher-12-professional-dev", "교사 전문성 신장 기회", [
    q("likert5", "올해 연수·학습공동체 기회가 충분했다."),
    q("likert5", "관심 분야의 연수를 선택할 수 있었다."),
    q("likert5", "연수 내용이 실제 수업에 도움이 되었다."),
    q("multiple", "내년도에 필요한 연수 주제는? (복수 선택)", {
      options: ["AI·디지털 수업", "생활지도", "평가·피드백", "학부모 상담", "교육과정 재구성", "학급경영", "교사 회복탄력성", "기타"],
      required: false,
    }),
    q("long", "전문성 신장을 위해 학교가 지원했으면 하는 것은?", { required: false }),
  ], ["교직원", "전문성"]),

  t("teacher-13-peer-obs", "동료 수업참관·상호평가 의향", [
    q("likert5", "동료 수업참관이 전문성 성장에 도움이 된다."),
    q("likert5", "내 수업을 동료에게 공개할 의향이 있다."),
    q("likert5", "참관 후 협의가 건설적으로 이루어진다."),
    q("single", "선호하는 참관 형태는?", {
      options: ["사전 협의 후 정식 공개", "자율적·수시 방문", "영상 녹화 후 협의", "전문가 참여", "선호 없음"],
    }),
    q("long", "동료 수업 나눔을 활성화할 방법을 적어주세요.", { required: false }),
  ], ["교직원", "수업나눔"]),

  t("teacher-14-discipline", "학생 생활지도 어려움", [
    q("likert5", "현재 학급에서 생활지도에 큰 어려움이 없다."),
    q("multiple", "최근 가장 어려운 생활지도 영역은? (복수 선택)", {
      options: ["수업방해", "교우 간 갈등", "학교폭력 초기 대응", "가정과 연계", "정서·심리 문제", "기기·스마트폰 사용", "지각·결석", "기타"],
      required: false,
    }),
    q("likert5", "생활지도 시 학교의 지원(상담·관리자)이 충분하다."),
    q("likert5", "생활지도 관련 연수·자료가 적절히 제공된다."),
    q("long", "가장 도움이 될 지원은 무엇이라 생각하시나요?", { required: false }),
  ], ["교직원", "생활지도"]),

  t("teacher-15-parent-complaint", "학부모 민원 부담도", [
    q("likert5", "학부모 민원 대응에 심리적 부담을 느낀다.", { required: true }),
    q("likert5", "민원 발생 시 학교의 공식 지원 절차가 명확하다."),
    q("likert5", "악성 민원에 대한 법적·제도적 보호가 충분하다."),
    q("single", "가장 부담되는 민원 유형은?", {
      options: ["성적·평가 관련", "생활지도·학급운영", "학교폭력 사안", "교사 개인 태도·언행", "반복 민원", "기타"],
    }),
    q("long", "학부모 민원으로부터 교사를 보호할 추가 방안을 적어주세요.", { required: false }),
  ], ["교직원", "민원"]),

  t("teacher-16-violence-handling", "학교폭력 사안 처리 만족도", [
    q("likert5", "학교폭력 신고 접수 절차가 명확하다."),
    q("likert5", "사안 처리 과정이 공정하게 이루어진다."),
    q("likert5", "피해·가해 학생 지원이 적절히 제공된다."),
    q("likert5", "담당 교사의 업무 부담이 합리적으로 분담된다."),
    q("long", "사안 처리 과정에서 개선이 필요한 부분을 적어주세요.", { required: false }),
  ], ["교직원", "학교폭력"]),

  t("teacher-17-digital-class", "디지털 수업 환경 만족도", [
    q("likert5", "교실 전자칠판·TV의 상태가 양호하다."),
    q("likert5", "학생용 태블릿·노트북이 필요한 만큼 제공된다."),
    q("likert5", "교내 Wi-Fi 속도·안정성에 만족한다."),
    q("likert5", "기기 문제 발생 시 신속하게 지원받는다."),
    q("long", "개선이 필요한 디지털 환경을 구체적으로 적어주세요.", { required: false }),
  ], ["교직원", "디지털"]),

  t("teacher-18-lms", "학습관리시스템(LMS) 사용성", [
    q("likert5", "현재 사용하는 LMS가 업무에 유용하다."),
    q("likert5", "LMS 조작이 직관적이고 편리하다."),
    q("likert5", "학생·학부모가 LMS를 원활히 사용하고 있다."),
    q("multiple", "LMS에서 가장 자주 사용하는 기능은? (복수)", {
      options: ["과제 배포·채점", "공지·알림", "출석·생활기록", "학부모 소통", "수업 자료 저장", "화상수업", "기타"],
      required: false,
    }),
    q("long", "LMS 개선 희망 사항을 적어주세요.", { required: false }),
  ], ["교직원", "LMS"]),

  t("teacher-19-ai-class", "AI 활용 수업 의향", [
    q("likert5", "수업에서 AI 도구 활용에 관심이 있다."),
    q("likert5", "AI 활용을 위한 연수가 필요하다."),
    q("likert5", "AI 활용 시 학생 개인정보 보호가 충분히 가능하다고 생각한다."),
    q("multiple", "활용 의향이 있는 AI 영역은? (복수)", {
      options: ["수업 자료 생성", "문제·평가 문항 생성", "피드백·첨삭", "학생 맞춤형 학습", "학생 상담 보조", "관심 없음"],
      required: false,
    }),
    q("long", "AI 활용 수업에 대한 우려나 기대를 적어주세요.", { required: false }),
  ], ["교직원", "AI"]),

  t("teacher-20-textbook", "교과서·교재 만족도", [
    q("likert5", "올해 선정된 교과서가 학생 수준에 적합하다."),
    q("likert5", "교과서 외 보조 교재가 충분히 제공된다."),
    q("likert5", "교사용 지도서가 수업 준비에 도움이 된다."),
    q("long", "교과서·교재 관련 건의사항을 적어주세요.", { required: false }),
  ], ["교직원", "교과서"]),

  t("teacher-21-assessment-share", "평가 도구·문항 공유 요구", [
    q("likert5", "학년·교과 내 평가 도구 공유가 잘 이루어진다."),
    q("likert5", "평가 문항의 질 관리를 위한 협의가 이루어진다."),
    q("likert5", "과정중심평가 자료가 충분히 공유된다."),
    q("long", "평가 문항·루브릭 공유를 위해 학교에 바라는 시스템이 있다면?", { required: false }),
  ], ["교직원", "평가"]),

  t("teacher-22-mentor", "신규교사 멘토링 만족도", [
    q("likert5", "신규교사 대상 멘토링 제도가 잘 운영된다."),
    q("likert5", "멘토 선생님의 지원이 실질적으로 도움이 된다."),
    q("likert5", "멘토-멘티 간 정기 만남이 충분하다."),
    q("long", "멘토링 제도 개선을 위한 제안을 적어주세요.", { required: false }),
  ], ["교직원", "멘토링"]),

  t("teacher-23-newbie-adapt", "신규교사 교실 적응", [
    q("likert5", "학급 운영에 자신감을 갖고 있다."),
    q("likert5", "학부모 상담·응대에 어려움을 느끼지 않는다."),
    q("likert5", "학교 행정 시스템에 잘 적응하고 있다."),
    q("likert5", "동료 선생님들과의 관계가 원만하다."),
    q("multiple", "현재 가장 어려운 영역은? (복수)", {
      options: ["학급경영", "수업 준비", "학부모 상담", "행정 업무", "생활지도", "평가·기록", "기타"],
      required: false,
    }),
    q("long", "학교에 바라는 지원을 솔직하게 적어주세요.", { required: false }),
  ], ["교직원", "신규교사"]),

  t("teacher-24-non-homeroom", "비담임 업무 부담도", [
    q("likert5", "현재 담당 업무(전담/특수/보건/사서/영양 등)의 양이 적정하다."),
    q("likert5", "비담임 교사에 대한 학교 내 지원·배려가 있다."),
    q("likert5", "담임-비담임 간 업무 협력이 원활하다."),
    q("single", "가장 힘든 점은?", {
      options: ["업무량 과다", "수업 외 추가 업무", "학생 관리 범위", "고립감", "행정 처리", "기타"],
    }),
    q("long", "개선 제안을 적어주세요.", { required: false }),
  ], ["교직원", "비담임"]),

  t("teacher-25-after-school", "방과후·돌봄 업무 만족도", [
    q("likert5", "방과후·돌봄 운영 체계가 안정적이다."),
    q("likert5", "강사 채용·관리가 원활하다."),
    q("likert5", "방과후·돌봄 업무 담당자에 대한 지원이 충분하다."),
    q("long", "방과후·돌봄 운영 개선을 위한 제안을 적어주세요.", { required: false }),
  ], ["교직원", "방과후"]),

  t("teacher-26-burnout", "교사 정신건강·소진 자가체크", [
    q("likert5", "최근 한 달간 업무로 인한 피로가 적절히 회복된다."),
    q("likert5", "최근 한 달간 수면이 충분하다."),
    q("likert5", "학교 생활에서 보람을 느낀다."),
    q("likert5", "동료·가족에게 어려움을 이야기할 수 있다."),
    q("likert5", "필요할 때 심리 상담·지원을 이용할 의향이 있다."),
    q("long", "학교가 제공했으면 하는 정신건강 지원을 적어주세요.", { required: false }),
  ], ["교직원", "정신건강", "소진"]),

  t("teacher-27-rights", "교권 보호 인식", [
    q("likert5", "학교 내 교권 침해 대응 절차가 명확하다."),
    q("likert5", "교권 침해 시 관리자의 지원을 신뢰한다."),
    q("likert5", "교권 보호 연수·자료가 충분히 제공된다."),
    q("likert5", "학부모·학생에게 교사 역할·한계가 잘 안내된다."),
    q("long", "교권 보호를 위해 필요한 추가 조치를 적어주세요.", { required: false }),
  ], ["교직원", "교권"]),

  t("teacher-28-safety-mgmt", "학교 안전관리 만족도", [
    q("likert5", "학교 시설 안전 점검이 정기적으로 이루어진다."),
    q("likert5", "실험실·과학실·조리실 안전관리가 적절하다."),
    q("likert5", "약품·기자재 관리가 체계적이다."),
    q("likert5", "안전사고 발생 시 처리 절차가 명확하다."),
    q("long", "우려되는 안전 관련 사항을 구체적으로 적어주세요.", { required: false }),
  ], ["교직원", "안전"]),

  t("teacher-29-club-council", "동아리·자치회 지도 부담", [
    q("likert5", "동아리·자치회 지도 시간이 확보된다."),
    q("likert5", "지도에 필요한 예산·자료가 지원된다."),
    q("likert5", "학생 자율성과 교사 안전 사이에서 균형을 잡을 수 있다."),
    q("long", "동아리·자치회 운영 개선안을 적어주세요.", { required: false }),
  ], ["교직원", "동아리"]),

  t("teacher-30-next-year-calendar", "내년도 학사일정 의견", [
    q("likert5", "올해 학사일정 배분(방학·재량휴업·시험)이 적절했다."),
    q("multiple", "내년도 조정이 필요한 부분은? (복수)", {
      options: ["방학 기간", "재량휴업일", "시험 시기", "학교 행사 배치", "현장학습 일정", "기타"],
      required: false,
    }),
    q("long", "내년도 학사일정에 대한 구체적 제안을 적어주세요.", { required: false }),
  ], ["교직원", "학사일정"]),
];
