import type { Template } from "@/lib/firebase/schema";
import { 독서실태 } from "./reading-status";
import { 학교폭력실태 } from "./school-violence";
import { 수업만족도 } from "./class-satisfaction";
import { 학부모만족도 } from "./parent-satisfaction";
import { 학교자체평가 } from "./school-self-eval";
import { 진로인식 } from "./career-awareness";
import { 디지털역량 } from "./digital-literacy";
import { 학급분위기 } from "./class-climate";
import { 미디어리터러시 } from "./media-literacy";
import { 급식만족도 } from "./meal-satisfaction";
import { 방과후만족도 } from "./after-school-satisfaction";
import { 체험학습만족도 } from "./field-trip-satisfaction";
import { 학생자치 } from "./student-council";
import { 교직원의견 } from "./staff-opinion";
import { 빠른펄스 } from "./quick-pulse";

export const OFFICIAL_TEMPLATES: Template[] = [
  독서실태,
  학교폭력실태,
  수업만족도,
  학부모만족도,
  학교자체평가,
  진로인식,
  디지털역량,
  학급분위기,
  미디어리터러시,
  급식만족도,
  방과후만족도,
  체험학습만족도,
  학생자치,
  교직원의견,
  빠른펄스,
];

export {
  독서실태,
  학교폭력실태,
  수업만족도,
  학부모만족도,
  학교자체평가,
  진로인식,
  디지털역량,
  학급분위기,
  미디어리터러시,
  급식만족도,
  방과후만족도,
  체험학습만족도,
  학생자치,
  교직원의견,
  빠른펄스,
};
