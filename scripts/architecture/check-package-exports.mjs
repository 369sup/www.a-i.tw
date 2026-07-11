import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const expected = {
  ".": "./src/public.ts",
  "./contracts": "./src/contracts/public.ts",
  "./composition": "./src/composition.ts",
};
const errors = [];

if (existsSync("modules")) {
  for (const entry of readdirSync("modules", { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const packagePath = join("modules", entry.name, "package.json");
    if (!existsSync(packagePath)) continue;

    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    if (JSON.stringify(packageJson.exports) !== JSON.stringify(expected)) {
      errors.push(
        `${entry.name} exports must expose only public, contracts, and composition entrypoints.`,
      );
    }
    for (const output of Object.values(expected)) {
      if (!existsSync(join("modules", entry.name, output.replace("./", "")))) {
        errors.push(`${entry.name} export target is missing: ${output}.`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Bounded context package exports are constrained.");
