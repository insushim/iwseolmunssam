"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OFFICIAL_TEMPLATES } from "@/templates/education";
import { useBuilder } from "@/stores/surveyBuilder";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function TemplatesPage() {
  const router = useRouter();
  const loadFromTemplate = useBuilder((s) => s.loadFromTemplate);
  const setMeta = useBuilder((s) => s.setMeta);

  const startFromTemplate = (templateId: string) => {
    const tpl = OFFICIAL_TEMPLATES.find((t) => t.id === templateId);
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

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">검증된 교육 설문 템플릿</h1>
        <p className="text-slate-600">
          평가원·교육부·시도교육청의 공식 양식을 그대로. 클릭 한 번으로 시작하세요.
        </p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {OFFICIAL_TEMPLATES.map((tpl) => (
          <Card key={tpl.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{tpl.name}</h3>
                {tpl.isOfficial && (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    공식
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-3">출처: {tpl.source}</p>
              <p className="text-sm text-slate-600 mb-4">
                문항 {tpl.questions.length}개 · {tpl.category}
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => startFromTemplate(tpl.id)}
              >
                이 템플릿으로 시작
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/surveys/new">
          <Button variant="outline">빈 설문으로 시작하기</Button>
        </Link>
      </div>
    </div>
  );
}
