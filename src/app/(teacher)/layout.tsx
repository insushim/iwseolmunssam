"use client";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { TeacherSidebar } from "@/components/teacher/Sidebar";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthGuard();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
