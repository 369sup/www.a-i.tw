import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const errors = [];

if (existsSync("apps/web/src/modules")) {
  for (const entry of readdirSync("apps/web/src/modules", {
    withFileTypes: true,
  })) {
    if (!entry.isDirectory()) continue;
    const contextRoot = join("apps/web/src/modules", entry.name);
    for (const output of [
      "src/public.ts",
      "src/contracts/public.ts",
      "src/composition.ts",
    ]) {
      if (!existsSync(join(contextRoot, output))) {
        errors.push(`${entry.name} public entrypoint is missing: ${output}.`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("App-local Context public entrypoints are constrained.");
