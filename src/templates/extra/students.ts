import type { Template } from "@/lib/firebase/schema";

const LIKERT5 = {
  min: 1,
  max: 5,
  labels: ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"],
};

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

export const STUDENT_TEMPLATES: Template[] = [
  // ===================================================================
  // A. 학년 시작/끝 (10개)
  // ===================================================================
  t(
    "student-01-new-semester-adapt",
    "새학기 적응도 점검",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "새 학년/새 반에 잘 적응하고 있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "아침에 학교에 오는 것이 즐겁다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "새로운 친구들과 어울리는 데 어려움이 없다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "담임 선생님이 편하고 친근하게 느껴진다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "새 교실과 자리에 만족한다.", required: false, scale: LIKERT5 },
      {
        id: "q6",
        type: "single",
        title: "새 학년에서 가장 걱정되는 것은 무엇인가요?",
        required: false,
        options: [
          { id: "a", label: "친구 사귀기" },
          { id: "b", label: "공부가 어려워질까봐" },
          { id: "c", label: "선생님과의 관계" },
          { id: "d", label: "학교 규칙이나 분위기" },
          { id: "e", label: "특별히 없다" },
        ],
      },
      { id: "q7", type: "long", title: "새 학년이 시작된 지금, 선생님께 하고 싶은 말이 있나요?", required: false },
    ],
    ["학생", "새학기", "적응"]
  ),

  t(
    "student-02-semester1-class-life",
    "1학기 학급생활 돌아보기",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "1학기 동안 우리 반 친구들과 잘 지냈다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "우리 반 분위기가 따뜻하고 즐거웠다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "학급 규칙이 공정하게 지켜졌다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "선생님께서 우리의 이야기를 잘 들어주셨다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "1학기 동안 학급 활동(체험학습, 행사 등)이 즐거웠다.", required: false, scale: LIKERT5 },
      { id: "q6", type: "long", title: "1학기 우리 반에서 가장 좋았던 점은 무엇인가요?", required: false },
      { id: "q7", type: "long", title: "2학기에 우리 반에서 바뀌었으면 하는 점이 있다면 적어주세요.", required: false },
    ],
    ["학생", "1학기", "학급생활"]
  ),

  t(
    "student-03-semester1-self-eval",
    "1학기 학습 자기평가",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "1학기 동안 수업에 열심히 참여하였다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "내가 세운 학습 목표를 잘 지켰다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "숙제와 과제를 성실하게 하였다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "모르는 것이 있으면 선생님이나 친구에게 물어보았다.", required: false, scale: LIKERT5 },
      {
        id: "q5",
        type: "single",
        title: "1학기 가장 자신 있게 공부한 과목은 무엇인가요?",
        required: false,
        options: [
          { id: "a", label: "국어" },
          { id: "b", label: "수학" },
          { id: "c", label: "사회" },
          { id: "d", label: "과학" },
          { id: "e", label: "영어" },
          { id: "f", label: "예체능(음악/미술/체육)" },
        ],
      },
      { id: "q6", type: "long", title: "2학기에 더 노력하고 싶은 부분은 무엇인가요?", required: false },
    ],
    ["학생", "자기평가", "학습"]
  ),

  t(
    "student-04-year-end-self-eval",
    "학년말 종합 자기평가",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "한 해 동안 나는 많이 성장했다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "공부 면에서 작년보다 발전했다고 느낀다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "친구 관계가 좋아졌다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "스스로 약속한 일을 잘 지켰다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "내년에는 더 잘할 수 있다는 자신감이 있다.", required: false, scale: LIKERT5 },
      { id: "q6", type: "long", title: "올 한 해 가장 자랑스러운 일은 무엇인가요?", required: false },
      { id: "q7", type: "long", title: "내년에 꼭 이루고 싶은 목표가 있나요?", required: false },
    ],
    ["학생", "학년말", "자기평가"]
  ),

  t(
    "student-05-year-end-friendship",
    "학년말 친구 관계 돌아보기",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "올해 친한 친구가 생겼다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "친구들과 즐거운 추억을 많이 만들었다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "친구와 다투었을 때 잘 화해할 수 있었다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "내가 도움이 필요할 때 도와줄 친구가 있다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "올해 가장 고마운 친구에게 한마디 적어주세요(이름 적지 않아도 됩니다).", required: false },
      { id: "q6", type: "long", title: "친구 관계에서 아쉬웠던 점이나 배운 점이 있나요?", required: false },
    ],
    ["학생", "친구관계", "학년말"]
  ),

  t(
    "student-06-vacation-plan",
    "방학 계획·다짐",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "방학 동안 가장 하고 싶은 일은 무엇인가요?",
        required: true,
        options: [
          { id: "a", label: "여행 가기" },
          { id: "b", label: "취미·운동 즐기기" },
          { id: "c", label: "책 읽기" },
          { id: "d", label: "친구·가족과 시간 보내기" },
          { id: "e", label: "부족한 공부 보충하기" },
          { id: "f", label: "푹 쉬기" },
        ],
      },
      { id: "q2", type: "likert5", title: "나는 방학 동안 규칙적인 생활을 할 자신이 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "방학 중에도 매일 책을 읽거나 공부할 계획이 있다.", required: false, scale: LIKERT5 },
      { id: "q4", type: "long", title: "방학 동안 꼭 이루고 싶은 한 가지 목표를 적어주세요.", required: false },
      { id: "q5", type: "long", title: "방학이 끝날 때 \"이건 잘했다\" 라고 말할 수 있는 일이 있다면 무엇일까요?", required: false },
    ],
    ["학생", "방학", "계획"]
  ),

  t(
    "student-07-new-friend-difficulty",
    "새 친구 사귀기 어려움",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "새 친구에게 먼저 말을 거는 것이 어렵게 느껴진다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "쉬는 시간에 함께 놀 친구가 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "친구들 무리에 끼는 것이 부담스럽다.", required: true, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "친구 사귀기에서 가장 어려운 점은?",
        required: false,
        options: [
          { id: "a", label: "어떤 말로 시작해야 할지 모름" },
          { id: "b", label: "거절당할까봐 걱정" },
          { id: "c", label: "관심사가 달라서" },
          { id: "d", label: "이미 무리가 만들어져 있어서" },
          { id: "e", label: "특별히 어렵지 않다" },
        ],
      },
      { id: "q5", type: "long", title: "선생님이 도와주었으면 하는 것이 있나요?", required: false },
    ],
    ["학생", "친구사귀기", "정서"]
  ),

  t(
    "student-08-new-teacher-impression",
    "새 담임선생님 첫인상",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "새 담임 선생님은 친근하고 다가가기 쉽다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "선생님 말씀을 이해하기 쉽다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "선생님은 우리 이야기를 잘 들어주실 것 같다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "선생님과 1년을 잘 보낼 수 있을 것 같다.", required: false, scale: LIKERT5 },
      { id: "q5", type: "long", title: "선생님께 미리 알려드리고 싶은 나의 특징이 있나요? (예: 잘하는 것, 어려워하는 것 등)", required: false },
    ],
    ["학생", "담임선생님", "첫인상"]
  ),

  t(
    "student-09-pre-promotion-wrap",
    "진급 전 학년 마무리 점검",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "다음 학년에 올라갈 준비가 되어 있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "이번 학년의 학습 내용을 어느 정도 이해하였다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "친구·선생님과 헤어지는 것이 아쉽다.", required: false, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "다음 학년 진급에 대한 마음은 어떠한가요?",
        required: false,
        options: [
          { id: "a", label: "기대된다" },
          { id: "b", label: "조금 걱정된다" },
          { id: "c", label: "많이 걱정된다" },
          { id: "d", label: "별 생각 없다" },
        ],
      },
      { id: "q5", type: "long", title: "지금 학년에서 꼭 마무리하고 싶은 일이 있나요?", required: false },
    ],
    ["학생", "진급", "학년말"]
  ),

  t(
    "student-10-memorable-event",
    "학기 중 가장 기억남는 일",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "올 학기 가장 즐거웠던 활동은 무엇인가요?",
        required: true,
        options: [
          { id: "a", label: "현장체험학습" },
          { id: "b", label: "운동회/체육행사" },
          { id: "c", label: "학예회/발표회" },
          { id: "d", label: "수업 중 활동(실험, 만들기 등)" },
          { id: "e", label: "친구들과의 일상" },
          { id: "f", label: "기타" },
        ],
      },
      { id: "q2", type: "long", title: "그 일이 기억에 남는 이유를 적어주세요.", required: false },
      { id: "q3", type: "long", title: "반대로 가장 아쉬웠던 일이 있다면 무엇인가요?", required: false },
      { id: "q4", type: "likert5", title: "올 학기는 전반적으로 즐거웠다.", required: false, scale: LIKERT5 },
    ],
    ["학생", "학기회고", "추억"]
  ),

  // ===================================================================
  // B. 학습/공부 (15개)
  // ===================================================================
  t(
    "student-11-daily-study-time",
    "매일 공부 시간 조사",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "방과 후 하루 평균 혼자 공부하는 시간은 얼마인가요? (학원 제외)",
        required: true,
        options: [
          { id: "a", label: "거의 안 함" },
          { id: "b", label: "30분 이내" },
          { id: "c", label: "30분 ~ 1시간" },
          { id: "d", label: "1시간 ~ 2시간" },
          { id: "e", label: "2시간 이상" },
        ],
      },
      {
        id: "q2",
        type: "single",
        title: "주로 어디에서 공부하나요?",
        required: false,
        options: [
          { id: "a", label: "내 방 책상" },
          { id: "b", label: "거실/식탁" },
          { id: "c", label: "학원/도서관" },
          { id: "d", label: "정해진 장소 없음" },
        ],
      },
      { id: "q3", type: "likert5", title: "공부할 때 집중이 잘 된다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "공부 시간을 스스로 정해서 지키는 편이다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "공부할 때 가장 방해가 되는 것은 무엇인가요?", required: false },
    ],
    ["학생", "학습시간", "공부습관"]
  ),

  t(
    "student-12-self-directed-learning",
    "자기주도 학습력 점검",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "내가 무엇을 공부할지 스스로 계획할 수 있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "모르는 것을 끝까지 알아내려고 노력한다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "공부한 내용을 스스로 정리하고 복습한다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "공부할 때 누가 시키지 않아도 시작한다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "내가 잘하는 공부 방법이 있다.", required: false, scale: LIKERT5 },
      { id: "q6", type: "long", title: "스스로 공부할 때 어려운 점이 있다면 무엇인가요?", required: false },
    ],
    ["학생", "자기주도", "학습"]
  ),

  t(
    "student-13-test-anxiety",
    "시험 불안도 점검",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "시험 전날에 잠이 잘 안 온다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "시험을 볼 때 손이 떨리거나 가슴이 두근거린다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "아는 문제도 시험 때는 생각이 안 나는 경우가 있다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "시험 점수가 기대보다 낮을까봐 걱정된다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "시험 결과 때문에 부모님께 혼날까 걱정된다.", required: false, scale: LIKERT5 },
      { id: "q6", type: "long", title: "시험 불안을 줄이기 위해 도움이 될 만한 것이 있다면 적어주세요.", required: false },
    ],
    ["학생", "시험불안", "정서"]
  ),

  t(
    "student-14-focus-self-check",
    "집중력 자가진단",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "수업 시간에 한 시간 동안 집중을 잘 유지한다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "공부할 때 휴대폰이 자꾸 신경 쓰인다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "한 가지 일을 끝까지 마무리한다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "주변이 시끄러우면 공부에 집중하기 어렵다.", required: false, scale: LIKERT5 },
      {
        id: "q5",
        type: "single",
        title: "내가 가장 집중이 잘 되는 시간은 언제인가요?",
        required: false,
        options: [
          { id: "a", label: "아침" },
          { id: "b", label: "낮(학교 수업 시간)" },
          { id: "c", label: "저녁" },
          { id: "d", label: "밤늦게" },
        ],
      },
    ],
    ["학생", "집중력", "자기진단"]
  ),

  t(
    "student-15-subject-interest",
    "과목별 흥미도",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "국어 수업이 재미있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "수학 수업이 재미있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "사회 수업이 재미있다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "과학 수업이 재미있다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "영어 수업이 재미있다.", required: true, scale: LIKERT5 },
      { id: "q6", type: "likert5", title: "예체능(음악/미술/체육) 수업이 재미있다.", required: true, scale: LIKERT5 },
      { id: "q7", type: "long", title: "그 과목이 재미있는(또는 재미없는) 이유가 있다면 적어주세요.", required: false },
    ],
    ["학생", "과목흥미", "수업"]
  ),

  t(
    "student-16-help-seeking",
    "어려운 과목 도움 요청",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "지금 가장 어려운 과목은 무엇인가요?",
        required: true,
        options: [
          { id: "a", label: "국어" },
          { id: "b", label: "수학" },
          { id: "c", label: "사회" },
          { id: "d", label: "과학" },
          { id: "e", label: "영어" },
          { id: "f", label: "특별히 없다" },
        ],
      },
      { id: "q2", type: "likert5", title: "모르는 것이 있을 때 선생님께 물어볼 수 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "친구에게 모르는 것을 물어볼 수 있다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "집에서 모르는 것을 물어볼 사람이 있다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "선생님께 어떤 도움을 받고 싶은가요?", required: false },
    ],
    ["학생", "도움요청", "학습지원"]
  ),

  t(
    "student-17-class-participation",
    "수업 참여도 자기평가",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "수업 시간에 선생님 말씀을 잘 듣는다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "수업 중 질문이 있으면 손을 들어 묻는다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "모둠 토의에 적극적으로 의견을 낸다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "수업 활동에 즐겁게 참여한다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "수업에 더 잘 참여하기 위해 필요한 것이 있다면 적어주세요.", required: false },
    ],
    ["학생", "수업참여", "자기평가"]
  ),

  t(
    "student-18-homework-burden",
    "숙제·과제 부담 조사",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "하루 평균 숙제하는 데 걸리는 시간은?",
        required: true,
        options: [
          { id: "a", label: "거의 없음" },
          { id: "b", label: "30분 이내" },
          { id: "c", label: "30분 ~ 1시간" },
          { id: "d", label: "1시간 ~ 2시간" },
          { id: "e", label: "2시간 이상" },
        ],
      },
      { id: "q2", type: "likert5", title: "숙제의 양이 적당하다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "숙제의 난이도가 적절하다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "숙제를 통해 공부에 도움이 된다고 느낀다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "숙제와 관련해 선생님께 건의하고 싶은 점이 있나요?", required: false },
    ],
    ["학생", "숙제", "과제"]
  ),

  t(
    "student-19-online-learning",
    "온라인 학습 환경 점검",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "집에 공부할 수 있는 컴퓨터나 태블릿이 있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "집에서 인터넷이 잘 연결된다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "온라인 학습 사이트(e학습터, 디지털교과서 등) 사용에 익숙하다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "온라인으로 공부할 때 집중이 잘 된다.", required: false, scale: LIKERT5 },
      { id: "q5", type: "long", title: "온라인 학습을 할 때 어려운 점이 있다면 적어주세요.", required: false },
    ],
    ["학생", "온라인학습", "디지털"]
  ),

  t(
    "student-20-private-academy",
    "학원·사교육 부담",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "현재 다니고 있는 학원은 몇 개인가요?",
        required: true,
        options: [
          { id: "a", label: "안 다님" },
          { id: "b", label: "1~2개" },
          { id: "c", label: "3~4개" },
          { id: "d", label: "5개 이상" },
        ],
      },
      { id: "q2", type: "likert5", title: "학원 가는 것이 즐겁다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "학원 때문에 놀거나 쉴 시간이 부족하다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "학원 숙제 때문에 학교 숙제를 못 할 때가 있다.", required: false, scale: LIKERT5 },
      { id: "q5", type: "long", title: "학원에 대해 더 하고 싶은 말이 있나요?", required: false },
    ],
    ["학생", "사교육", "학원"]
  ),

  t(
    "student-21-group-activity",
    "모둠활동 만족도",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "모둠 활동에 즐겁게 참여한다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "모둠 친구들과 협력이 잘 된다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "모둠 안에서 내 의견이 존중받는다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "역할 분담이 공평하게 이루어진다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "모둠 활동에서 어려운 점이 있다면 적어주세요.", required: false },
    ],
    ["학생", "모둠활동", "협력"]
  ),

  t(
    "student-22-presentation-confidence",
    "발표 자신감",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "친구들 앞에서 발표하는 것이 떨리지 않는다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "내 생각을 말로 잘 표현할 수 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "발표 준비를 미리 잘 하는 편이다.", required: false, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "발표에서 가장 어려운 것은 무엇인가요?",
        required: false,
        options: [
          { id: "a", label: "사람들 앞에서 떨리는 것" },
          { id: "b", label: "내 생각을 정리하는 것" },
          { id: "c", label: "큰 목소리로 말하기" },
          { id: "d", label: "친구들 시선 받기" },
          { id: "e", label: "특별히 어렵지 않다" },
        ],
      },
      { id: "q5", type: "long", title: "발표를 잘 하기 위해 어떤 도움이 필요할까요?", required: false },
    ],
    ["학생", "발표", "자신감"]
  ),

  t(
    "student-23-reading-environment",
    "책 읽는 환경",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "한 달에 책을 몇 권 정도 읽나요? (교과서 제외)",
        required: true,
        options: [
          { id: "a", label: "거의 안 읽음" },
          { id: "b", label: "1~2권" },
          { id: "c", label: "3~5권" },
          { id: "d", label: "6권 이상" },
        ],
      },
      { id: "q2", type: "likert5", title: "집에 읽고 싶은 책이 충분히 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "책 읽는 시간을 스스로 만들어 낸다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "책을 읽으면 즐겁고 흥미롭다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "최근에 재미있게 읽은 책이 있다면 적어주세요.", required: false },
    ],
    ["학생", "독서", "환경"]
  ),

  t(
    "student-24-class-fatigue",
    "수업 중 졸음·피로",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "수업 중 졸린 적이 자주 있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "오전보다 오후 수업에 더 피곤함을 느낀다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "전날 잠을 충분히 못 자서 학교에서 피곤하다.", required: true, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "수업 중 졸린 가장 큰 이유는?",
        required: false,
        options: [
          { id: "a", label: "잠이 부족해서" },
          { id: "b", label: "수업이 지루해서" },
          { id: "c", label: "교실이 덥거나 답답해서" },
          { id: "d", label: "몸이 피곤해서" },
          { id: "e", label: "특별한 이유 없음" },
        ],
      },
      { id: "q5", type: "long", title: "졸음을 덜 느끼게 하려면 어떻게 하면 좋을까요?", required: false },
    ],
    ["학생", "피로", "수업"]
  ),

  t(
    "student-25-learning-motivation",
    "학습 동기·목표",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "공부를 왜 하는지 분명한 이유가 있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "꼭 이루고 싶은 학습 목표가 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "공부를 잘하면 미래에 도움이 된다고 생각한다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "새로운 것을 배우는 것이 재미있다.", required: true, scale: LIKERT5 },
      {
        id: "q5",
        type: "single",
        title: "내가 공부하는 가장 큰 이유는 무엇인가요?",
        required: false,
        options: [
          { id: "a", label: "내가 잘하고 싶어서" },
          { id: "b", label: "꿈을 이루기 위해" },
          { id: "c", label: "부모님이 원하셔서" },
          { id: "d", label: "친구들에게 지기 싫어서" },
          { id: "e", label: "특별한 이유 없음" },
        ],
      },
      { id: "q6", type: "long", title: "지금 가장 이루고 싶은 학습 목표를 적어주세요.", required: false },
    ],
    ["학생", "학습동기", "목표"]
  ),

  // ===================================================================
  // C. 친구·교우관계 (10개)
  // ===================================================================
  t(
    "student-26-close-friends",
    "친한 친구 수 조사",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "고민을 털어놓을 수 있는 친한 친구가 몇 명 있나요?",
        required: true,
        options: [
          { id: "a", label: "없음" },
          { id: "b", label: "1명" },
          { id: "c", label: "2~3명" },
          { id: "d", label: "4명 이상" },
        ],
      },
      { id: "q2", type: "likert5", title: "친한 친구들과 자주 이야기를 나눈다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "친구들 사이에서 외롭다고 느낄 때가 있다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "필요할 때 도움을 청할 친구가 있다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "친구 관계에서 더 바라는 점이 있다면 적어주세요.", required: false },
    ],
    ["학생", "친구", "교우관계"]
  ),

  t(
    "student-27-friend-conflict",
    "친구와 갈등 경험",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "최근 한 달 동안 친구와 다툰 적이 있다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "친구와 다투었을 때 잘 화해할 수 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "친구와 갈등이 생기면 너무 신경 쓰여 힘들다.", required: true, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "친구와의 갈등을 가장 자주 겪는 상황은?",
        required: false,
        options: [
          { id: "a", label: "오해나 말싸움" },
          { id: "b", label: "놀이/게임 규칙" },
          { id: "c", label: "그룹/무리에서 빠지는 일" },
          { id: "d", label: "SNS·메신저에서의 다툼" },
          { id: "e", label: "거의 없음" },
        ],
      },
      { id: "q5", type: "long", title: "갈등 해결을 위해 도움이 필요한 일이 있다면 적어주세요.", required: false },
    ],
    ["학생", "갈등", "친구"]
  ),

  t(
    "student-28-bullying",
    "따돌림 경험·목격",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "최근 한 학기 동안 따돌림이나 괴롭힘을 당한 적이 있나요?",
        required: true,
        options: [
          { id: "a", label: "전혀 없음" },
          { id: "b", label: "1~2번 정도 있음" },
          { id: "c", label: "여러 번 있음" },
          { id: "d", label: "지금도 겪고 있음" },
        ],
      },
      {
        id: "q2",
        type: "single",
        title: "친구가 따돌림 당하는 것을 본 적이 있나요?",
        required: true,
        options: [
          { id: "a", label: "본 적 없음" },
          { id: "b", label: "한두 번 본 적 있음" },
          { id: "c", label: "여러 번 본 적 있음" },
        ],
      },
      { id: "q3", type: "likert5", title: "따돌림이나 괴롭힘이 일어나면 누군가에게 알릴 수 있다.", required: true, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "혹시 도움이 필요하다면 누구에게 알리고 싶나요?",
        required: false,
        options: [
          { id: "a", label: "담임 선생님" },
          { id: "b", label: "다른 선생님(상담선생님 등)" },
          { id: "c", label: "부모님" },
          { id: "d", label: "친구" },
          { id: "e", label: "잘 모르겠다" },
        ],
      },
      { id: "q5", type: "long", title: "선생님께 안전하게 알리고 싶은 일이 있다면 자유롭게 적어주세요.", required: false },
    ],
    ["학생", "학교폭력", "따돌림"]
  ),

  t(
    "student-29-class-atmosphere",
    "우리 반 분위기",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "우리 반은 친구들끼리 사이가 좋다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "우리 반은 서로 도와주는 분위기다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "우리 반은 떠들거나 시끄러워서 불편할 때가 많다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "우리 반에 와 있는 것이 즐겁다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "우리 반 분위기를 더 좋게 만들기 위한 아이디어가 있다면 적어주세요.", required: false },
    ],
    ["학생", "학급분위기", "교우"]
  ),

  t(
    "student-30-seat-group",
    "자리·모둠 만족도",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "지금 내 자리가 마음에 든다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "지금 짝꿍과 잘 지낸다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "지금 모둠 친구들과 활동하기 좋다.", required: true, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "다음 자리 바꾸는 시기는 언제가 좋을까요?",
        required: false,
        options: [
          { id: "a", label: "지금 바로" },
          { id: "b", label: "한 달 후" },
          { id: "c", label: "다음 학기" },
          { id: "d", label: "지금이 좋아 그대로" },
        ],
      },
      { id: "q5", type: "long", title: "자리 배치에 대해 선생님께 의견이 있다면 적어주세요.", required: false },
    ],
    ["학생", "자리배치", "모둠"]
  ),

  t(
    "student-31-friend-praise",
    "친구 칭찬 릴레이",
    "학생실태",
    [
      { id: "q1", type: "long", title: "우리 반에서 가장 친절한 친구는 누구이며 어떤 점이 친절한가요?", required: false },
      { id: "q2", type: "long", title: "공부를 열심히 해서 본받고 싶은 친구가 있다면?", required: false },
      { id: "q3", type: "long", title: "유머가 있어 분위기를 즐겁게 만드는 친구는?", required: false },
      { id: "q4", type: "long", title: "조용하지만 멋진 점이 있는 친구를 한 명 소개해주세요.", required: false },
      { id: "q5", type: "long", title: "오늘 친구에게 한마디 칭찬을 보낸다면?", required: false },
    ],
    ["학생", "칭찬", "긍정"]
  ),

  t(
    "student-32-lunch-time",
    "점심시간 만족도",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "점심시간이 즐겁다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "점심을 함께 먹을 친구가 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "급식 시간이 너무 빠르거나 짧다고 느낀다.", required: false, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "급식실이 깨끗하고 편안하다.", required: false, scale: LIKERT5 },
      { id: "q5", type: "long", title: "점심시간이 더 좋아지려면 무엇이 필요할까요?", required: false },
    ],
    ["학생", "점심시간", "급식"]
  ),

  t(
    "student-33-break-activity",
    "쉬는 시간 활동",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "쉬는 시간에 주로 무엇을 하나요?",
        required: true,
        options: [
          { id: "a", label: "친구와 이야기" },
          { id: "b", label: "복도/운동장에서 놀기" },
          { id: "c", label: "책 읽기" },
          { id: "d", label: "엎드려 쉼" },
          { id: "e", label: "혼자 그림/낙서" },
          { id: "f", label: "기타" },
        ],
      },
      { id: "q2", type: "likert5", title: "쉬는 시간이 충분히 길다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "쉬는 시간이 즐겁다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "long", title: "쉬는 시간에 학교에서 하고 싶은 활동이 있나요?", required: false },
    ],
    ["학생", "쉬는시간", "휴식"]
  ),

  t(
    "student-34-sns-usage",
    "SNS·메신저 사용",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "SNS나 메신저(카톡, 인스타 등)를 사용하나요?",
        required: true,
        options: [
          { id: "a", label: "사용하지 않음" },
          { id: "b", label: "가끔 사용" },
          { id: "c", label: "매일 사용" },
          { id: "d", label: "하루에도 여러 번 사용" },
        ],
      },
      {
        id: "q2",
        type: "single",
        title: "하루에 SNS·메신저를 사용하는 시간은?",
        required: false,
        options: [
          { id: "a", label: "30분 이내" },
          { id: "b", label: "30분 ~ 1시간" },
          { id: "c", label: "1시간 ~ 2시간" },
          { id: "d", label: "2시간 이상" },
        ],
      },
      { id: "q3", type: "likert5", title: "SNS·메신저 때문에 잠을 늦게 자는 경우가 있다.", required: false, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "SNS·메신저 사용을 스스로 조절할 수 있다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "SNS 사용에 대해 어른들이 알아주었으면 하는 것이 있나요?", required: false },
    ],
    ["학생", "SNS", "디지털"]
  ),

  t(
    "student-35-cyber-conflict",
    "사이버 친구 갈등",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "메신저나 SNS에서 친구와 다툰 적이 있나요?",
        required: true,
        options: [
          { id: "a", label: "없음" },
          { id: "b", label: "1~2번 있음" },
          { id: "c", label: "여러 번 있음" },
        ],
      },
      { id: "q2", type: "likert5", title: "온라인에서 받은 말 때문에 마음이 상한 적이 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "단톡방에서 부담을 느낀 적이 있다.", required: true, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "온라인에서 갈등이 생기면 어떻게 하나요?",
        required: false,
        options: [
          { id: "a", label: "직접 대화로 풀어본다" },
          { id: "b", label: "선생님께 알린다" },
          { id: "c", label: "부모님께 알린다" },
          { id: "d", label: "혼자 참는다" },
          { id: "e", label: "그 친구를 차단한다" },
        ],
      },
      { id: "q5", type: "long", title: "사이버 갈등 예방을 위해 학교에서 해주었으면 하는 것이 있나요?", required: false },
    ],
    ["학생", "사이버", "갈등"]
  ),

  // ===================================================================
  // D. 정서·건강 (8개)
  // ===================================================================
  t(
    "student-36-today-mood",
    "오늘의 기분 (짧은 펄스)",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "오늘 지금 기분을 골라주세요.",
        required: true,
        options: [
          { id: "a", label: "매우 좋음" },
          { id: "b", label: "좋음" },
          { id: "c", label: "보통" },
          { id: "d", label: "별로" },
          { id: "e", label: "많이 안 좋음" },
        ],
      },
      { id: "q2", type: "likert5", title: "오늘 학교 오는 길이 가벼웠다.", required: false, scale: LIKERT5 },
      { id: "q3", type: "long", title: "지금 기분에 영향을 준 일이 있다면 한 줄로 적어주세요.", required: false },
    ],
    ["학생", "펄스", "정서"]
  ),

  t(
    "student-37-school-reluctance",
    "학교 오기 싫은 날",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "최근에 학교에 오고 싶지 않다고 느낀 적이 있다.", required: true, scale: LIKERT5 },
      {
        id: "q2",
        type: "single",
        title: "학교에 오기 싫었던 가장 큰 이유는?",
        required: false,
        options: [
          { id: "a", label: "친구 문제" },
          { id: "b", label: "공부가 힘들어서" },
          { id: "c", label: "선생님과의 일" },
          { id: "d", label: "몸이 아프거나 피곤해서" },
          { id: "e", label: "집에 일이 있어서" },
          { id: "f", label: "특별한 이유 없음" },
        ],
      },
      { id: "q3", type: "likert5", title: "학교에 와서 시간이 지나면 기분이 나아진다.", required: false, scale: LIKERT5 },
      { id: "q4", type: "long", title: "선생님이 도와주었으면 하는 것이 있다면 적어주세요.", required: false },
    ],
    ["학생", "정서", "학교생활"]
  ),

  t(
    "student-38-sleep",
    "잠자는 시간·수면",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "평소 몇 시쯤 잠자리에 드나요?",
        required: true,
        options: [
          { id: "a", label: "9시 이전" },
          { id: "b", label: "9~10시" },
          { id: "c", label: "10~11시" },
          { id: "d", label: "11~12시" },
          { id: "e", label: "12시 이후" },
        ],
      },
      {
        id: "q2",
        type: "single",
        title: "하루 평균 잠자는 시간은?",
        required: true,
        options: [
          { id: "a", label: "6시간 미만" },
          { id: "b", label: "6~7시간" },
          { id: "c", label: "7~8시간" },
          { id: "d", label: "8~9시간" },
          { id: "e", label: "9시간 이상" },
        ],
      },
      { id: "q3", type: "likert5", title: "아침에 일어나기 힘들지 않다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "잠을 푹 잤다고 느끼는 날이 많다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "잠을 늦게 자게 되는 가장 큰 이유가 있다면 적어주세요.", required: false },
    ],
    ["학생", "수면", "건강"]
  ),

  t(
    "student-39-breakfast",
    "아침 식사·식습관",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "일주일에 아침 식사를 몇 번 하나요?",
        required: true,
        options: [
          { id: "a", label: "거의 안 함" },
          { id: "b", label: "1~2번" },
          { id: "c", label: "3~4번" },
          { id: "d", label: "5~6번" },
          { id: "e", label: "매일" },
        ],
      },
      { id: "q2", type: "likert5", title: "야채와 과일을 골고루 먹는 편이다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "물을 자주 마신다.", required: false, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "단 음료(탄산, 주스)를 많이 마신다.", required: false, scale: LIKERT5 },
      { id: "q5", type: "long", title: "건강한 식습관을 위해 도움받고 싶은 것이 있다면 적어주세요.", required: false },
    ],
    ["학생", "식습관", "건강"]
  ),

  t(
    "student-40-physical-activity",
    "운동·신체활동",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "일주일에 30분 이상 땀 흘리며 운동하는 날은?",
        required: true,
        options: [
          { id: "a", label: "거의 없음" },
          { id: "b", label: "1~2일" },
          { id: "c", label: "3~4일" },
          { id: "d", label: "5일 이상" },
        ],
      },
      { id: "q2", type: "likert5", title: "체육 시간이 즐겁다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "방과 후 친구들과 자주 뛰어논다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "long", title: "학교에서 더 해보고 싶은 운동이 있다면 적어주세요.", required: false },
    ],
    ["학생", "운동", "건강"]
  ),

  t(
    "student-41-stress",
    "스트레스 정도",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "요즘 스트레스를 많이 받는다.", required: true, scale: LIKERT5 },
      {
        id: "q2",
        type: "single",
        title: "스트레스의 가장 큰 원인은 무엇인가요?",
        required: true,
        options: [
          { id: "a", label: "공부/시험" },
          { id: "b", label: "친구 관계" },
          { id: "c", label: "가족 관계" },
          { id: "d", label: "학원·일정이 너무 많음" },
          { id: "e", label: "외모·신체" },
          { id: "f", label: "특별한 원인 없음" },
        ],
      },
      { id: "q3", type: "likert5", title: "스트레스를 풀 수 있는 나만의 방법이 있다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "힘들 때 이야기할 수 있는 사람이 있다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "스트레스를 덜기 위해 학교가 도와주었으면 하는 것이 있나요?", required: false },
    ],
    ["학생", "스트레스", "정서"]
  ),

  t(
    "student-42-family-talk",
    "가족과 대화 시간",
    "학생실태",
    [
      {
        id: "q1",
        type: "single",
        title: "하루에 가족과 이야기하는 시간은 얼마나 되나요?",
        required: true,
        options: [
          { id: "a", label: "거의 없음" },
          { id: "b", label: "10분 이내" },
          { id: "c", label: "10~30분" },
          { id: "d", label: "30분 ~ 1시간" },
          { id: "e", label: "1시간 이상" },
        ],
      },
      { id: "q2", type: "likert5", title: "가족과 함께 식사하는 시간이 즐겁다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "고민이 있을 때 가족에게 말할 수 있다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "가족이 내 이야기를 잘 들어준다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "long", title: "가족과 더 자주 하고 싶은 활동이 있다면 적어주세요.", required: false },
    ],
    ["학생", "가족", "대화"]
  ),

  t(
    "student-43-loneliness-check",
    "외로움·우울감 자가체크 (정중)",
    "학생실태",
    [
      {
        id: "q0",
        type: "section",
        title: "이 설문은 여러분의 마음을 돕기 위한 것입니다.",
        description: "정답은 없으며, 솔직하게 답해주면 됩니다. 응답은 안전하게 보호됩니다.",
        required: false,
      },
      { id: "q1", type: "likert5", title: "최근 한 주 동안 자주 외롭다고 느꼈다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "최근에 평소 좋아하던 일이 별로 즐겁지 않다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "자주 기운이 없거나 피곤하다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "마음이 답답할 때 이야기할 수 있는 사람이 있다.", required: true, scale: LIKERT5 },
      {
        id: "q5",
        type: "single",
        title: "지금 도움이 필요하다면 누구와 이야기하고 싶나요?",
        required: false,
        options: [
          { id: "a", label: "담임 선생님" },
          { id: "b", label: "상담 선생님" },
          { id: "c", label: "부모님 또는 가족" },
          { id: "d", label: "친구" },
          { id: "e", label: "지금은 도움이 필요하지 않다" },
        ],
      },
      { id: "q6", type: "long", title: "선생님께 조용히 알리고 싶은 마음이 있다면 자유롭게 적어주세요.", required: false },
    ],
    ["학생", "정서", "자가체크"]
  ),

  // ===================================================================
  // E. 진로·꿈 (4개)
  // ===================================================================
  t(
    "student-44-future-dream",
    "장래희망 조사",
    "진로",
    [
      { id: "q1", type: "short", title: "현재 가장 되고 싶은 직업이나 모습이 있다면 적어주세요.", required: false },
      { id: "q2", type: "likert5", title: "내 꿈에 대해 자주 생각하는 편이다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "꿈을 이루기 위해 노력하고 있는 것이 있다.", required: true, scale: LIKERT5 },
      {
        id: "q4",
        type: "single",
        title: "장래희망을 정한 가장 큰 이유는?",
        required: false,
        options: [
          { id: "a", label: "내가 좋아하는 일이라서" },
          { id: "b", label: "잘하는 일이라서" },
          { id: "c", label: "돈을 잘 벌 수 있어서" },
          { id: "d", label: "다른 사람을 돕고 싶어서" },
          { id: "e", label: "유명해지고 싶어서" },
          { id: "f", label: "아직 정하지 못함" },
        ],
      },
      { id: "q5", type: "long", title: "꿈을 이루기 위해 학교에서 어떤 활동이 도움이 될까요?", required: false },
    ],
    ["학생", "진로", "장래희망"]
  ),

  t(
    "student-45-career-interest",
    "직업 흥미 분야",
    "진로",
    [
      { id: "q1", type: "likert5", title: "사람들과 어울리고 도와주는 일이 좋다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "그림 그리기, 음악 만들기 같은 창작 활동이 좋다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "기계나 기술, 컴퓨터를 다루는 일이 좋다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "수학·과학처럼 문제를 풀고 탐구하는 일이 좋다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "운동이나 몸을 움직이는 활동이 좋다.", required: true, scale: LIKERT5 },
      { id: "q6", type: "likert5", title: "장사, 발표, 사람을 이끄는 일이 좋다.", required: true, scale: LIKERT5 },
      { id: "q7", type: "long", title: "내가 가장 흥미 있는 분야와 관련된 직업이 있다면 적어주세요.", required: false },
    ],
    ["학생", "직업흥미", "진로"]
  ),

  t(
    "student-46-role-model",
    "롤모델",
    "진로",
    [
      { id: "q1", type: "short", title: "닮고 싶은 사람이 있다면 누구인가요? (가족, 친구, 유명인 모두 가능)", required: false },
      {
        id: "q2",
        type: "single",
        title: "그 사람에게서 가장 본받고 싶은 점은?",
        required: false,
        options: [
          { id: "a", label: "성실함" },
          { id: "b", label: "재능과 실력" },
          { id: "c", label: "다른 사람을 돕는 마음" },
          { id: "d", label: "자신감과 용기" },
          { id: "e", label: "꿈을 이루기 위한 노력" },
          { id: "f", label: "기타" },
        ],
      },
      { id: "q3", type: "likert5", title: "그 사람처럼 되고 싶어 노력하고 있는 일이 있다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "long", title: "그 사람의 어떤 모습이 가장 멋져 보였나요?", required: false },
    ],
    ["학생", "롤모델", "진로"]
  ),

  t(
    "student-47-career-info-source",
    "진로 정보 수집 경로",
    "진로",
    [
      {
        id: "q1",
        type: "multiple",
        title: "직업이나 진로에 대해 정보를 얻는 곳은? (여러 개 선택 가능)",
        required: true,
        options: [
          { id: "a", label: "부모님·가족" },
          { id: "b", label: "선생님" },
          { id: "c", label: "친구" },
          { id: "d", label: "유튜브·인터넷 검색" },
          { id: "e", label: "책·잡지" },
          { id: "f", label: "TV·영화·드라마" },
          { id: "g", label: "거의 찾아본 적 없음" },
        ],
      },
      { id: "q2", type: "likert5", title: "장래 직업에 대한 정보를 충분히 알고 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "학교에서 진로 수업이나 활동이 도움이 된다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "long", title: "진로에 대해 학교에서 더 알고 싶은 것이 있다면 적어주세요.", required: false },
    ],
    ["학생", "진로정보", "진로"]
  ),

  // ===================================================================
  // F. 학교생활 만족 (3개)
  // ===================================================================
  t(
    "student-48-facility",
    "학교 시설 만족 (화장실/급식실/운동장)",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "우리 학교 화장실이 깨끗하고 사용하기 좋다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "급식실이 깨끗하고 편안하다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "운동장과 체육관 시설이 만족스럽다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "교실이 쾌적하고 공부하기 좋다.", required: true, scale: LIKERT5 },
      { id: "q5", type: "likert5", title: "도서관(또는 학급문고)이 잘 되어 있다.", required: false, scale: LIKERT5 },
      { id: "q6", type: "long", title: "가장 개선되었으면 하는 학교 시설은 무엇인가요?", required: false },
    ],
    ["학생", "학교시설", "만족도"]
  ),

  t(
    "student-49-school-safety",
    "안전한 학교 인식",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "우리 학교는 다니기에 안전하다고 느낀다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "쉬는 시간과 점심시간에 마음 편히 다닐 수 있다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "likert5", title: "복도, 계단 등에서 위험한 행동을 하는 친구가 적다.", required: true, scale: LIKERT5 },
      { id: "q4", type: "likert5", title: "학교 주변(등하굣길)도 안전하다고 느낀다.", required: true, scale: LIKERT5 },
      {
        id: "q5",
        type: "single",
        title: "학교에서 가장 위험하다고 느끼는 곳은?",
        required: false,
        options: [
          { id: "a", label: "계단·복도" },
          { id: "b", label: "운동장·체육관" },
          { id: "c", label: "화장실" },
          { id: "d", label: "등하굣길" },
          { id: "e", label: "특별히 없음" },
        ],
      },
      { id: "q6", type: "long", title: "학교가 더 안전해지려면 무엇이 필요할까요?", required: false },
    ],
    ["학생", "안전", "학교생활"]
  ),

  t(
    "student-50-school-pride",
    "우리 학교 자랑/개선점",
    "학생실태",
    [
      { id: "q1", type: "likert5", title: "우리 학교를 친구나 동생에게 추천하고 싶다.", required: true, scale: LIKERT5 },
      { id: "q2", type: "likert5", title: "우리 학교 다니는 것이 자랑스럽다.", required: true, scale: LIKERT5 },
      { id: "q3", type: "long", title: "우리 학교의 가장 자랑할 만한 점은 무엇인가요?", required: false },
      { id: "q4", type: "long", title: "우리 학교에서 꼭 개선되었으면 하는 점이 있다면 적어주세요.", required: false },
      { id: "q5", type: "long", title: "선생님과 학교에 마지막으로 하고 싶은 한마디를 자유롭게 적어주세요.", required: false },
    ],
    ["학생", "학교자랑", "개선점"]
  ),
];
