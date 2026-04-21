"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_TEMPLATES } from "@/templates";
import { useBuilder } from "@/stores/surveyBuilder";
import { useAuth } from "@/stores/auth";
import {
  listCustomTemplates,
  deleteCustomTemplate,
  type CustomTemplate,
} from "@/lib/firebase/customTemplates";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  CheckCircle,
  Search,
  Plus,
  Trash2,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import type { TemplateCategory } from "@/lib/firebase/schema";
import { toast } from "sonner";

const CATEGORIES: Array<TemplateCategory | "all"> = [
  "all",
  "학생실태",
  "학부모만족도",
  "교직원",
  "학교폭력실태",
  "수업만족도",
  "학교자체평가",
  "독서실태",
  "진로",
  "디지털",
  "급식방과후",
  "체험학습",
  "학생자치",
  "기타",
];

export default function TemplatesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const loadFromTemplate = useBuilder((s) => s.loadFromTemplate);
  const setMeta = useBuilder((s) => s.setMeta);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [myTemplates, setMyTemplates] = useState<CustomTemplate[]>([]);
  const [loadingMine, setLoadingMine] = useState(true);

  useEffect(() => {
    if (!user) return;
    listCustomTemplates(user.uid)
      .then(setMyTemplates)
      .finally(() => setLoadingMine(false));
  }, [user]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return ALL_TEMPLATES.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (s) {
        const hay = `${t.name} ${t.tags.join(" ")} ${t.category}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [search, category]);

  const startFrom = (id: string) => {
    const tpl = ALL_TEMPLATES.find((t) => t.id === id);
    if (!tpl) return;
    setMeta("title", tpl.name);
    setMeta(
      "targetType",
      tpl.tags.includes("학부모")
        ? "parent"
        : tpl.tags.includes("교직원")
          ? "teacher"
          : "student"
    );
    loadFromTemplate(tpl.questions);
    router.push("/surveys/new");
  };

  const startFromMine = (id: string) => {
    const tpl = myTemplates.find((t) => t.id === id);
    if (!tpl) return;
    setMeta("title", tpl.name);
    loadFromTemplate(tpl.questions);
    router.push("/surveys/new");
  };

  const removeMine = async (id: string) => {
    if (!user) return;
    if (!confirm("이 템플릿을 삭제할까요?")) return;
    try {
      await deleteCustomTemplate(user.uid, id);
      setMyTemplates((prev) => prev.filter((t) => t.id !== id));
      toast.success("삭제되었어요");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "삭제 실패";
      toast.error(msg);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-2">템플릿 · 내가 직접 만들기</h1>
          <p className="text-slate-600">
            공식 양식 15종 + 학교 현장용 200개 + 내가 저장한 템플릿 + AI로 직접 만들기
          </p>
        </div>
        <Link href="/surveys/new">
          <Button size="lg">
            <Plus className="h-4 w-4" />
            빈 설문부터 만들기
          </Button>
        </Link>
      </header>

      <Tabs defaultValue="public" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="public">
            <Sparkles className="h-4 w-4 mr-1" />
            기본 템플릿 ({ALL_TEMPLATES.length})
          </TabsTrigger>
          <TabsTrigger value="mine">
            <UserIcon className="h-4 w-4 mr-1" />내 템플릿 ({myTemplates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="템플릿 이름, 태그, 주제로 검색"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  category === c
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c === "all" ? "전체" : c}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            {filtered.length}개 표시 · 전체 {ALL_TEMPLATES.length}개
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tpl) => (
              <Card key={tpl.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="font-semibold text-sm leading-snug">{tpl.name}</h3>
                    {tpl.isOfficial && (
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        <CheckCircle className="h-3 w-3 mr-0.5" />
                        공식
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    {tpl.category} · {tpl.source}
                  </p>
                  <p className="text-xs text-slate-600 mb-4">
                    문항 {tpl.questions.length}개
                  </p>
                  <Button size="sm" className="w-full" onClick={() => startFrom(tpl.id)}>
                    이 템플릿으로 시작
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mine" className="space-y-4">
          {loadingMine ? (
            <p className="text-sm text-slate-500">불러오는 중...</p>
          ) : myTemplates.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <UserIcon className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-600 mb-2">아직 저장한 템플릿이 없어요</p>
                <p className="text-xs text-slate-500 mb-4">
                  설문을 만든 뒤 빌더 상단의 &ldquo;내 템플릿 저장&rdquo;을 눌러 나만의
                  템플릿을 저장할 수 있어요.
                </p>
                <Link href="/surveys/new">
                  <Button variant="outline">
                    <Plus className="h-4 w-4" />
                    새 설문 만들기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myTemplates.map((tpl) => (
                <Card key={tpl.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-sm mb-1 leading-snug">{tpl.name}</h3>
                    <p className="text-xs text-slate-500 mb-2">{tpl.category}</p>
                    {tpl.description && (
                      <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                        {tpl.description}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 mb-4">
                      문항 {tpl.questions.length}개
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => startFromMine(tpl.id)}
                      >
                        사용
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeMine(tpl.id)}
                        aria-label="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
