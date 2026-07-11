import { existsSync, readFileSync } from "node:fs";

const required = [
  "docs/README.md",
  "docs/ai-index.md",
  "docs/maps/domain-context-map.md",
  "docs/04-architecture/overview.md",
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length > 0) {
  console.error(`Missing canonical docs: ${missing.join(", ")}`);
  process.exit(1);
}

const index = readFileSync("docs/ai-index.md", "utf8");
if (!index.includes("唯一入口")) {
  console.error("docs/ai-index.md must state that it is the single AI routing entrypoint.");
  process.exit(1);
}

console.log("Documentation ownership checks passed.");
