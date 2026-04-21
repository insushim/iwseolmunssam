export async function hashIdentity(
  studentNumber: string,
  birthMMDD: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`surveysaem:${studentNumber}:${birthMMDD}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 24);
}
