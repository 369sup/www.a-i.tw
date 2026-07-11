import { existsSync } from "node:fs";

const required = ["README.md", "SECURITY.md", "CONTRIBUTING.md", "turbo.json"];
const missing = required.filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error(`Release metadata is incomplete: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Release metadata check passed.");
