import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

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

function moduleDirectories(root) {
  const modulesRoot = join(root, "modules");
  if (!existsSync(modulesRoot)) return [];

  return readdirSync(modulesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      path: join(modulesRoot, entry.name),
      manifest: readJson(join(modulesRoot, entry.name, "context.json")),
      packageJson: readJson(join(modulesRoot, entry.name, "package.json")),
    }));
}

function referencedModules(content) {
  return [...content.matchAll(importPattern)].map((match) => match[1]);
}

export function checkCrossContextImports(root = process.cwd()) {
  const modules = moduleDirectories(root);
  const packageToModule = new Map(
    modules.map((module) => [module.packageJson.name, module]),
  );
  const errors = [];

  for (const module of modules) {
    const files = [];
    const sourceRoot = join(module.path, "src");
    if (existsSync(sourceRoot)) walk(sourceRoot, files);

    for (const file of files) {
      const content = readFileSync(file, "utf8");
      for (const specifier of referencedModules(content)) {
        if (specifier.startsWith(".")) {
          const target = resolve(dirname(file), specifier);
          const targetModule = modules.find((candidate) => {
            const moduleRelativePath = relative(candidate.path, target);
            return moduleRelativePath && !moduleRelativePath.startsWith("..");
          });

          if (targetModule && targetModule.name !== module.name) {
            errors.push(
              `${file} uses a relative cross-context import to ${targetModule.name}; use ${targetModule.packageJson.name}/contracts instead.`,
            );
          }
          continue;
        }

        const targetModule = packageToModule.get(
          specifier.split("/").slice(0, 2).join("/"),
        );
        if (!targetModule || targetModule.name === module.name) continue;

        const expectedSpecifier = `${targetModule.packageJson.name}/contracts`;
        if (specifier !== expectedSpecifier) {
          errors.push(
            `${file} imports ${specifier}; cross-context imports must use ${expectedSpecifier}.`,
          );
          continue;
        }

        const hasRelationship = module.manifest.relationships.some(
          (relationship) => relationship.target === targetModule.name,
        );
        if (!hasRelationship) {
          errors.push(
            `${file} imports ${expectedSpecifier} without a Context Map relationship from ${module.name} to ${targetModule.name}.`,
          );
        }
      }
    }
  }

  return errors;
}
