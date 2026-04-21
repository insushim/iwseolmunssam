const KOREAN_STOPWORDS = new Set([
  "그", "그리고", "그런데", "하지만", "그래서", "그러나", "또한", "및",
  "이", "저", "것", "수", "등", "들", "이런", "저런", "그런",
  "있", "있다", "있는", "없", "없다", "없는", "되", "되다", "된",
  "하", "하다", "하는", "한", "할", "해", "해서", "했", "했다",
  "이다", "입니다", "같다", "같은", "좋다", "많다", "좋은", "많은",
  "나", "너", "우리", "저희", "그들", "나는", "내가", "너는", "네가",
  "은", "는", "가", "을", "를", "에", "에서", "에게", "로", "으로",
  "와", "과", "도", "만", "부터", "까지", "보다", "처럼", "듯이",
  "아", "어", "야", "예", "네", "아니", "네요", "이요", "요",
  "정말", "진짜", "매우", "너무", "조금", "약간",
]);

export function extractWords(text: string): string[] {
  if (!text) return [];
  const tokens = text
    .split(/[\s,.?!()\[\]{}「」『』"'—–\-]+/u)
    .map((t) => t.replace(/[은는이가을를에서의로]$/u, ""))
    .filter((t) => t.length >= 2 && !KOREAN_STOPWORDS.has(t));
  return tokens;
}

export interface WordFreq {
  word: string;
  count: number;
}

export function computeWordFrequency(texts: string[], topN = 50): WordFreq[] {
  const counter = new Map<string, number>();
  for (const text of texts) {
    if (typeof text !== "string") continue;
    const words = extractWords(text);
    for (const w of words) {
      counter.set(w, (counter.get(w) ?? 0) + 1);
    }
  }
  return Array.from(counter.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}
