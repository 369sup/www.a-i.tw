import { readFileSync } from "node:fs";

const root = JSON.parse(readFileSync("package.json", "utf8"));
const required = ["apps/*", "packages/*"];
const missing = required.filter((workspace) => !root.workspaces?.includes(workspace));

if (missing.length > 0) {
  console.error(`Missing workspace patterns: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Workspace configuration check passed.");
