"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { useAuth } from "@/stores/auth";

export function useAuthGuard() {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.replace("/login");
    });
    return unsub;
  }, [router, setUser]);

  return { user, loading };
}
