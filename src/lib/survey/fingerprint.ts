import FingerprintJS from "@fingerprintjs/fingerprintjs";

let cached: Promise<string> | null = null;

export function getFingerprint(): Promise<string> {
  if (typeof window === "undefined") return Promise.resolve("ssr");
  if (!cached) {
    cached = FingerprintJS.load()
      .then((fp) => fp.get())
      .then((r) => r.visitorId);
  }
  return cached;
}
