import Dexie, { type Table } from "dexie";
import type { Survey, Response } from "@/lib/firebase/schema";

export interface DraftSurvey {
  id: string;
  data: Partial<Survey>;
  updatedAt: number;
}

export class SurveySaemDB extends Dexie {
  surveys!: Table<Survey, string>;
  responses!: Table<Response & { surveyId: string }, string>;
  drafts!: Table<DraftSurvey, string>;

  constructor() {
    super("SurveySaemDB");
    this.version(1).stores({
      surveys: "id, teacherId, status",
      responses: "id, surveyId",
      drafts: "id, updatedAt",
    });
  }

  async archiveFromServer(survey: Survey, responses: Response[]) {
    await this.transaction("rw", this.surveys, this.responses, async () => {
      await this.surveys.put({ ...survey, status: "archived" });
      await this.responses.bulkPut(responses.map((r) => ({ ...r, surveyId: survey.id })));
    });
  }

  async listLocal(teacherId: string) {
    return this.surveys.where("teacherId").equals(teacherId).toArray();
  }
}

let _db: SurveySaemDB | null = null;
export function getLocalDB(): SurveySaemDB | null {
  if (typeof window === "undefined") return null;
  if (!_db) _db = new SurveySaemDB();
  return _db;
}
