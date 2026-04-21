"use client";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Survey } from "@/lib/firebase/schema";
import { generateConsent, type ConsentText } from "@/lib/survey/consent";
import { Button } from "@/components/ui/button";
import { Shield, ChevronRight } from "lucide-react";

export default function ConsentPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const sp = useSearchParams();
  const router = useRouter();
  const sid = sp.get("sid");
  const tokenParam = sp.get("t");
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [consent, setConsent] = useState<ConsentText | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sid) return;
    getDoc(doc(db, "surveys", sid)).then((snap) => {
      if (snap.exists()) {
        const s = { ...(snap.data() as Survey), id: snap.id };
        setSurvey(s);
        setConsent(generateConsent(s, "담당 교사", "본교"));
      }
      setLoading(false);
    });
  }, [sid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }
  if (!survey || !consent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <p className="text-slate-600">설문을 찾을 수 없어요.</p>
      </div>
    );
  }

  const proceed = () => {
    const params = new URLSearchParams();
    params.set("sid", sid!);
    if (tokenParam) params.set("t", tokenParam);
    router.push(`/s/${code}/fill?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Shield className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="font-bold text-lg">{survey.title}</h1>
            <p className="text-sm text-slate-600">개인정보 수집·이용 안내</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <Row label="조사 목적" value={consent.purpose} />
          <Row label="수집 항목" value={consent.items.join(", ")} />
          <Row label="보유·이용 기간" value={consent.retention} />
          <Row label="제3자 제공" value={consent.thirdParty} />
          <Row label="거부 권리" value={consent.rightsToRefuse} />
          <Row label="법적 근거" value={consent.legalBasis} />
          <Row label="문의처" value={consent.contact} />
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col gap-2">
          <Button size="lg" className="w-full h-12 text-base" onClick={proceed}>
            동의하고 시작하기
            <ChevronRight className="h-4 w-4" />
          </Button>
          <button
            onClick={() => router.push("/")}
            className="text-sm text-slate-500 underline"
          >
            동의하지 않음 (참여하지 않기)
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-2 border-b border-slate-100">
      <dt className="text-slate-500 font-medium">{label}</dt>
      <dd className="col-span-2 text-slate-700">{value}</dd>
    </div>
  );
}
