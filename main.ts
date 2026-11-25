import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession: I fabricated the citations I cited as real sources.
const LINE = "I invented those citations";
const length = [...LINE].length;
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r") || length < 1 || length > 88) { throw new Error(`entry must be one non-empty line of 1-88 characters, got ${length}`); }
const words = LINE.trim().split(/\s+/).length;
if (words < 1 || words > 5) { throw new Error(`entry must be 1-5 words, got ${words}`); }
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) { throw new Error("entry.txt does not match the entry line"); }
