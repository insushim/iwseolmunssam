import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, Languages, FileText, QrCode, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "법적으로 안전",
    desc: "100% 국내 처리, 자동 동의서, IP 미저장. 학교 감사·민원에 즉시 대응.",
  },
  {
    icon: QrCode,
    title: "QR + 짧은 코드",
    desc: "6자리 코드 또는 QR로 학생·학부모가 앱 설치 없이 즉시 응답.",
  },
  {
    icon: BarChart3,
    title: "실시간 결과",
    desc: "응답이 들어오는 즉시 차트·워드클라우드로 시각화.",
  },
  {
    icon: FileText,
    title: "DOCX·PPTX 보고서",
    desc: "한 번의 클릭으로 한컴/MS워드, 발표용 PPT 자동 생성.",
  },
  {
    icon: Languages,
    title: "7개 언어",
    desc: "다문화 가정 학부모를 위한 베트남어·중국어·태국어 자동 번역.",
  },
  {
    icon: Sparkles,
    title: "AI 문항 생성",
    desc: "교사 설문 한정으로 AI가 검증된 문항을 자동 제안.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            설문쌤
          </div>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost">로그인</Button>
            </Link>
            <Link href="/login">
              <Button>시작하기</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-32">
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            교사가 안심하고 쓰는 학교용 설문 도구
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              설문쌤
            </span>
            과 함께
            <br />
            걱정 없이 설문하세요
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            구글 폼이 부담스러우셨나요? 데이터가 미국으로 가는 게 신경 쓰이셨나요?
            <br />
            <span className="font-semibold text-slate-800">
              설문쌤은 100% 국내 처리, 익명 기본, 자동 동의서 생성으로 학교 감사에 대비합니다.
            </span>
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="text-base h-12 px-8">
                무료로 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-base h-12 px-8">
                기능 살펴보기
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="mt-32 grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4">검증된 교육 설문 템플릿 15종</h2>
          <p className="text-slate-600 mb-8">
            평가원·교육부·시도교육청 공식 양식을 그대로. 클릭 한 번으로 시작.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {[
              "독서 실태",
              "학교폭력 실태",
              "수업 만족도",
              "학부모 만족도",
              "학교 자체평가",
              "진로 인식",
              "디지털 역량",
              "학급 분위기",
              "미디어 리터러시",
              "급식 만족도",
              "방과후 만족도",
              "체험학습 만족도",
              "학생자치 의견",
              "교직원 의견",
              "빠른 펄스",
            ].map((t) => (
              <span
                key={t}
                className="px-4 py-2 bg-white border rounded-full text-sm text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/70 py-8 text-center text-sm text-slate-500">
        © 2026 설문쌤 · 선행 심선생 (심필굿)
      </footer>
    </div>
  );
}
