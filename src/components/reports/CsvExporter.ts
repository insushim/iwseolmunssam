import Papa from "papaparse";
import { saveAs } from "file-saver";
import type { Survey, Response } from "@/lib/firebase/schema";

export function exportCsv(survey: Survey, responses: Response[]) {
  const visibleQuestions = survey.questions.filter((q) => q.type !== "section");
  const headers = ["응답ID", "제출시각", ...visibleQuestions.map((q) => q.title)];
  const rows = responses.map((r) => {
    const row: Record<string, string> = {
      응답ID: r.id,
      제출시각: r.submittedAt
        ? new Date(r.submittedAt.seconds * 1000).toLocaleString("ko-KR")
        : "",
    };
    for (const q of visibleQuestions) {
      let val: unknown = r.answers[q.id];
      if (Array.isArray(val) && q.options) {
        val = val
          .map((id) => q.options!.find((o) => o.id === id)?.label ?? id)
          .join("; ");
      } else if (typeof val === "string" && q.options) {
        val = q.options.find((o) => o.id === val)?.label ?? val;
      } else if (val === undefined || val === null) {
        val = "";
      }
      row[q.title] = String(val);
    }
    return row;
  });
  const csv = Papa.unparse(rows, { columns: headers });
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `${survey.title}_원본데이터_${new Date().toISOString().slice(0, 10)}.csv`);
}
