"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Response } from "@/lib/firebase/schema";

export function useLiveResponses(surveyId: string) {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!surveyId) return;
    const q = query(
      collection(db, `surveys/${surveyId}/responses`),
      orderBy("submittedAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setResponses(snap.docs.map((d) => ({ ...(d.data() as Response), id: d.id })));
      setLoading(false);
    });
    return unsub;
  }, [surveyId]);

  return { responses, loading };
}
