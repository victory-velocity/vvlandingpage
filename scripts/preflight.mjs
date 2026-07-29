#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
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
  const stats = statSync(path);
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

const files = ROOTS.flatMap((root) => walk(root));
let failures = 0;

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

if (failures > 0) {
  console.error(`\npreflight: ${failures} violation(s)`);
  process.exit(1);
}

console.log(`preflight: clean (${files.length} files scanned)`);
