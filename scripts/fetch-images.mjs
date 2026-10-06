// Downloads the Unsplash photos listed in content/images.json to public/images/<id>.jpg (2000px wide).
// Usage: npm run fetch-images [-- --force]
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "images");
const force = process.argv.includes("--force");
const { images } = JSON.parse(await readFile(path.join(root, "content", "images.json"), "utf8"));
await mkdir(outDir, { recursive: true });

let failed = 0;
for (const img of images) {
  const file = path.join(outDir, `${img.id}.jpg`);
  if (!force && (await stat(file).then(() => true, () => false))) {
    console.log(`skip   ${img.id} (exists)`);
    continue;
  }
  const url = `${img.src}?w=2000&q=80&fm=jpg&fit=crop&auto=format`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    console.log(`saved  ${img.id}`);
  } catch (err) {
    failed++;
    console.error(`FAILED ${img.id}: ${err.message}`);
  }
}
if (failed) {
  console.error(`${failed} image(s) failed`);
  process.exit(1);
}
