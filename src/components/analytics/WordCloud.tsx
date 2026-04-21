"use client";
import { useMemo } from "react";
import { computeWordFrequency } from "@/lib/analytics/wordFreq";

const COLORS = ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"];

export function WordCloud({ words }: { words: string[] }) {
  const freq = useMemo(() => computeWordFrequency(words, 40), [words]);
  if (freq.length === 0) {
    return <p className="text-slate-500 text-sm py-8 text-center">응답이 없거나 추출 가능한 단어가 없어요.</p>;
  }
  const max = freq[0]!.count;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl min-h-[240px] flex flex-wrap items-center justify-center gap-3">
      {freq.map((w, i) => {
        const size = 0.9 + (w.count / max) * 2.5;
        return (
          <span
            key={w.word}
            style={{
              fontSize: `${size}rem`,
              color: COLORS[i % COLORS.length],
              opacity: 0.6 + (w.count / max) * 0.4,
            }}
            className="font-bold transition-transform hover:scale-110 cursor-default leading-none"
            title={`${w.count}회 언급`}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
}
