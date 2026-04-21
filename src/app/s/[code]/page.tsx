"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function EntryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, "surveys"),
          where("distribution.shortCode", "==", code),
          where("status", "==", "open"),
          limit(1)
        );
        const snap = await getDocs(q);
        if (snap.empty) {
          setError("설문을 찾을 수 없거나 종료되었어요.");
          return;
        }
        const surveyDoc = snap.docs[0]!;
        router.replace(`/s/${code}/consent?sid=${surveyDoc.id}`);
      } catch {
        setError("설문을 불러올 수 없어요. 잠시 후 다시 시도해주세요.");
      }
    })();
  }, [code, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-2xl font-bold mb-2">😢 {error}</h1>
            <p className="text-slate-600">선생님께 코드를 다시 확인해주세요.</p>
          </>
        ) : (
          <>
            <div className="h-10 w-10 mx-auto animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-4" />
            <p className="text-slate-600">설문을 찾고 있어요...</p>
          </>
        )}
      </div>
    </div>
  );
}
