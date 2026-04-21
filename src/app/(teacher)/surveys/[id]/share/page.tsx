"use client";
import { use, useState } from "react";
import { useSurvey } from "@/hooks/useSurvey";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Printer } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { toast } from "sonner";

export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { survey, loading } = useSurvey(id);
  const [tokenCount, setTokenCount] = useState(30);
  const [tokens, setTokens] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  if (loading || !survey) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "https://surveysaem.web.app";
  const url = survey.distribution.qrUrl || `${baseUrl}/s/${survey.distribution.shortCode}`;
  const code = survey.distribution.shortCode;

  const handleGenerateTokens = async () => {
    setGenerating(true);
    try {
      const fn = httpsCallable<unknown, { ids: string[] }>(functions, "generateTokens");
      const res = await fn({ surveyId: id, count: tokenCount });
      setTokens(res.data.ids);
      toast.success(`${tokenCount}개 토큰 생성 완료`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "토큰 생성 실패";
      toast.error(msg);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrintTokens = () => {
    const html = `
      <html><head><title>${survey.title} - 참여 코드</title>
      <style>
        @page { size: A4; margin: 1cm; }
        body { font-family: 'Malgun Gothic', sans-serif; }
        h1 { font-size:14pt; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; }
        .card { border: 1px dashed #888; padding: 6mm; text-align: center; page-break-inside: avoid; }
        h2 { font-size: 11pt; margin: 0 0 3mm 0; }
        .url { font-size: 9pt; color: #666; }
        .code { font-size: 18pt; font-weight: bold; font-family: monospace; letter-spacing: 2px; margin-top: 3mm; }
      </style></head><body>
      <h1>${survey.title} — 참여 코드</h1>
      <div class="grid">
        ${tokens
          .map(
            (t) => `
          <div class="card">
            <h2>설문쌤</h2>
            <div class="url">${baseUrl}/s/${code}</div>
            <div class="code">${t}</div>
          </div>`
          )
          .join("")}
      </div>
      </body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.print();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">설문 배포</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold mb-4">QR 코드 + 짧은 주소</h2>
          <div className="bg-white p-4 rounded-lg flex justify-center">
            <QRCodeSVG value={url} size={220} level="M" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <Input value={url} readOnly />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  toast.success("복사됨");
                }}
                aria-label="URL 복사"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-slate-600">
              또는{" "}
              <code className="bg-slate-100 px-2 py-1 rounded font-mono">{code}</code>{" "}
              코드 입력
            </p>
          </div>
        </div>

        {survey.duplicatePrevention === "token" && (
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold mb-4">일회용 토큰 생성</h2>
            <p className="text-sm text-slate-600 mb-3">
              학급 인원수만큼 생성 → 프린트 → 각자 배부
            </p>
            <div className="flex gap-2 mb-3">
              <Input
                type="number"
                min={1}
                max={500}
                value={tokenCount}
                onChange={(e) => setTokenCount(parseInt(e.target.value || "30"))}
              />
              <Button onClick={handleGenerateTokens} disabled={generating}>
                {generating ? "생성 중..." : "생성"}
              </Button>
            </div>
            {tokens.length > 0 && (
              <>
                <div className="max-h-40 overflow-y-auto p-3 bg-slate-50 rounded font-mono text-xs">
                  {tokens.map((t) => (
                    <div key={t}>{t}</div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={handlePrintTokens}
                >
                  <Printer className="h-4 w-4" /> 프린트 (3열 × N행)
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
