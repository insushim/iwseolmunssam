import type { Template } from "@/lib/firebase/schema";
import { STUDENT_TEMPLATES } from "./students";
import { PARENT_TEMPLATES } from "./parents";
import { TEACHER_TEMPLATES } from "./teachers";
import { EVENT_TEMPLATES } from "./events";

export const EXTRA_TEMPLATES: Template[] = [
  ...STUDENT_TEMPLATES,
  ...PARENT_TEMPLATES,
  ...TEACHER_TEMPLATES,
  ...EVENT_TEMPLATES,
];

export { STUDENT_TEMPLATES, PARENT_TEMPLATES, TEACHER_TEMPLATES, EVENT_TEMPLATES };
