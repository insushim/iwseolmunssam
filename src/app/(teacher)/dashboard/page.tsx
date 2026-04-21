"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "@/stores/auth";
import type { Survey } from "@/lib/firebase/schema";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, Clock, CircleCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
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

  const openCount = surveys.filter((s) => s.status === "open").length;
  const archivedCount = surveys.filter((s) => s.status === "archived").length;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-slate-600 mt-1">
            안녕하세요, {user?.displayName ?? "선생님"}!
          </p>
        </div>
        <Link href="/surveys/new">
          <Button size="lg">
            <Plus className="h-4 w-4" />새 설문 만들기
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">전체 설문</p>
                <p className="text-3xl font-bold mt-1">{surveys.length}</p>
              </div>
              <FileText className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">진행 중</p>
                <p className="text-3xl font-bold mt-1 text-green-600">{openCount}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">완료/보관</p>
                <p className="text-3xl font-bold mt-1">{archivedCount}</p>
              </div>
              <CircleCheck className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">최근 설문</h2>
      {surveys.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600 mb-4">아직 만든 설문이 없어요</p>
            <Link href="/surveys/new">
              <Button>첫 설문 만들기</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {surveys.slice(0, 10).map((s) => (
            <Link key={s.id} href={`/surveys/${s.id}/analytics`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {s.targetType === "student" ? "학생" : s.targetType === "parent" ? "학부모" : "교직원"} ·
                      문항 {s.questions.length}개
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        s.status === "open"
                          ? "bg-green-100 text-green-700"
                          : s.status === "draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {s.status === "open" ? "진행중" : s.status === "draft" ? "초안" : "종료"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
