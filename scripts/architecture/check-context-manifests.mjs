import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const contextsRoot = "modules";
const mapPath = "docs/maps/context-map.json";
const errors = [];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

const map = readJson(mapPath);
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
  const packagePath = join(directory, "package.json");

  if (!existsSync(manifestPath) || !existsSync(packagePath)) {
    errors.push(`${name} must contain context.json and package.json.`);
    continue;
  }

  const manifest = readJson(manifestPath);
  const packageJson = readJson(packagePath);
  const required = [
    "context",
    "package",
    "domain",
    "subdomain",
    "owner",
    "relationships",
  ];
  const missing = required.filter((field) => !manifest[field]);

  if (missing.length > 0)
    errors.push(`${name} context.json is missing: ${missing.join(", ")}.`);
  if (manifest.context !== name)
    errors.push(`${name} context name must match its directory.`);
  if (manifest.package !== packageJson.name)
    errors.push(`${name} package must match package.json name.`);
  if (!/[a-z][a-z0-9-]*/.test(manifest.context ?? ""))
    errors.push(`${name} has an invalid context name.`);
  if (
    !manifest.subdomain ||
    !["core", "supporting", "generic"].includes(manifest.subdomain.type)
  ) {
    errors.push(`${name} must declare a valid subdomain type.`);
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
      `${name} exists in the Context Map without a module workspace.`,
    );
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Context manifests match the Context Map.");
