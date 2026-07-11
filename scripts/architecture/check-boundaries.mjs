import { existsSync, readdirSync, readFileSync } from "node:fs";

const root = "modules";
if (!existsSync(root)) {
  console.log(
    "No bounded context workspace exists yet; boundary check is intentionally empty.",
  );
  process.exit(0);
}

const forbidden =
  /from\s+["'](?:next|react|@\/app|@\/components|@a-i\/)[^"']*["']/;
const violations = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      walk(path);
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      const content = readFileSync(path, "utf8");
      if (path.includes("/src/domain/") && forbidden.test(content))
        violations.push(path);
    }
  }
}

walk(root);
if (violations.length > 0) {
  console.error(`Domain boundary violations: ${violations.join(", ")}`);
  process.exit(1);
}
console.log("Architecture boundary checks passed.");
