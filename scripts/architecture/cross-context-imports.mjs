import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const sourceExtensions = new Set([".ts", ".tsx"]);
const importPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function walk(directory, files) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path, files);
    else if (sourceExtensions.has(`.${entry.name.split(".").pop()}`))
      files.push(path);
  }
}

function contextDirectories(root) {
  const modulesRoot = join(root, "apps/web/src/modules");
  if (!existsSync(modulesRoot)) return [];
  return readdirSync(modulesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      path: join(modulesRoot, entry.name),
      manifest: readJson(join(modulesRoot, entry.name, "context.json")),
    }));
}

function resolveAppAlias(root, specifier) {
  if (!specifier.startsWith("@/")) return undefined;
  return resolve(root, "apps/web", specifier.slice(2));
}

export function checkCrossContextImports(root = process.cwd()) {
  const contexts = contextDirectories(root);
  const errors = [];
  for (const context of contexts) {
    const files = [];
    walk(join(context.path, "src"), files);
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      for (const match of content.matchAll(importPattern)) {
        const specifier = match[1];
        const target = specifier.startsWith(".")
          ? resolve(file, "..", specifier)
          : resolveAppAlias(root, specifier);
        if (!target) continue;
        const targetContext = contexts.find((candidate) => {
          const path = relative(candidate.path, target);
          return path && !path.startsWith("..");
        });
        if (!targetContext || targetContext.name === context.name) continue;

        const targetRelative = relative(targetContext.path, target);
        if (!/^src\/contracts\//.test(targetRelative)) {
          errors.push(
            `${file} imports ${specifier}; cross-context imports may target only ${targetContext.name}/src/contracts/.`,
          );
          continue;
        }
        if (
          !context.manifest.relationships.some(
            (relationship) => relationship.target === targetContext.name,
          )
        ) {
          errors.push(
            `${file} imports ${targetContext.name} contracts without a Context Map relationship.`,
          );
        }
      }
    }
  }
  return errors;
}
