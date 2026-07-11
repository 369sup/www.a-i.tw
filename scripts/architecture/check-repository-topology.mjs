import { existsSync, readdirSync } from "node:fs";

const errors = [];
const requiredRoots = [
  ".agents",
  ".codex",
  ".github",
  ".semgrep",
  ".serena",
  "apps",
  "docs",
  "packages",
  "plugins",
  "scripts",
];
const forbiddenRoots = [
  "modules",
  "application",
  "contracts",
  "domain",
  "foundation",
  "infrastructure",
  "tooling",
  "ui",
  "shared",
  "common",
  "core",
  "utils",
  "helpers",
];
const forbiddenPackageCategories = new Set([
  "application",
  "contracts",
  "domain",
  "foundation",
  "infrastructure",
  "tooling",
  "shared",
  "common",
  "core",
  "utils",
  "helpers",
]);

for (const root of requiredRoots) {
  if (!existsSync(root))
    errors.push(`Required repository root is missing: ${root}.`);
}
for (const root of forbiddenRoots) {
  if (existsSync(root))
    errors.push(`Forbidden parallel repository root exists: ${root}.`);
}
if (!existsSync("packages/AGENTS.md") || !existsSync("packages/README.md")) {
  errors.push("packages must define AGENTS.md and README.md ownership policy.");
}
if (existsSync("packages")) {
  for (const entry of readdirSync("packages", { withFileTypes: true })) {
    if (entry.isDirectory() && forbiddenPackageCategories.has(entry.name)) {
      errors.push(
        `packages/${entry.name} is a forbidden horizontal layer or ownership-free category.`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Repository roots and technical package topology are canonical.");
