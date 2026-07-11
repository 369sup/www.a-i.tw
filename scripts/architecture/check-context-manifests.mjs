import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const contextsRoot = "apps/web/src/modules";
const appPackagePath = "apps/web/package.json";
const mapPath = "docs/domains/context-map.json";
const errors = [];
const requiredPaths = [
  "AGENTS.md",
  "README.md",
  "context.json",
  "src/domain",
  "src/application",
  "src/contracts/public.ts",
  "src/infrastructure",
  "src/public.ts",
  "src/composition.ts",
  "tests",
];
const forbiddenContextFiles = [
  "package.json",
  "tsconfig.json",
  "eslint.config.mjs",
  "vitest.config.ts",
];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

const map = readJson(mapPath);
const appPackage = readJson(appPackagePath);
const mapped = new Map(
  map.contexts.map((context) => [context.context, context]),
);
const directories = existsSync(contextsRoot)
  ? readdirSync(contextsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

for (const name of directories) {
  const directory = join(contextsRoot, name);
  const manifestPath = join(directory, "context.json");
  if (!existsSync(manifestPath)) {
    errors.push(`${name} must contain context.json.`);
    continue;
  }

  for (const required of requiredPaths) {
    if (!existsSync(join(directory, required))) {
      errors.push(`${name} is missing standard Context path: ${required}.`);
    }
  }
  for (const forbidden of forbiddenContextFiles) {
    if (existsSync(join(directory, forbidden))) {
      errors.push(
        `${name} is app-local and must inherit @a-i/web configuration; remove ${forbidden}.`,
      );
    }
  }

  const manifest = readJson(manifestPath);
  const requiredFields = [
    "context",
    "package",
    "domain",
    "subdomain",
    "owner",
    "relationships",
  ];
  const missing = requiredFields.filter(
    (field) => manifest[field] === undefined,
  );
  if (missing.length > 0)
    errors.push(`${name} context.json is missing: ${missing.join(", ")}.`);
  if (manifest.context !== name)
    errors.push(`${name} context name must match its directory.`);
  if (manifest.package !== appPackage.name)
    errors.push(`${name} package must match apps/web/package.json name.`);
  if (!/^[a-z][a-z0-9-]*$/.test(manifest.context ?? ""))
    errors.push(`${name} has an invalid context name.`);
  if (
    !manifest.subdomain ||
    !["core", "supporting", "generic"].includes(manifest.subdomain.type)
  ) {
    errors.push(`${name} must declare a valid subdomain type.`);
  }
  for (const subdomain of manifest.internalSubdomains ?? []) {
    const subdomainRoot = join(directory, "src/subdomains", subdomain.name);
    for (const required of [
      "README.md",
      "domain",
      "application",
      "infrastructure",
      "composition.ts",
    ]) {
      if (!existsSync(join(subdomainRoot, required))) {
        errors.push(
          `${name} internal subdomain ${subdomain.name} is missing: ${required}.`,
        );
      }
    }
  }
  const subdomainsRoot = join(directory, "src/subdomains");
  if (existsSync(subdomainsRoot)) {
    const declared = new Set(
      (manifest.internalSubdomains ?? []).map((subdomain) => subdomain.name),
    );
    for (const entry of readdirSync(subdomainsRoot, { withFileTypes: true })) {
      if (entry.isDirectory() && !declared.has(entry.name)) {
        errors.push(
          `${name} has undeclared internal subdomain folder: ${entry.name}.`,
        );
      }
    }
  }
  if (
    ["pending", "todo", "unknown", "example"].includes(
      String(manifest.owner).toLowerCase(),
    )
  ) {
    errors.push(`${name} cannot use a placeholder owner.`);
  }

  const mapEntry = mapped.get(name);
  if (!mapEntry) errors.push(`${name} is missing from ${mapPath}.`);
  else if (JSON.stringify(mapEntry) !== JSON.stringify(manifest)) {
    errors.push(`${name} differs from its Context Map entry.`);
  }
}

for (const name of mapped.keys()) {
  if (!directories.includes(name))
    errors.push(
      `${name} exists in the Context Map without an app-local module.`,
    );
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("App-local Contexts match the standard tree and Context Map.");
