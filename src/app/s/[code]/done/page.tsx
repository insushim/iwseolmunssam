"use client";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

export default function DonePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="text-center max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CircleCheck className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">응답 감사합니다</h1>
        <p className="text-slate-600 mb-6">
          소중한 의견은 학교 교육활동 개선에 사용됩니다.
        </p>
        <Link
          href="/"
          className="inline-block text-sm text-indigo-600 hover:underline"
        >
          설문쌤 홈으로
        </Link>
      </div>
    </div>
  );
}
