#!/usr/bin/env node
/**
 * Convert public/assets/*.{jpg,png} naar WebP + AVIF.
 * Behoudt het origineel zodat <picture> fallback werkt.
 * Doel: hero LCP + category card-images van 494KB → ~30-80KB.
 */
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/assets";
const TARGETS = readdirSync(DIR)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .map((f) => join(DIR, f));

console.log(`Found ${TARGETS.length} images to optimize`);

let totalBefore = 0;
let totalAfter = 0;

for (const src of TARGETS) {
  const before = statSync(src).size;
  totalBefore += before;
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  try {
    // WebP — wider support
    const webp = await sharp(src).webp({ quality: 80, effort: 6 }).toBuffer();
    writeFileSync(`${base}.webp`, webp);
    // AVIF — best compression voor moderne browsers
    const avif = await sharp(src).avif({ quality: 60, effort: 6 }).toBuffer();
    writeFileSync(`${base}.avif`, avif);
    totalAfter += webp.length + avif.length;
    const pct = (((before - webp.length) / before) * 100).toFixed(0);
    console.log(
      `  ${src.padEnd(40)} ${(before / 1024).toFixed(0)}KB → webp ${(webp.length / 1024).toFixed(0)}KB · avif ${(avif.length / 1024).toFixed(0)}KB  (-${pct}% webp)`,
    );
  } catch (e) {
    console.error(`  ${src}: ${e.message}`);
  }
}

console.log(
  `\nTotaal originelen: ${(totalBefore / 1024).toFixed(0)}KB → WebP+AVIF combined: ${(totalAfter / 1024).toFixed(0)}KB`,
);
