"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { LayoutDashboard, FileText, Folder, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/surveys", label: "내 설문", icon: FileText },
  { href: "/templates", label: "템플릿", icon: Folder },
  { href: "/settings", label: "설정", icon: Settings },
];

export function TeacherSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <aside className="w-56 border-r bg-white flex flex-col">
      <div className="p-6">
        <Link href="/dashboard">
          <div className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            설문쌤
          </div>
        </Link>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {NAV.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
