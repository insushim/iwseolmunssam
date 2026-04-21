"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "@/stores/auth";
import type { Survey } from "@/lib/firebase/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SurveysListPage() {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "surveys"),
      where("teacherId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setSurveys(snap.docs.map((d) => ({ ...(d.data() as Survey), id: d.id })));
    });
    return unsub;
  }, [user]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">내 설문</h1>
        <Link href="/surveys/new">
          <Button>
            <Plus className="h-4 w-4" />
            새 설문
          </Button>
        </Link>
      </header>
      {surveys.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-slate-600">
            아직 만든 설문이 없어요.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {surveys.map((s) => (
            <Link key={s.id} href={`/surveys/${s.id}/analytics`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      문항 {s.questions.length}개 · 코드 {s.distribution.shortCode || "—"}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      s.status === "open"
                        ? "bg-green-100 text-green-700"
                        : s.status === "draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {s.status === "open"
                      ? "진행중"
                      : s.status === "draft"
                        ? "초안"
                        : "종료"}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
