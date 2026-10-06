// Generates favicon, apple-touch-icon and the OG image from public/brand/icon.svg.
// Usage: node scripts/make-icons.mjs  (re-run when the real icon.svg arrives)
import sharp from "sharp";
import { copyFile, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const icon = await readFile(path.join(root, "public/brand/icon.svg"));

await copyFile(path.join(root, "public/brand/icon.svg"), path.join(root, "app/icon.svg"));
await sharp(icon, { density: 600 }).resize(180, 180).png().toFile(path.join(root, "app/apple-icon.png"));

const ogIcon = await sharp(icon, { density: 600 }).resize(220, 220).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#F7F4EF"/>
  <text x="320" y="300" font-family="Georgia, serif" font-size="84" fill="#0E3B43">Alpha Dental Studio</text>
  <text x="322" y="370" font-family="Arial, sans-serif" font-size="34" fill="#5B6B6E">Specialist dental care in R.A. Puram, Chennai</text>
  <text x="322" y="430" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#1F6F78">Innovating Smiles. Inspiring Lives.</text>
</svg>`);
await sharp(text).composite([{ input: ogIcon, left: 70, top: 205 }]).png().toFile(path.join(root, "app/opengraph-image.png"));
console.log("icons written");
