import sharp from "sharp";
import { mkdirSync } from "fs";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
mkdirSync("public/icons", { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <text x="50%" y="56%" text-anchor="middle" font-family="-apple-system, sans-serif"
        font-size="240" font-weight="800" fill="white">쌤</text>
  <circle cx="400" cy="140" r="26" fill="white" opacity="0.9"/>
  <rect x="380" y="170" width="40" height="6" rx="3" fill="white" opacity="0.9"/>
</svg>`;

for (const size of sizes) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`public/icons/icon-${size}.png`);
  console.log(`generated icon-${size}.png`);
}
