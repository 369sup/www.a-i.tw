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
  const contexts = [];
  for (const group of readdirSync(modulesRoot, { withFileTypes: true })) {
    if (!group.isDirectory()) continue;
    const groupRoot = join(modulesRoot, group.name);
    for (const area of readdirSync(groupRoot, { withFileTypes: true })) {
      if (!area.isDirectory()) continue;
      const areaRoot = join(groupRoot, area.name);
      for (const entry of readdirSync(areaRoot, { withFileTypes: true })) {
        const path = join(areaRoot, entry.name);
        const manifestPath = join(path, "context.json");
        if (entry.isDirectory() && existsSync(manifestPath))
          contexts.push({
            name: entry.name,
            path,
            manifest: readJson(manifestPath),
          });
      }
    }
  }
  return contexts;
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
  const requiredExceptionFields = [
    "consumer",
    "file",
    "provider",
    "owner",
    "reason",
    "trackingIssue",
    "adr",
    "createdAt",
    "expiresAt",
    "removalPlan",
  ];
  if (!Array.isArray(exceptions)) {
    return [
      "cross-context-dependency-exceptions.json exceptions must be an array.",
    ];
  }
  for (const [index, exception] of exceptions.entries()) {
    for (const field of requiredExceptionFields) {
      if (typeof exception?.[field] !== "string" || !exception[field].trim()) {
        errors.push(
          `Cross-context dependency exception ${index} must declare ${field}.`,
        );
      }
    }
    const createdAt = Date.parse(exception?.createdAt);
    const expiresAt = Date.parse(exception?.expiresAt);
    if (!Number.isFinite(createdAt))
      errors.push(
        `Cross-context dependency exception ${index} has invalid createdAt.`,
      );
    if (!Number.isFinite(expiresAt))
      errors.push(
        `Cross-context dependency exception ${index} has invalid expiresAt.`,
      );
    else if (expiresAt <= Date.now())
      errors.push(`Cross-context dependency exception ${index} has expired.`);
    if (
      Number.isFinite(createdAt) &&
      Number.isFinite(expiresAt) &&
      expiresAt <= createdAt
    )
      errors.push(
        `Cross-context dependency exception ${index} must expire after createdAt.`,
      );
  }
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
        if (
          !/^contracts\/v[1-9][0-9]*\/public(?:\.ts)?$/.test(targetRelative)
        ) {
          errors.push(
            `${file} imports ${specifier}; peer Context imports may target only ${targetContext.name}/contracts/<version>/public.ts.`,
          );
          continue;
        }
        if (
          !/^adapters\/outbound\/(?:integrations|messaging)\//.test(
            consumerRelative,
          ) &&
          !isRegisteredException
        ) {
          errors.push(
            `${file} imports ${targetContext.name}; cross-context semantic dependencies belong only in consumer adapters/outbound/integrations or adapters/outbound/messaging.`,
          );
          continue;
        }
        if (
          !context.manifest.relationships.some(
            (relationship) =>
              relationship.upstream === targetContext.name &&
              relationship.downstream === context.name,
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
