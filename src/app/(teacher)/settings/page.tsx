"use client";
import { useAuth } from "@/stores/auth";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">설정</h1>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <div className="text-sm text-slate-500">계정</div>
            <div className="font-medium">{user?.email ?? "—"}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">이름</div>
            <div className="font-medium">{user?.displayName ?? "—"}</div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-slate-600 leading-relaxed">
              설문쌤은 100% 국내 처리, 익명 기본, 자동 동의서 생성을 원칙으로 합니다.
              학교 감사·민원에 즉시 대응 가능한 데이터 보존 정책을 적용합니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
