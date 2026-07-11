import { readFileSync } from "node:fs";

const root = JSON.parse(readFileSync("package.json", "utf8"));
const workspace = readFileSync("pnpm-workspace.yaml", "utf8");
const required = ["apps/*", "packages/*", "tests/*"];
const missing = required.filter(
  (entry) => !workspace.includes(`- \"${entry}\"`),
);

if (missing.length > 0) {
  console.error(`Missing pnpm workspace patterns: ${missing.join(", ")}`);
  process.exit(1);
}

if (workspace.includes('- "modules/*"')) {
  console.error(
    "Root modules/* workspaces are forbidden; bounded contexts belong in apps/web/src/modules.",
  );
  process.exit(1);
}

if (root.packageManager !== "pnpm@10.34.5") {
  console.error("packageManager must pin pnpm@10.34.5.");
  process.exit(1);
}

console.log("Workspace configuration check passed.");
