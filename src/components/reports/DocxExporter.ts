import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  HeadingLevel,
  WidthType,
  ShadingType,
} from "docx";
import { saveAs } from "file-saver";
import type { Survey, Response } from "@/lib/firebase/schema";
import { computeWordFrequency } from "@/lib/analytics/wordFreq";

export async function exportDocx(survey: Survey, responses: Response[]) {
  const createdDate = survey.createdAt
    ? new Date(survey.createdAt.seconds * 1000)
    : new Date();
  const now = new Date();

  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: survey.title, bold: true, size: 36, font: "맑은 고딕" })],
      spacing: { after: 400 },
    })
  );

  children.push(
    new Paragraph({
      text: "Ⅰ. 조사 개요",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    })
  );

  // overview rows are rendered as a Table (added to children below)

  children.push(
    new Paragraph({
      text: "Ⅱ. 응답 현황",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    })
  );
  children.push(
    new Paragraph({
      children: [new TextRun({ text: `총 ${responses.length}명 응답`, bold: true })],
      spacing: { after: 200 },
    })
  );

  children.push(
    new Paragraph({
      text: "Ⅲ. 문항별 결과",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    })
  );

  for (const q of survey.questions.filter((q) => q.type !== "section")) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: q.title, bold: true, size: 24 })],
        spacing: { before: 300, after: 100 },
      })
    );
    if ((q.type === "single" || q.type === "multiple") && q.options) {
      for (const o of q.options) {
        const count = responses.filter((r) => {
          const a = r.answers[q.id];
          return Array.isArray(a) ? a.includes(o.id) : a === o.id;
        }).length;
        const pct = responses.length ? Math.round((count / responses.length) * 100) : 0;
        children.push(
          new Paragraph({
            text: `  • ${o.label}: ${count}명 (${pct}%)`,
            spacing: { after: 60 },
          })
        );
      }
    } else if (
      q.type === "likert5" ||
      q.type === "likert7" ||
      q.type === "star" ||
      q.type === "nps"
    ) {
      const values = responses
        .map((r) => r.answers[q.id])
        .filter((v): v is number => typeof v === "number");
      const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      children.push(
        new Paragraph({
          text: `  평균: ${avg.toFixed(2)} / ${q.scale?.max ?? "-"} (응답 ${values.length}명)`,
          spacing: { after: 120 },
        })
      );
    }
  }

  const openQuestions = survey.questions.filter(
    (q) => q.type === "short" || q.type === "long"
  );
  if (openQuestions.length > 0) {
    children.push(
      new Paragraph({
        text: "Ⅳ. 주관식 주요 의견",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );
    for (const q of openQuestions) {
      const texts = responses
        .map((r) => r.answers[q.id])
        .filter((v): v is string => typeof v === "string" && v.length > 0);
      children.push(
        new Paragraph({
          children: [new TextRun({ text: q.title, bold: true, size: 24 })],
          spacing: { before: 300, after: 100 },
        })
      );
      children.push(
        new Paragraph({ text: `응답 ${texts.length}건`, spacing: { after: 100 } })
      );
      const freq = computeWordFrequency(texts, 15);
      if (freq.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: "주요 키워드: ", bold: true }),
              new TextRun({ text: freq.map((f) => `${f.word}(${f.count})`).join(", ") }),
            ],
            spacing: { after: 100 },
          })
        );
      }
      for (const t of texts.slice(0, 20)) {
        children.push(new Paragraph({ text: `• ${t}`, spacing: { after: 40 } }));
      }
      if (texts.length > 20) {
        children.push(
          new Paragraph({
            text: `... 외 ${texts.length - 20}건`,
            spacing: { after: 100 },
          })
        );
      }
    }
  }

  children.push(
    new Paragraph({
      text: "Ⅴ. 결론 및 시사점",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    })
  );
  children.push(
    new Paragraph({
      text: "(작성자가 직접 작성하시는 영역입니다)",
      spacing: { after: 400 },
    })
  );

  const overviewTable = renderOverviewTable(survey, responses, createdDate, now);

  const doc = new Document({
    creator: "설문쌤",
    title: survey.title,
    styles: {
      default: { document: { run: { font: "맑은 고딕", size: 22 } } },
    },
    sections: [
      {
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
        children: [children[0]!, children[1]!, overviewTable, ...children.slice(2)],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${survey.title}_결과보고서_${now.toISOString().slice(0, 10)}.docx`);
}

function renderOverviewTable(
  survey: Survey,
  responses: Response[],
  created: Date,
  now: Date
): Table {
  const kv: Array<[string, string]> = [
    ["조사명", survey.title],
    [
      "조사 대상",
      survey.targetType === "student"
        ? "학생"
        : survey.targetType === "parent"
          ? "학부모"
          : "교직원",
    ],
    [
      "조사 기간",
      `${created.toLocaleDateString("ko-KR")} ~ ${now.toLocaleDateString("ko-KR")}`,
    ],
    ["조사 방법", "온라인 설문 (PWA)"],
    ["익명 여부", survey.isAnonymous ? "완전 익명" : "실명 (개인정보 동의 하)"],
    ["응답 수", `${responses.length}명`],
  ];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: kv.map(
      ([k, v]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, color: "auto", fill: "F3F4F6" },
              children: [
                new Paragraph({ children: [new TextRun({ text: k, bold: true })] }),
              ],
            }),
            new TableCell({
              width: { size: 75, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ text: v })],
            }),
          ],
        })
    ),
  });
}
