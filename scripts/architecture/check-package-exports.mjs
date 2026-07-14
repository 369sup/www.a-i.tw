import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = "apps/web/src/modules";
const errors = [];
const internalImport =
  /from\s+["'][^"']*\/(?:domain|application|adapters|composition)\//u;
const wildcardExport = /export\s+\*\s+from/u;

for (const group of readdirSync(root, { withFileTypes: true })) {
  if (!group.isDirectory()) continue;
  const groupRoot = join(root, group.name);
  for (const area of readdirSync(groupRoot, { withFileTypes: true })) {
    if (!area.isDirectory()) continue;
    const areaRoot = join(groupRoot, area.name);
    for (const child of readdirSync(areaRoot, { withFileTypes: true })) {
      if (!child.isDirectory()) continue;
      const contextRoot = join(areaRoot, child.name);
      if (!existsSync(join(contextRoot, "context.json"))) continue;
      const manifest = JSON.parse(
        readFileSync(join(contextRoot, "context.json"), "utf8"),
      );
      const publicApi = join(contextRoot, "public-api.ts");
      if (!existsSync(publicApi))
        errors.push(
          `${group.name}/${area.name}/${child.name} is missing public-api.ts.`,
        );
      else if (wildcardExport.test(readFileSync(publicApi, "utf8")))
        errors.push(
          `${group.name}/${area.name}/${child.name} public-api.ts must use explicit exports.`,
        );

      if (manifest.lifecycle === "planned") continue;

      const contractsRoot = join(contextRoot, "contracts");
      for (const version of readdirSync(contractsRoot, {
        withFileTypes: true,
      })) {
        if (!version.isDirectory()) continue;
        const api = join(contractsRoot, version.name, "public.ts");
        if (!existsSync(api))
          errors.push(
            `${group.name}/${area.name}/${child.name}/${version.name} is missing public.ts.`,
          );
        else {
          const content = readFileSync(api, "utf8");
          if (internalImport.test(content))
            errors.push(
              `${group.name}/${area.name}/${child.name}/${version.name}/public.ts leaks Context internals.`,
            );
          if (wildcardExport.test(content))
            errors.push(
              `${group.name}/${area.name}/${child.name}/${version.name}/public.ts must use explicit exports.`,
            );
        }
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "Bounded Context public APIs and versioned Published Language are constrained.",
);
