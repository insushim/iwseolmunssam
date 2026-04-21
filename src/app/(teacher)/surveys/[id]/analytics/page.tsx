"use client";
import { use } from "react";
import { useSurvey } from "@/hooks/useSurvey";
import { useLiveResponses } from "@/hooks/useLiveResponses";
import { LiveCounter } from "@/components/analytics/LiveCounter";
import { ResultChart } from "@/components/analytics/ResultChart";
import { WordCloud } from "@/components/analytics/WordCloud";
import { Button } from "@/components/ui/button";
import { Download, FileText, Presentation, Share2 } from "lucide-react";
import { exportDocx } from "@/components/reports/DocxExporter";
import { exportPptx } from "@/components/reports/PptxExporter";
import { exportCsv } from "@/components/reports/CsvExporter";
import Link from "next/link";

export default function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { survey, loading } = useSurvey(id);
  const { responses } = useLiveResponses(id);

  if (loading || !survey) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{survey.title}</h1>
          <p className="text-slate-600 mt-1">실시간 결과 분석</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/surveys/${id}/share`}>
            <Button variant="outline">
              <Share2 className="h-4 w-4" /> 공유
            </Button>
          </Link>
          <Button variant="outline" onClick={() => exportDocx(survey, responses)}>
            <FileText className="h-4 w-4" /> DOCX 보고서
          </Button>
          <Button variant="outline" onClick={() => exportPptx(survey, responses)}>
            <Presentation className="h-4 w-4" /> PPTX 슬라이드
          </Button>
          <Button variant="outline" onClick={() => exportCsv(survey, responses)}>
            <Download className="h-4 w-4" /> CSV 원본
          </Button>
        </div>
      </header>

      <LiveCounter survey={survey} responses={responses} />

      <div className="mt-6 space-y-6">
        {survey.questions
          .filter((q) => q.type !== "section")
          .map((q) => (
            <div key={q.id} className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold mb-4">{q.title}</h3>
              {["single", "multiple", "imageChoice", "likert5", "likert7", "star", "nps"].includes(
                q.type
              ) ? (
                <ResultChart question={q} responses={responses} />
              ) : q.type === "short" || q.type === "long" ? (
                <div>
                  <WordCloud
                    words={responses
                      .map((r) => r.answers[q.id])
                      .filter((v): v is string => typeof v === "string")}
                  />
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-slate-600">
                      전체 응답 보기 (
                      {responses.filter((r) => r.answers[q.id]).length}건)
                    </summary>
                    <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                      {responses
                        .filter((r) => r.answers[q.id])
                        .map((r) => (
                          <div key={r.id} className="p-3 bg-slate-50 rounded text-sm">
                            {String(r.answers[q.id])}
                          </div>
                        ))}
                    </div>
                  </details>
                </div>
              ) : q.type === "rank" ? (
                <p className="text-sm text-slate-500">순위 결과는 CSV로 다운로드해 확인하세요.</p>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
}
