import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const migration = JSON.parse(
  readFileSync("docs/architecture/context-topology-migration.json", "utf8"),
);
const legacy = new Set(migration.legacyContexts);

if (existsSync("apps/web/src/modules")) {
  for (const entry of readdirSync("apps/web/src/modules", {
    withFileTypes: true,
  })) {
    if (!entry.isDirectory()) continue;
    const contextRoot = join("apps/web/src/modules", entry.name);
    const outputs = legacy.has(entry.name)
      ? ["src/public.ts", "src/contracts/public.ts", "src/composition.ts"]
      : ["public-api.ts", "composition/index.ts"];
    for (const output of outputs) {
      const outputPath = join(contextRoot, output);
      if (!existsSync(outputPath)) {
        errors.push(`${entry.name} public entrypoint is missing: ${output}.`);
        continue;
      }
      if (output.endsWith("public-api.ts") || output.includes("contracts")) {
        const source = readFileSync(outputPath, "utf8");
        if (/from\s+["'][^"']*\/(domain|infrastructure)\//u.test(source)) {
          errors.push(
            `${entry.name} ${output} leaks Domain or Infrastructure internals.`,
          );
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("App-local Context public entrypoints are constrained.");
