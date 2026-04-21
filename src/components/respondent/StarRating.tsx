"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export function StarRating({
  max,
  value,
  onChange,
}: {
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const items = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div className="flex justify-center gap-2 py-4">
      {items.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${n}점`}
          className="p-1"
        >
          <Star
            className={`h-12 w-12 transition-colors ${
              n <= (hover || value) ? "fill-amber-400 text-amber-400" : "text-slate-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
