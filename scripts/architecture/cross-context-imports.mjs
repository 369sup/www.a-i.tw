import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const sourceExtensions = new Set([".ts", ".tsx"]);
const importPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function walk(directory, files) {
  if (!existsSync(directory)) return;
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
  const exceptionPath = join(
    root,
    "docs/architecture/cross-context-dependency-exceptions.json",
  );
  const exceptions = existsSync(exceptionPath)
    ? (readJson(exceptionPath).exceptions ?? [])
    : [];
  const usedExceptions = new Set();
  const errors = [];
  for (const context of contexts) {
    const files = [];
    walk(context.path, files);
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

        const targetRelative = relative(targetContext.path, target).replaceAll(
          "\\",
          "/",
        );
        const consumerRelative = relative(context.path, file).replaceAll(
          "\\",
          "/",
        );
        const exceptionKey = `${context.name}:${consumerRelative}:${targetContext.name}`;
        const isRegisteredException = exceptions.some((exception) => {
          const matches =
            exception.consumer === context.name &&
            exception.file === consumerRelative &&
            exception.provider === targetContext.name;
          if (matches) usedExceptions.add(exceptionKey);
          return matches;
        });
        if (!/^contracts\/[^/]+\/public(?:\.ts)?$/.test(targetRelative)) {
          errors.push(
            `${file} imports ${specifier}; peer Context imports may target only ${targetContext.name}/contracts/<subdomain>/public.ts.`,
          );
          continue;
        }
        if (
          !/^infrastructure\/[^/]+\/integrations\/(?:inbound|outbound|adapters|mappers)\//.test(
            consumerRelative,
          ) &&
          !isRegisteredException
        ) {
          errors.push(
            `${file} imports ${targetContext.name}; cross-context semantic dependencies belong only in consumer infrastructure/<subdomain>/integrations.`,
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
  for (const exception of exceptions) {
    const key = `${exception.consumer}:${exception.file}:${exception.provider}`;
    if (!usedExceptions.has(key))
      errors.push(`Stale cross-context dependency exception: ${key}.`);
  }
  return errors;
}
