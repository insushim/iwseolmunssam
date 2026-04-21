"use client";
import { motion } from "framer-motion";
import type { Survey, Response } from "@/lib/firebase/schema";

export function LiveCounter({ survey, responses }: { survey: Survey; responses: Response[] }) {
  const max = survey.distribution.maxResponses;
  const rate = max ? Math.round((responses.length / max) * 100) : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6"
      >
        <div className="text-sm opacity-90">총 응답</div>
        <div className="text-4xl font-bold mt-1">{responses.length}</div>
        {max && <div className="text-xs opacity-75 mt-1">/ {max}명</div>}
      </motion.div>
      <div className="bg-white border rounded-xl p-6">
        <div className="text-sm text-slate-600">응답률</div>
        <div className="text-4xl font-bold mt-1">{rate !== null ? `${rate}%` : "—"}</div>
      </div>
      <div className="bg-white border rounded-xl p-6">
        <div className="text-sm text-slate-600">상태</div>
        <div className="text-2xl font-bold mt-1 flex items-center gap-2">
          {survey.status === "open" && (
            <>
              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              진행중
            </>
          )}
          {survey.status === "closed" && "종료"}
          {survey.status === "draft" && "초안"}
          {survey.status === "archived" && "보관"}
        </div>
      </div>
      <div className="bg-white border rounded-xl p-6">
        <div className="text-sm text-slate-600">자동 삭제</div>
        <div className="text-base font-bold mt-1">
          {survey.retention.autoDeleteAt
            ? new Date(survey.retention.autoDeleteAt.seconds * 1000).toLocaleString("ko-KR")
            : "—"}
        </div>
      </div>
    </div>
  );
}
