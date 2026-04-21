"use client";
import { cn } from "@/lib/utils";

export function LikertScale({
  scale,
  value,
  onChange,
  extraLabels,
}: {
  scale: { min: number; max: number; labels?: string[] };
  value: number | null;
  onChange: (v: number) => void;
  extraLabels?: [string, string];
}) {
  const items: number[] = [];
  for (let i = scale.min; i <= scale.max; i++) items.push(i);

  return (
    <div>
      {extraLabels && (
        <div className="flex justify-between text-xs text-slate-500 mb-3 px-1">
          <span>{extraLabels[0]}</span>
          <span>{extraLabels[1]}</span>
        </div>
      )}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((n, i) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              "h-14 sm:h-16 rounded-lg border-2 font-bold text-lg transition-all",
              value === n
                ? "border-indigo-500 bg-indigo-500 text-white scale-105"
                : "border-slate-200 bg-white hover:border-indigo-300"
            )}
          >
            {n}
          </button>
        ))}
      </div>
      {scale.labels && (
        <div className="flex justify-between text-xs text-slate-600 mt-3 px-1">
          {scale.labels.map((l, i) => (
            <span key={i} className="flex-1 text-center">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
