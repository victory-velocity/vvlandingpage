#!/usr/bin/env node
import { readFileSync, readdirSync, lstatSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["app", "components", "public/llms.txt"];
const EXTS = new Set([".tsx", ".ts", ".css", ".txt"]);

const RULES = [
  {
    id: "em-dash",
    label: "em-dash or en-dash is banned (taste skill 9.G)",
    test: (line) => /[—–]/.test(line),
  },
  {
    id: "scroll-listener",
    label: "window.addEventListener('scroll') is banned (taste skill 5.D)",
    test: (line) => /addEventListener\(\s*['"]scroll['"]/.test(line),
  },
  {
    id: "numbered-eyebrow",
    label: "numbered step eyebrow is banned (taste skill 9.F)",
    test: (line) => /["'>]\s*0\d\s*[-—–]\s*[A-Z]/.test(line),
  },
];

function walk(path, out = []) {
  const stats = lstatSync(path);
  if (stats.isFile()) {
    if (EXTS.has(extname(path))) out.push(path);
    return out;
  }
  for (const entry of readdirSync(path)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    walk(join(path, entry), out);
  }
  return out;
}

// Exit code 2 means "could not run" (missing/unreadable path). Exit code 1 means
// "ran fine, found violations". Keep these distinguishable for callers/CI.
let files;
try {
  files = ROOTS.flatMap((root) => walk(root));
} catch (error) {
  console.error(`preflight: could not scan the project: ${error.message}`);
  console.error("Check that these paths exist and are readable: " + ROOTS.join(", "));
  process.exit(2);
}

let failures = 0;

try {
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const rule of RULES) {
        if (rule.test(line)) {
          failures += 1;
          console.error(`${file}:${index + 1}  [${rule.id}] ${rule.label}`);
          console.error(`    ${line.trim().slice(0, 100)}`);
        }
      }
    });
  }
} catch (error) {
  console.error(`preflight: could not read a file during scan: ${error.message}`);
  process.exit(2);
}

if (failures > 0) {
  console.error(`\npreflight: ${failures} violation(s)`);
  process.exit(1);
}

console.log(`preflight: clean (${files.length} files scanned)`);
