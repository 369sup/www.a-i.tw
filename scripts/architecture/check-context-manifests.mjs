import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = "apps/web/src/modules";
const map = JSON.parse(readFileSync("docs/domains/context-map.json", "utf8"));
const packageName = JSON.parse(
  readFileSync("apps/web/package.json", "utf8"),
).name;
const mapped = new Map(map.contexts.map((entry) => [entry.context, entry]));
const errors = [];
const discovered = [];

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const groupRoot = join(root, entry.name);
  for (const area of readdirSync(groupRoot, { withFileTypes: true })) {
    if (!area.isDirectory()) continue;
    const areaRoot = join(groupRoot, area.name);
    for (const child of readdirSync(areaRoot, { withFileTypes: true })) {
      const directory = join(areaRoot, child.name);
      if (child.isDirectory() && existsSync(join(directory, "context.json")))
        discovered.push({
          name: child.name,
          group: entry.name,
          area: area.name,
          directory,
        });
    }
  }
}

const duplicateNames = discovered.filter(
  (entry, index) =>
    discovered.findIndex((candidate) => candidate.name === entry.name) !==
    index,
);
for (const duplicate of duplicateNames)
  errors.push(`${duplicate.name} Context ID must be globally unique.`);

for (const { name, group, area, directory } of discovered) {
  const manifest = JSON.parse(
    readFileSync(join(directory, "context.json"), "utf8"),
  );
  for (const field of [
    "context",
    "group",
    "area",
    "boundaryType",
    "templateVersion",
    "kind",
    "lifecycle",
    "package",
    "domain",
    "subdomain",
    "owner",
    "problem",
    "firstUseCase",
    "sourceOfTruth",
    "runtimeEvidence",
    "relationships",
  ])
    if (manifest[field] === undefined)
      errors.push(`${name} context.json is missing ${field}.`);
  if (manifest.context !== name)
    errors.push(`${name} context name must match its directory.`);
  if (manifest.group !== group || manifest.area !== area)
    errors.push(`${name} group and area must match its physical path.`);
  if (manifest.boundaryType !== "bounded-context")
    errors.push(`${name} boundaryType must be bounded-context.`);
  if (manifest.templateVersion !== 2)
    errors.push(`${name} templateVersion must be 2.`);
  if (manifest.package !== packageName)
    errors.push(`${name} package must be ${packageName}.`);
  if (
    !Array.isArray(manifest.sourceOfTruth) ||
    manifest.sourceOfTruth.length === 0
  )
    errors.push(`${name} must declare sourceOfTruth.`);
  if (manifest.kind === "product") {
    const mapEntry = mapped.get(name);
    if (manifest.lifecycle === "planned") {
      if (mapEntry)
        errors.push(
          `${name} planned Context must not enter the runtime Context Map.`,
        );
      if (manifest.firstUseCase !== null)
        errors.push(`${name} planned Context firstUseCase must be null.`);
      if (
        JSON.stringify(manifest.runtimeEvidence) !==
        JSON.stringify({ status: "none" })
      )
        errors.push(
          `${name} planned Context runtimeEvidence must be status none.`,
        );
      if (manifest.relationships?.length)
        errors.push(
          `${name} planned Context must not declare runtime relationships.`,
        );
    } else if (!mapEntry)
      errors.push(`${name} is missing from docs/domains/context-map.json.`);
    else if (JSON.stringify(mapEntry) !== JSON.stringify(manifest))
      errors.push(`${name} differs from its Context Map entry.`);
  } else errors.push(`${name} has unsupported kind ${manifest.kind}.`);
}

for (const name of mapped.keys())
  if (!discovered.some((entry) => entry.name === name))
    errors.push(`${name} exists in the Context Map without a module.`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "App-local Context manifests match the fixed-template registry and Context Map.",
);
