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
const requiredWebRouteGroups = [
  "apps/web/src/app/(public)",
  "apps/web/src/app/(console)",
];
const forbiddenWebAppEntries = [
  "apps/web/src/app/(product)",
  "apps/web/src/app/(master-template)",
  "apps/web/src/app/docs",
  "apps/web/src/app/api",
  "apps/web/src/app/architecture",
  "apps/web/src/app/@modal",
  "apps/web/src/app/page.tsx",
];
const forbiddenWebRootEntries = [
  "apps/web/components",
  "apps/web/lib",
  "apps/web/components.json",
];
const forbiddenConsoleEntries = [
  "apps/web/src/app/(console)/architecture",
  "apps/web/src/app/(console)/@modal",
];

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
for (const routeGroup of requiredWebRouteGroups) {
  if (!existsSync(routeGroup))
    errors.push(`Required web route group is missing: ${routeGroup}.`);
}
for (const entry of forbiddenWebAppEntries) {
  if (existsSync(entry))
    errors.push(
      `Web route must be classified under (public) or (console): ${entry}.`,
    );
}
for (const entry of forbiddenWebRootEntries) {
  if (existsSync(entry))
    errors.push(
      `Web capability must have an explicit owner under src: ${entry}.`,
    );
}
for (const entry of forbiddenConsoleEntries) {
  if (existsSync(entry))
    errors.push(
      `Console has a duplicate Template UX or global modal slot: ${entry}.`,
    );
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Repository roots and technical package topology are canonical.");
