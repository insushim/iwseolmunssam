import type { Template } from "@/lib/firebase/schema";
import { OFFICIAL_TEMPLATES } from "./education";
import { EXTRA_TEMPLATES } from "./extra";

export const ALL_TEMPLATES: Template[] = [...OFFICIAL_TEMPLATES, ...EXTRA_TEMPLATES];

export { OFFICIAL_TEMPLATES, EXTRA_TEMPLATES };
