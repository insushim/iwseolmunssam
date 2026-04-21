"use client";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Survey } from "@/lib/firebase/schema";

export function useSurvey(id: string) {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, "surveys", id), (snap) => {
      if (snap.exists()) {
        setSurvey({ ...(snap.data() as Survey), id: snap.id });
      } else {
        setSurvey(null);
      }
      setLoading(false);
    });
    return unsub;
  }, [id]);

  return { survey, loading };
}
