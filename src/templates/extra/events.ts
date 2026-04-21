import type { Template } from "@/lib/firebase/schema";

const LIKERT5_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];
const SCALE = { min: 1, max: 5, labels: LIKERT5_LABELS };

const t = (
  id: string,
  name: string,
  category: Template["category"],
  questions: Template["questions"],
  tags: string[]
): Template => ({
  id,
  name,
  category,
  source: "사용자제공",
  isOfficial: false,
  questions,
  usageCount: 0,
  tags,
});

// 표준 행사 만족도 패턴 빌더 (5문항)
const eventPattern = (eventName: string): Template["questions"] => [
  { id: "q1", type: "likert5", title: `이번 ${eventName}는 의미 있었다.`, required: true, scale: SCALE },
  { id: "q2", type: "likert5", title: `이번 ${eventName}는 재미있고 즐거웠다.`, required: true, scale: SCALE },
  { id: "q3", type: "likert5", title: `내년에도 ${eventName}를 했으면 한다.`, required: true, scale: SCALE },
  { id: "q4", type: "short", title: `이번 ${eventName}에서 가장 좋았던 점은 무엇인가요?`, required: false },
  { id: "q5", type: "long", title: `${eventName}에 대해 개선할 점이 있다면 자유롭게 적어주세요.`, required: false },
];

export const EVENT_TEMPLATES: Template[] = [
  // ============ G. 학교 정기 행사 (15개) ============
  t("event-01-entrance-ceremony", "입학식 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "입학식 분위기가 따뜻하고 환영받는 느낌이었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "입학식 식순과 진행이 매끄러웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "학교생활에 대한 안내가 충분했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 입학식에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "입학식에 대한 의견이나 개선점을 자유롭게 적어주세요.", required: false },
  ], ["행사", "입학식"]),

  t("event-02-graduation", "졸업식 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "졸업식 분위기가 뜻깊고 감동적이었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "졸업식 진행과 식순 구성이 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "졸업장·상장 수여가 의미 있었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 졸업식에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "short", title: "가장 기억에 남는 순간은 무엇인가요?", required: false },
    { id: "q6", type: "long", title: "졸업식에 대한 의견이나 개선점을 자유롭게 적어주세요.", required: false },
  ], ["행사", "졸업식"]),

  t("event-03-sports-day", "운동회·체육대회 만족도", "체험학습", eventPattern("운동회"), ["행사", "운동회", "체육대회"]),

  t("event-04-festival", "학예회·축제 만족도", "체험학습", eventPattern("학교 축제"), ["행사", "축제", "학예회"]),

  t("event-05-open-class-week", "학부모 공개수업주간 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "공개수업 안내가 충분하고 적절했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "수업 내용이 학습에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교사와 학생의 상호작용이 활발했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "공개수업 운영 일정·시간이 적절했다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "공개수업주간에 대한 의견이나 건의 사항을 적어주세요.", required: false },
  ], ["행사", "공개수업", "학부모"]),

  t("event-06-fall-sports-day", "가을 운동회 만족도", "체험학습", eventPattern("가을 운동회"), ["행사", "운동회", "가을"]),

  t("event-07-spring-picnic", "봄 소풍 만족도", "체험학습", eventPattern("봄 소풍"), ["행사", "소풍", "봄"]),

  t("event-08-fall-field-trip", "가을 현장체험학습 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "체험 장소가 학습 목표에 적합했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "체험 활동이 흥미롭고 즐거웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "안전 관리가 잘 이루어졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "내년에도 같은 장소를 추천하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "short", title: "가장 좋았던 활동은 무엇인가요?", required: false },
    { id: "q6", type: "long", title: "다음 체험학습에 가고 싶은 장소를 적어주세요.", required: false },
  ], ["행사", "체험학습", "가을"]),

  t("event-09-school-trip", "수학여행 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "수학여행 일정이 알찼다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "숙소·식사가 만족스러웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "안전 관리가 잘 이루어졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "친구들과의 추억을 충분히 만들 수 있었다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "전반적으로 수학여행에 만족한다.", required: true, scale: SCALE },
    { id: "q6", type: "short", title: "가장 기억에 남는 장소는 어디인가요?", required: false },
    { id: "q7", type: "long", title: "수학여행에 대한 개선점을 자유롭게 적어주세요.", required: false },
  ], ["행사", "수학여행"]),

  t("event-10-camp", "수련활동 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "수련활동 프로그램이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "강사·진행자의 지도가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "안전 관리가 잘 이루어졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "친구들과 협력하는 경험을 할 수 있었다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "수련활동에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["행사", "수련활동"]),

  t("event-11-parents-day", "어버이날 행사 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "어버이날 행사가 감사의 마음을 표현하는 데 도움이 되었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "행사 활동이 의미 있었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "내년에도 어버이날 행사를 했으면 한다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "어버이날 행사에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["행사", "어버이날"]),

  t("event-12-teachers-day", "스승의날 행사 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "스승의날 행사가 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "선생님께 감사의 마음을 표현할 수 있었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "내년에도 스승의날 행사를 했으면 한다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "스승의날 행사에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["행사", "스승의날"]),

  t("event-13-childrens-day", "어린이날 행사 만족도", "체험학습", eventPattern("어린이날 행사"), ["행사", "어린이날"]),

  t("event-14-hangul-day", "한글날 행사 만족도", "체험학습", [
    { id: "q1", type: "likert5", title: "한글날 행사가 한글의 소중함을 느끼는 데 도움이 되었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "행사 활동이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "내년에도 한글날 행사를 했으면 한다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "한글날 행사에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["행사", "한글날"]),

  t("event-15-arts-festival", "학예발표회 만족도", "체험학습", eventPattern("학예발표회"), ["행사", "학예회", "발표"]),

  // ============ H. 교과/주제 활동 (15개) ============
  t("event-16-reading-week", "독서주간 운영 만족도", "기타", [
    { id: "q1", type: "likert5", title: "독서주간 프로그램이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "독서주간 동안 책 읽는 시간이 늘었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "독서주간이 독서 습관 형성에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "short", title: "가장 좋았던 활동은 무엇인가요?", required: false },
    { id: "q5", type: "long", title: "다음 독서주간에 추가했으면 하는 활동을 적어주세요.", required: false },
  ], ["행사", "독서", "독서주간"]),

  t("event-17-writing-contest", "글짓기대회 만족도", "기타", [
    { id: "q1", type: "likert5", title: "글짓기대회 주제가 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "글쓰기 시간이 충분했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "심사 결과가 공정했다고 생각한다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "글짓기대회에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "글짓기", "대회"]),

  t("event-18-drawing-contest", "그림그리기대회 만족도", "기타", [
    { id: "q1", type: "likert5", title: "그림그리기 주제가 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "준비물·재료 안내가 충분했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "심사 결과가 공정했다고 생각한다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "그림그리기대회에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "그림", "대회"]),

  t("event-19-math-contest", "수학경시대회 만족도", "기타", [
    { id: "q1", type: "likert5", title: "문제 난이도가 적절했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "시험 시간이 충분했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "운영·진행이 매끄러웠다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "수학경시대회에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "수학", "대회"]),

  t("event-20-english-speech", "영어말하기대회 만족도", "기타", [
    { id: "q1", type: "likert5", title: "주제가 적절하고 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "준비 기간이 충분했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "심사가 공정했다고 생각한다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "영어말하기대회에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "영어", "말하기"]),

  t("event-21-debate", "토론대회 만족도", "기타", [
    { id: "q1", type: "likert5", title: "토론 주제가 흥미롭고 적절했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "토론 규칙·진행 방식이 명확했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "토론을 통해 사고력이 향상되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "토론대회에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "토론", "대회"]),

  t("event-22-presentation", "발표대회 만족도", "기타", [
    { id: "q1", type: "likert5", title: "주제가 흥미롭고 적절했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "발표 시간이 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "발표를 통해 자신감이 향상되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "발표대회에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "발표", "대회"]),

  t("event-23-science-fair", "과학탐구발표회 만족도", "기타", [
    { id: "q1", type: "likert5", title: "과학탐구 주제 선정이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "탐구 과정이 의미 있었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "발표회 운영이 원활했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "과학탐구발표회에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "과학", "탐구"]),

  t("event-24-club-festival", "동아리 발표회 만족도", "기타", eventPattern("동아리 발표회"), ["행사", "동아리"]),

  t("event-25-student-council-event", "학생자치 행사 만족도", "기타", [
    { id: "q1", type: "likert5", title: "학생자치 행사가 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "학생들이 자율적으로 기획·운영했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "행사 운영이 원활했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "내년에도 학생자치 행사를 했으면 한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "학생자치 행사에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["행사", "학생자치"]),

  t("event-26-choir-contest", "교내 합창대회 만족도", "기타", eventPattern("합창대회"), ["행사", "합창", "대회"]),

  t("event-27-sports-league", "교내 체육리그 만족도", "기타", [
    { id: "q1", type: "likert5", title: "체육리그 운영이 공정했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "경기 일정·장소가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "안전 관리가 잘 이루어졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "체육리그에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "체육", "리그"]),

  t("event-28-english-camp", "영어 캠프 만족도", "기타", [
    { id: "q1", type: "likert5", title: "영어 캠프 프로그램이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "강사의 지도가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "영어 학습에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "영어 캠프에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "영어", "캠프"]),

  t("event-29-coding-camp", "코딩 캠프 만족도", "기타", [
    { id: "q1", type: "likert5", title: "코딩 캠프 프로그램이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "강사의 지도가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "수업 난이도가 적절했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "코딩 캠프에 대한 의견을 적어주세요.", required: false },
  ], ["행사", "코딩", "캠프"]),

  t("event-30-environment-day", "환경의 날 활동 만족도", "기타", [
    { id: "q1", type: "likert5", title: "환경의 날 활동이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "환경 보호의 중요성을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "활동이 흥미롭고 재미있었다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "환경 활동에 대한 의견·아이디어를 적어주세요.", required: false },
  ], ["행사", "환경"]),

  // ============ I. 안전/보건 교육 (12개) ============
  t("event-31-bullying-prevention", "학교폭력 예방 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "학교폭력 예방 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "교육이 학교폭력 예방에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "신고·도움 요청 방법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견·건의 사항을 적어주세요.", required: false },
  ], ["교육", "안전", "학교폭력"]),

  t("event-32-cyberbullying-prevention", "사이버폭력 예방 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "사이버폭력 예방 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "온라인에서 안전하게 행동하는 법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "신고·도움 요청 방법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "안전", "사이버폭력"]),

  t("event-33-sex-education", "성교육 만족도(학년별 적합)", "기타", [
    { id: "q1", type: "likert5", title: "성교육 내용이 학년 수준에 적합했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교육 분위기가 편안했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "성교육에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["교육", "보건", "성교육"]),

  t("event-34-life-respect", "생명존중 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "생명존중 교육 내용이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "어려움이 있을 때 도움 요청 방법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "보건", "생명존중"]),

  t("event-35-drug-prevention", "약물 오남용 예방 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "약물 오남용 예방 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "약물의 위험성을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "거절·도움 요청 방법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "보건", "약물예방"]),

  t("event-36-gambling-addiction-prevention", "도박·중독 예방 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "도박·중독 예방 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "도박·중독의 위험성을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "도움 요청 방법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "보건", "중독예방"]),

  t("event-37-safety-experience", "안전 체험학습 만족도", "기타", [
    { id: "q1", type: "likert5", title: "안전 체험 프로그램이 유익했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "체험 활동이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "위험 상황 대처법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 체험학습에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "안전 체험학습에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "안전", "체험"]),

  t("event-38-first-aid", "응급처치 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "응급처치 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "실습 시간이 충분했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "응급 상황 대처법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "안전", "응급처치"]),

  t("event-39-fire-drill", "화재 대피 훈련 만족도", "기타", [
    { id: "q1", type: "likert5", title: "화재 대피 훈련 안내가 명확했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "훈련 진행이 질서 있게 이루어졌다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "화재 시 대피 방법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 훈련에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "훈련에 대한 의견·개선점을 적어주세요.", required: false },
  ], ["교육", "안전", "화재"]),

  t("event-40-earthquake-drill", "지진 대피 훈련 만족도", "기타", [
    { id: "q1", type: "likert5", title: "지진 대피 훈련 안내가 명확했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "훈련 진행이 질서 있게 이루어졌다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "지진 시 대처 방법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 훈련에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "훈련에 대한 의견·개선점을 적어주세요.", required: false },
  ], ["교육", "안전", "지진"]),

  t("event-41-traffic-safety", "교통안전 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "교통안전 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "교통 규칙·안전 수칙을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "안전", "교통"]),

  t("event-42-infection-prevention", "감염병 예방 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "감염병 예방 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "손 씻기 등 위생 수칙을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "보건", "감염병"]),

  // ============ J. 인성/시민 (8개) ============
  t("event-43-character-education", "인성교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "인성교육 프로그램이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "교육 내용이 학교생활에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "친구·교사와의 관계 개선에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "인성교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "인성"]),

  t("event-44-multicultural", "다문화 이해 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "다문화 이해 교육 내용이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "다른 문화에 대한 이해가 넓어졌다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교육이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "인성", "다문화"]),

  t("event-45-unification", "통일 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "통일 교육 내용이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "통일에 대한 이해가 깊어졌다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교육이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "인성", "통일"]),

  t("event-46-democratic-citizen", "민주시민 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "민주시민 교육 내용이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "민주주의·시민의 역할을 이해하게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교육이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "인성", "민주시민"]),

  t("event-47-labor-rights", "노동인권 교육 만족도(고학년)", "기타", [
    { id: "q1", type: "likert5", title: "노동인권 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "노동의 가치와 권리를 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교육이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "인성", "노동인권"]),

  t("event-48-disability-understanding", "장애 이해 교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "장애 이해 교육 내용이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "장애에 대한 이해가 깊어졌다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교육이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "인성", "장애이해"]),

  t("event-49-human-rights-school", "인권 친화적 학교 인식", "기타", [
    { id: "q1", type: "likert5", title: "우리 학교는 학생의 인권을 존중한다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "학생 의견이 학교 운영에 반영된다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "교사·학생 간 소통이 원활하다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "차별·괴롭힘 없이 안전하게 생활할 수 있다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "인권 친화적 학교를 위해 개선할 점을 적어주세요.", required: false },
  ], ["교육", "인성", "인권"]),

  t("event-50-restorative", "회복적 생활교육 만족도", "기타", [
    { id: "q1", type: "likert5", title: "회복적 생활교육이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "갈등 해결에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "친구·교사와의 관계가 좋아졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "회복적 생활교육에 대한 의견을 적어주세요.", required: false },
  ], ["교육", "인성", "회복적생활"]),

  // ============ K. 진로/직업 (8개) ============
  t("event-51-career-day", "진로의 날 만족도", "진로", [
    { id: "q1", type: "likert5", title: "진로의 날 프로그램이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "다양한 직업을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "진로 탐색에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 행사에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "다음 진로의 날에 다루었으면 하는 직업·주제를 적어주세요.", required: false },
  ], ["진로", "행사"]),

  t("event-52-job-experience", "직업체험 만족도", "진로", [
    { id: "q1", type: "likert5", title: "직업체험 프로그램이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "체험 활동이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "관심 있는 직업을 더 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 체험에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "short", title: "가장 인상 깊었던 직업체험은 무엇이었나요?", required: false },
    { id: "q6", type: "long", title: "직업체험에 대한 의견을 적어주세요.", required: false },
  ], ["진로", "직업체험"]),

  t("event-53-career-counseling", "진로상담 만족도(학생용)", "진로", [
    { id: "q1", type: "likert5", title: "진로상담이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "상담 시간이 충분했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "상담 분위기가 편안했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 상담을 받고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "진로상담에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["진로", "상담"]),

  t("event-54-career-instructor", "진로교육 강사 만족도", "진로", [
    { id: "q1", type: "likert5", title: "강사의 강의가 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "강의 내용이 흥미롭고 유익했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "강사가 학생과 잘 소통했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 강의에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "강의에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["진로", "강사"]),

  t("event-55-school-tour", "학과·고교 탐방 만족도", "진로", [
    { id: "q1", type: "likert5", title: "탐방 일정이 알찼다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "방문 학교·학과 안내가 충실했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "진로·진학에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 탐방에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "다음 탐방에 가고 싶은 학교를 적어주세요.", required: false },
  ], ["진로", "탐방"]),

  t("event-56-admission-info", "진학설명회 만족도(학부모/학생)", "진로", [
    { id: "q1", type: "likert5", title: "진학설명회 내용이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "설명이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "질의응답이 충분히 이루어졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 설명회에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "다음 설명회에 다루었으면 하는 주제를 적어주세요.", required: false },
  ], ["진로", "진학", "학부모"]),

  t("event-57-mentoring", "멘토링 프로그램 만족도", "진로", [
    { id: "q1", type: "likert5", title: "멘토링 프로그램이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "멘토와의 만남이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "진로 탐색에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 프로그램에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "멘토링에 대한 의견을 적어주세요.", required: false },
  ], ["진로", "멘토링"]),

  t("event-58-free-semester", "자유학기·자유학년 만족도(중학교)", "진로", [
    { id: "q1", type: "likert5", title: "자유학기 프로그램이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "다양한 활동을 경험할 수 있었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "진로 탐색에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "자유학기에 대한 의견·건의 사항을 적어주세요.", required: false },
  ], ["진로", "자유학기"]),

  // ============ L. 디지털/AI (10개) ============
  t("event-59-tablet-usage", "1인 1태블릿 활용 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "태블릿 활용이 학습에 도움이 된다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "태블릿 사용법을 잘 알고 있다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "태블릿이 잘 작동한다(고장·오류 적다).", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "수업 중 태블릿 활용이 적절하다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "태블릿 활용에 대한 의견·건의 사항을 적어주세요.", required: false },
  ], ["디지털", "태블릿"]),

  t("event-60-digital-textbook", "디지털교과서 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "디지털교과서 사용이 편리하다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "디지털교과서가 학습에 도움이 된다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "기능·콘텐츠가 다양하고 유용하다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "디지털교과서에 대한 의견을 적어주세요.", required: false },
  ], ["디지털", "디지털교과서"]),

  t("event-61-ai-courseware", "AI코스웨어 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "AI코스웨어가 학습에 도움이 된다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "내 수준에 맞는 학습이 제공된다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "사용이 편리하다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "AI코스웨어에 대한 의견·개선점을 적어주세요.", required: false },
  ], ["디지털", "AI", "코스웨어"]),

  t("event-62-metaverse-class", "메타버스 수업 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "메타버스 수업이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "수업 내용이 학습에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "기술 환경이 원활했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "메타버스 수업에 대한 의견을 적어주세요.", required: false },
  ], ["디지털", "메타버스"]),

  t("event-63-online-learning", "온라인 학습 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "온라인 학습 콘텐츠가 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "학습 진행이 원활했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "기술 환경(접속·재생)이 안정적이었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "온라인 학습에 대한 의견을 적어주세요.", required: false },
  ], ["디지털", "온라인학습"]),

  t("event-64-home-digital-env", "가정 디지털 환경", "디지털", [
    { id: "q1", type: "single", title: "가정에 학습용 디지털 기기가 있나요?", required: true, options: [
      { id: "o1", label: "전용 기기 있음(태블릿/노트북)" },
      { id: "o2", label: "공용 기기 있음(가족과 공유)" },
      { id: "o3", label: "스마트폰만 있음" },
      { id: "o4", label: "없음" },
    ] },
    { id: "q2", type: "single", title: "가정 인터넷 환경은 어떤가요?", required: true, options: [
      { id: "o1", label: "매우 안정적" },
      { id: "o2", label: "대체로 안정적" },
      { id: "o3", label: "가끔 불안정" },
      { id: "o4", label: "자주 끊김" },
      { id: "o5", label: "인터넷 없음" },
    ] },
    { id: "q3", type: "likert5", title: "가정에서 디지털 학습을 할 공간이 있다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "가정 디지털 환경 관련 어려움이 있다면 적어주세요.", required: false },
  ], ["디지털", "가정환경"]),

  t("event-65-media-literacy", "미디어 리터러시 자가진단", "디지털", [
    { id: "q1", type: "likert5", title: "온라인 정보의 진위를 판단할 수 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "출처를 확인하는 습관이 있다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "광고와 정보를 구별할 수 있다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "타인의 게시물에 신중하게 반응한다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "개인정보 보호의 중요성을 알고 실천한다.", required: true, scale: SCALE },
  ], ["디지털", "미디어리터러시"]),

  t("event-66-sw-ai-education", "SW·AI 교육 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "SW·AI 교육 내용이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "수업 난이도가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "SW·AI에 대한 이해가 깊어졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "SW·AI 교육에 대한 의견을 적어주세요.", required: false },
  ], ["디지털", "SW", "AI"]),

  t("event-67-info-protection", "정보보호·개인정보 교육 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "정보보호 교육 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "개인정보 보호의 중요성을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "안전한 인터넷 사용법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["디지털", "정보보호"]),

  t("event-68-digital-citizenship", "디지털 시민성 교육 만족도", "디지털", [
    { id: "q1", type: "likert5", title: "디지털 시민성 교육 내용이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "온라인에서의 책임감을 알게 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "타인을 존중하는 디지털 사용법을 알게 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 교육에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "교육에 대한 의견을 적어주세요.", required: false },
  ], ["디지털", "시민성"]),

  // ============ M. 상담/심리 (8개) ============
  t("event-69-wee-class", "Wee클래스 만족도", "기타", [
    { id: "q1", type: "likert5", title: "Wee클래스 이용이 편리했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "상담이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "상담 분위기가 편안했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 이용하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "Wee클래스에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["상담", "Wee클래스"]),

  t("event-70-emotion-screening", "학생 정서·행동 자가진단(축약형)", "기타", [
    { id: "q1", type: "likert5", title: "최근 2주간 즐거움을 느낀 일이 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "잠을 잘 자고 있다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "친구·가족과의 관계가 원만하다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "학교 가는 것이 즐겁다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "어려울 때 도움을 요청할 사람이 있다.", required: true, scale: SCALE },
    { id: "q6", type: "long", title: "선생님께 하고 싶은 말이 있다면 자유롭게 적어주세요.", required: false },
  ], ["상담", "정서", "자가진단"]),

  t("event-71-maladjustment-detection", "학교 부적응 조기 감지(교사용)", "기타", [
    { id: "q1", type: "likert5", title: "해당 학생은 수업에 집중한다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "해당 학생은 친구 관계가 원만하다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "해당 학생은 학교 규칙을 잘 지킨다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "해당 학생은 정서적으로 안정되어 있다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "해당 학생은 출결 상황이 양호하다.", required: true, scale: SCALE },
    { id: "q6", type: "long", title: "특별히 관찰된 사항이나 지원 요청 사항을 적어주세요.", required: false },
  ], ["상담", "교사", "조기감지"]),

  t("event-72-peer-counselor", "또래상담자 만족도", "기타", [
    { id: "q1", type: "likert5", title: "또래상담자와 이야기하는 것이 편안했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "또래상담이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "다음에도 또래상담을 이용하고 싶다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "또래상담 운영에 대한 의견을 적어주세요.", required: false },
  ], ["상담", "또래상담"]),

  t("event-73-counseling-week", "1인 1상담주간 만족도", "기타", [
    { id: "q1", type: "likert5", title: "1인 1상담주간이 의미 있었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "선생님과의 상담이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "상담 시간이 충분했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음 학기에도 상담주간을 운영했으면 한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "상담주간에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["상담", "상담주간"]),

  t("event-74-bullying-victim-followup", "학교폭력 피해학생 사후 모니터링", "기타", [
    { id: "q1", type: "likert5", title: "현재 학교생활이 편안하다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "학교에서 안전하다고 느낀다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "어려울 때 도움을 요청할 사람이 있다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "학교의 사후 지원이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "학교나 선생님께 도움을 받고 싶은 점이 있다면 적어주세요.", required: false },
  ], ["상담", "학교폭력", "사후관리"]),

  t("event-75-bullying-perpetrator-followup", "학교폭력 가해학생 사후 모니터링", "기타", [
    { id: "q1", type: "likert5", title: "지난 일을 돌아보며 반성하는 마음이 든다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "현재 친구 관계가 개선되고 있다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "학교의 교육·상담이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "어려울 때 도움을 요청할 사람이 있다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "현재 어려움이나 도움이 필요한 점을 자유롭게 적어주세요.", required: false },
  ], ["상담", "학교폭력", "사후관리"]),

  t("event-76-school-adaptation", "학교 적응 종합 자가진단", "기타", [
    { id: "q1", type: "likert5", title: "학교 가는 것이 즐겁다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "친구들과 잘 지낸다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "선생님과 편하게 이야기할 수 있다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "수업이 이해되고 따라가는 데 어려움이 없다.", required: true, scale: SCALE },
    { id: "q5", type: "likert5", title: "학교 규칙·일정에 잘 적응하고 있다.", required: true, scale: SCALE },
    { id: "q6", type: "long", title: "학교생활에 대해 더 알리고 싶은 점이 있다면 적어주세요.", required: false },
  ], ["상담", "학교적응", "자가진단"]),

  // ============ N. 평가/학습지원 (8개) ============
  t("event-77-end-of-term-eval", "학기말 평가 만족도(학생)", "기타", [
    { id: "q1", type: "likert5", title: "평가 내용이 수업에서 배운 것과 일치했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "평가 난이도가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "평가 시간이 충분했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "평가 안내가 충분했다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "평가에 대한 의견을 적어주세요.", required: false },
  ], ["평가", "학기말"]),

  t("event-78-report-card", "평가 결과 통지표 만족도(학부모)", "기타", [
    { id: "q1", type: "likert5", title: "통지표 내용을 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "자녀의 학습 상황을 파악하는 데 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "학습 지도를 위한 정보가 충분했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 통지표에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "통지표에 추가했으면 하는 정보를 적어주세요.", required: false },
  ], ["평가", "통지표", "학부모"]),

  t("event-79-supplementary-class", "보충학습 만족도", "기타", [
    { id: "q1", type: "likert5", title: "보충학습 내용이 학습에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "강사의 지도가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "수준에 맞는 학습이 이루어졌다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "보충학습에 대한 의견을 적어주세요.", required: false },
  ], ["평가", "보충학습"]),

  t("event-80-gifted-class", "영재학급/학년 만족도", "기타", [
    { id: "q1", type: "likert5", title: "영재학급 프로그램이 흥미로웠다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "수업 난이도가 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "지도 강사·교사의 수업이 우수했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "영재학급에 대한 의견을 적어주세요.", required: false },
  ], ["평가", "영재"]),

  t("event-81-multicultural-korean", "다문화 학생 한국어 지원 만족도", "기타", [
    { id: "q1", type: "likert5", title: "한국어 지원 수업이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "수업 내용이 이해하기 쉬웠다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "강사·교사의 지도가 적절했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "한국어 지원에 대한 의견을 적어주세요.", required: false },
  ], ["평가", "다문화", "한국어"]),

  t("event-82-basic-skills", "기초학력 향상 프로그램 만족도", "기타", [
    { id: "q1", type: "likert5", title: "기초학력 프로그램이 학습에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "수준에 맞는 학습이 이루어졌다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "지도 교사의 수업이 적절했다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "다음에도 참여하고 싶다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "기초학력 프로그램에 대한 의견을 적어주세요.", required: false },
  ], ["평가", "기초학력"]),

  t("event-83-learning-difficulty-followup", "학습부진 학생 사후 모니터링", "기타", [
    { id: "q1", type: "likert5", title: "현재 수업을 따라가는 데 어려움이 줄었다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "지원 프로그램이 도움이 되었다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "학습에 대한 자신감이 생겼다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "어려울 때 도움을 요청할 수 있다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "추가로 도움이 필요한 부분을 적어주세요.", required: false },
  ], ["평가", "학습부진", "사후관리"]),

  t("event-84-home-learning-link", "가정연계 학습 만족도", "기타", [
    { id: "q1", type: "likert5", title: "가정연계 학습 안내가 충분했다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "가정에서 활용하기에 적절했다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "자녀의 학습에 도움이 되었다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "가정연계 학습에 대한 의견을 적어주세요.", required: false },
  ], ["평가", "가정연계"]),

  // ============ O. 학교운영/거버넌스 (6개) ============
  t("event-85-student-council-ops", "학생자치회 운영 만족도", "학생자치", [
    { id: "q1", type: "likert5", title: "학생자치회가 학생 의견을 잘 수렴한다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "학생자치회 활동이 학교생활에 긍정적 영향을 준다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "학생자치회 운영이 투명하고 공정하다.", required: true, scale: SCALE },
    { id: "q4", type: "likert5", title: "전반적으로 학생자치회 운영에 만족한다.", required: true, scale: SCALE },
    { id: "q5", type: "long", title: "학생자치회에 바라는 점이나 건의 사항을 적어주세요.", required: false },
  ], ["학생자치", "운영"]),

  t("event-86-school-committee", "학교운영위원회 안건 의견(학부모/교사)", "학생자치", [
    { id: "q1", type: "likert5", title: "학교운영위원회 안건이 학교 운영에 적절하다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "안건 결정 과정이 투명하다.", required: true, scale: SCALE },
    { id: "q3", type: "likert5", title: "학부모·교사 의견이 충분히 반영된다.", required: true, scale: SCALE },
    { id: "q4", type: "long", title: "학교운영위원회에 제안하고 싶은 안건이나 의견을 적어주세요.", required: false },
  ], ["학생자치", "운영위원회"]),

  t("event-87-school-rules-revision", "학칙 개정 의견 수렴", "학생자치", [
    { id: "q1", type: "likert5", title: "현재 학칙이 적절하다고 생각한다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "학칙이 학생의 권리를 존중한다.", required: true, scale: SCALE },
    { id: "q3", type: "single", title: "개정이 가장 필요한 항목은 무엇인가요?", required: false, options: [
      { id: "o1", label: "용의·복장 규정" },
      { id: "o2", label: "휴대전화 사용 규정" },
      { id: "o3", label: "출결·지각 규정" },
      { id: "o4", label: "상벌 규정" },
      { id: "o5", label: "기타" },
    ] },
    { id: "q4", type: "long", title: "개정이 필요한 학칙과 그 이유를 자유롭게 적어주세요.", required: false },
  ], ["학생자치", "학칙"]),

  t("event-88-school-renovation", "학교 신축/리모델링 의견", "학생자치", [
    { id: "q1", type: "likert5", title: "현재 학교 시설이 학습에 적합하다.", required: true, scale: SCALE },
    { id: "q2", type: "multiple", title: "리모델링·개선이 필요한 공간을 모두 선택해주세요.", required: false, options: [
      { id: "o1", label: "교실" },
      { id: "o2", label: "복도·계단" },
      { id: "o3", label: "화장실" },
      { id: "o4", label: "급식실" },
      { id: "o5", label: "운동장·체육관" },
      { id: "o6", label: "도서관" },
      { id: "o7", label: "특별실(과학·음악·미술)" },
      { id: "o8", label: "기타" },
    ] },
    { id: "q3", type: "long", title: "신축·리모델링에 반영했으면 하는 의견을 자유롭게 적어주세요.", required: false },
  ], ["학생자치", "시설"]),

  t("event-89-school-closure-day", "학교 휴업·재량휴업일 의견", "학생자치", [
    { id: "q1", type: "likert5", title: "재량휴업일 운영이 적절하다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "휴업일 사전 안내가 충분했다.", required: true, scale: SCALE },
    { id: "q3", type: "single", title: "재량휴업일로 가장 적합한 시기는?", required: false, options: [
      { id: "o1", label: "공휴일과 연계한 연휴" },
      { id: "o2", label: "학기 중 중간 시기" },
      { id: "o3", label: "학기말" },
      { id: "o4", label: "기타" },
    ] },
    { id: "q4", type: "long", title: "휴업일 운영에 대한 의견을 자유롭게 적어주세요.", required: false },
  ], ["학생자치", "휴업일"]),

  t("event-90-school-vision", "학교 비전 수립 의견 수렴", "학생자치", [
    { id: "q1", type: "likert5", title: "우리 학교의 현재 비전·교육 방향을 알고 있다.", required: true, scale: SCALE },
    { id: "q2", type: "likert5", title: "현재 비전이 학교 운영에 잘 반영되고 있다.", required: true, scale: SCALE },
    { id: "q3", type: "long", title: "우리 학교가 추구했으면 하는 비전이나 가치를 적어주세요.", required: false },
    { id: "q4", type: "long", title: "학교 발전을 위한 제안 사항을 자유롭게 적어주세요.", required: false },
  ], ["학생자치", "비전"]),
];
