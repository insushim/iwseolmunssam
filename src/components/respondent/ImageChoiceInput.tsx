"use client";
import type { Option } from "@/lib/firebase/schema";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageChoiceInput({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "border-2 rounded-xl p-3 transition-all aspect-square flex flex-col items-center justify-center gap-2",
            value === o.id ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-300"
          )}
        >
          {o.image ? (
            <img src={o.image} alt={o.label} className="max-h-24 object-contain" />
          ) : (
            <ImageIcon className="h-12 w-12 text-slate-300" />
          )}
          <span className="text-sm font-medium text-center">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
