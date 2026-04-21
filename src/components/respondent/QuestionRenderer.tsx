"use client";
import type { Question, AnswerValue } from "@/lib/firebase/schema";
import { LikertScale } from "./LikertScale";
import { StarRating } from "./StarRating";
import { RankingInput } from "./RankingInput";
import { ImageChoiceInput } from "./ImageChoiceInput";

export function QuestionRenderer({
  question,
  value,
  onChange,
  index,
  total,
}: {
  question: Question | undefined;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
  index: number;
  total: number;
}) {
  if (!question) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="text-sm text-slate-500 mb-2">
        {index} / {total}
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        {question.title}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </h2>
      {question.description && (
        <p className="text-slate-600 mb-4">{question.description}</p>
      )}
      {question.image && (
        <img src={question.image} alt="" className="mb-4 rounded-lg max-h-60 mx-auto" />
      )}

      {question.type === "section" && (
        <div className="text-center text-slate-600 py-8">— 섹션 구분 —</div>
      )}

      {question.type === "single" && (
        <div className="space-y-2">
          {(question.options ?? []).map((o) => (
            <label
              key={o.id}
              className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all min-h-[52px] ${
                value === o.id ? "border-indigo-500 bg-indigo-50" : "hover:border-indigo-300"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={o.id}
                checked={value === o.id}
                onChange={() => onChange(o.id)}
                className="h-5 w-5"
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "multiple" && (
        <div className="space-y-2">
          {(question.options ?? []).map((o) => {
            const arr = Array.isArray(value) ? value : [];
            const selected = arr.includes(o.id);
            return (
              <label
                key={o.id}
                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all min-h-[52px] ${
                  selected ? "border-indigo-500 bg-indigo-50" : "hover:border-indigo-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => {
                    const set = new Set<string>(arr);
                    if (e.target.checked) set.add(o.id);
                    else set.delete(o.id);
                    onChange(Array.from(set));
                  }}
                  className="h-5 w-5"
                />
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {(question.type === "likert5" || question.type === "likert7") && question.scale && (
        <LikertScale scale={question.scale} value={typeof value === "number" ? value : null} onChange={onChange} />
      )}

      {question.type === "star" && (
        <StarRating
          max={question.scale?.max ?? 5}
          value={typeof value === "number" ? value : 0}
          onChange={onChange}
        />
      )}

      {question.type === "nps" && question.scale && (
        <LikertScale
          scale={question.scale}
          value={typeof value === "number" ? value : null}
          onChange={onChange}
          extraLabels={["전혀 추천하지 않음", "매우 추천함"]}
        />
      )}

      {question.type === "rank" && question.options && (
        <RankingInput
          options={question.options}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      )}

      {question.type === "short" && (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="답변을 입력하세요"
          className="w-full p-4 border rounded-xl text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      )}

      {question.type === "long" && (
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="자세히 답변해주세요"
          rows={6}
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      )}

      {question.type === "imageChoice" && question.options && (
        <ImageChoiceInput
          options={question.options}
          value={typeof value === "string" ? value : null}
          onChange={onChange}
        />
      )}
    </div>
  );
}
