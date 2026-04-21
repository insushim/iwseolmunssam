"use client";
import { useState, useEffect } from "react";
import { useBuilder } from "@/stores/surveyBuilder";
import { useAuth } from "@/stores/auth";
import { QuestionPalette } from "@/components/builder/QuestionPalette";
import { QuestionList } from "@/components/builder/QuestionList";
import { QuestionEditor } from "@/components/builder/QuestionEditor";
import { BuilderHeader } from "@/components/builder/BuilderHeader";
import { SettingsPanel } from "@/components/builder/SettingsPanel";
import { PreviewDrawer } from "@/components/builder/PreviewDrawer";

export default function NewSurveyPage() {
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useAuth();
  const setMeta = useBuilder((s) => s.setMeta);

  useEffect(() => {
    if (user) setMeta("teacherId", user.uid);
  }, [user, setMeta]);

  return (
    <div className="flex h-screen flex-col">
      <BuilderHeader onPreview={() => setShowPreview(true)} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-white overflow-y-auto">
          <QuestionPalette />
          <SettingsPanel />
        </aside>
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <QuestionList />
        </main>
        <aside className="w-80 border-l bg-white overflow-y-auto">
          <QuestionEditor />
        </aside>
      </div>
      <PreviewDrawer open={showPreview} onClose={() => setShowPreview(false)} />
    </div>
  );
}
