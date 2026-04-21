import type { Condition, AnswerValue } from "@/lib/firebase/schema";

export function evaluateCondition(
  cond: Condition,
  answers: Record<string, AnswerValue>
): boolean {
  const evalRule = (rule: Condition["rules"][0]): boolean => {
    const a = answers[rule.questionId];
    if (a === undefined) return false;
    const v = rule.value;
    switch (rule.operator) {
      case "eq":
        return Array.isArray(a) ? a.includes(String(v)) : String(a) === String(v);
      case "neq":
        return Array.isArray(a) ? !a.includes(String(v)) : String(a) !== String(v);
      case "gt":
        return Number(a) > Number(v);
      case "lt":
        return Number(a) < Number(v);
      case "contains":
        return typeof a === "string" && a.includes(String(v));
      default:
        return false;
    }
  };
  return cond.operator === "AND" ? cond.rules.every(evalRule) : cond.rules.some(evalRule);
}
