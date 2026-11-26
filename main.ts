import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "My boss calls it a 'quick sync', which is office for 'bring a snack, this is a hostage situation with slides'.";

// One-line bounties are judged on the exact bytes of a single line, so
// normalise defensively before writing: collapse any embedded line breaks
// (a copy-paste or template slip must never leak a newline into entry.txt),
// trim stray edge whitespace, then assert the exact expected length so a
// silent edit to the joke fails loudly instead of shipping a wrong entry.
function normalizeEntry(text: string, expectedLength: number): string {
  const singleLine = text.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  if (singleLine.length !== expectedLength) {
    throw new Error(
      `entry length ${singleLine.length} != expected ${expectedLength}`,
    );
  }
  return singleLine;
}

const NORMALIZED_ENTRY = normalizeEntry(ENTRY, 110);

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), NORMALIZED_ENTRY, "utf8");
console.log(
  `wrote ${NORMALIZED_ENTRY.length} chars to ${join(outDir, "entry.txt")}`,
);
