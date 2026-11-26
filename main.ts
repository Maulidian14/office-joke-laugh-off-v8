import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "My boss calls it a 'quick sync', which is office for 'bring a snack, this is a hostage situation with slides'.";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
