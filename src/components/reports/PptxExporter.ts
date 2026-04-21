import pptxgen from "pptxgenjs";
import type { Survey, Response } from "@/lib/firebase/schema";

export async function exportPptx(survey: Survey, responses: Response[]) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.defineSlideMaster({
    title: "MAIN",
    background: { color: "FFFFFF" },
    objects: [
      {
        text: {
          text: "설문쌤",
          options: {
            x: 12.5,
            y: 7.2,
            w: 1,
            h: 0.3,
            fontSize: 10,
            color: "9CA3AF",
          },
        },
      },
    ],
  });

  // Cover
  const title = pres.addSlide({ masterName: "MAIN" });
  title.background = { color: "4F46E5" };
  title.addText(survey.title, {
    x: 0.5,
    y: 2.8,
    w: 12.3,
    h: 1.5,
    fontSize: 44,
    bold: true,
    color: "FFFFFF",
    align: "center",
    fontFace: "맑은 고딕",
  });
  title.addText("설문 결과 보고", {
    x: 0.5,
    y: 4.3,
    w: 12.3,
    h: 0.5,
    fontSize: 24,
    color: "E0E7FF",
    align: "center",
    fontFace: "맑은 고딕",
  });
  title.addText(
    `총 ${responses.length}명 응답 · ${new Date().toLocaleDateString("ko-KR")}`,
    {
      x: 0.5,
      y: 5.5,
      w: 12.3,
      h: 0.4,
      fontSize: 16,
      color: "E0E7FF",
      align: "center",
    }
  );

  const overview = pres.addSlide({ masterName: "MAIN" });
  overview.addText("조사 개요", {
    x: 0.5,
    y: 0.3,
    w: 12,
    h: 0.7,
    fontSize: 32,
    bold: true,
    color: "1F2937",
    fontFace: "맑은 고딕",
  });
  const overviewRows = [
    ["조사명", survey.title],
    [
      "대상",
      survey.targetType === "student"
        ? "학생"
        : survey.targetType === "parent"
          ? "학부모"
          : "교직원",
    ],
    [
      "기간",
      survey.createdAt
        ? new Date(survey.createdAt.seconds * 1000).toLocaleDateString("ko-KR")
        : new Date().toLocaleDateString("ko-KR"),
    ],
    ["응답 수", `${responses.length}명`],
  ].map((row) => row.map((cell) => ({ text: cell })));
  overview.addTable(overviewRows, {
    x: 1,
    y: 1.5,
    w: 11,
    fontSize: 18,
    fontFace: "맑은 고딕",
    colW: [3, 8],
    rowH: 0.6,
  });

  for (const q of survey.questions.filter((q) => q.type !== "section")) {
    const s = pres.addSlide({ masterName: "MAIN" });
    s.addText(q.title, {
      x: 0.5,
      y: 0.3,
      w: 12,
      h: 0.8,
      fontSize: 26,
      bold: true,
      color: "1F2937",
      fontFace: "맑은 고딕",
    });

    if ((q.type === "single" || q.type === "multiple") && q.options) {
      const data = q.options.map((o) => {
        const count = responses.filter((r) => {
          const a = r.answers[q.id];
          return Array.isArray(a) ? a.includes(o.id) : a === o.id;
        }).length;
        return { name: o.label, labels: [o.label], values: [count] };
      });
      s.addChart(pres.ChartType.bar, data, {
        x: 0.5,
        y: 1.5,
        w: 12,
        h: 5.5,
        showLegend: false,
        showValue: true,
        chartColors: ["4F46E5", "7C3AED", "EC4899", "F59E0B", "10B981", "3B82F6"],
      });
    } else if (
      q.type === "likert5" ||
      q.type === "likert7" ||
      q.type === "star" ||
      q.type === "nps"
    ) {
      const vals = responses
        .map((r) => r.answers[q.id])
        .filter((v): v is number => typeof v === "number");
      const avg = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : "—";
      s.addText(`평균: ${avg} / ${q.scale?.max ?? "-"}`, {
        x: 0.5,
        y: 3,
        w: 12,
        h: 1,
        fontSize: 48,
        bold: true,
        color: "4F46E5",
        align: "center",
        fontFace: "맑은 고딕",
      });
      s.addText(`응답: ${vals.length}건`, {
        x: 0.5,
        y: 4.2,
        w: 12,
        h: 0.5,
        fontSize: 20,
        color: "6B7280",
        align: "center",
        fontFace: "맑은 고딕",
      });
    }
  }

  await pres.writeFile({
    fileName: `${survey.title}_발표자료_${new Date().toISOString().slice(0, 10)}.pptx`,
  });
}
