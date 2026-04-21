import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Question, TemplateCategory } from "@/lib/firebase/schema";

export interface CustomTemplate {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  questions: Question[];
  createdAt: Timestamp;
}

export async function saveCustomTemplate(
  uid: string,
  data: Omit<CustomTemplate, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db, `teachers/${uid}/templates`), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listCustomTemplates(uid: string): Promise<CustomTemplate[]> {
  const q = query(
    collection(db, `teachers/${uid}/templates`),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    ...(d.data() as Omit<CustomTemplate, "id">),
    id: d.id,
  }));
}

export async function deleteCustomTemplate(uid: string, templateId: string): Promise<void> {
  await deleteDoc(doc(db, `teachers/${uid}/templates/${templateId}`));
}
