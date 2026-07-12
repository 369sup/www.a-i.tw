import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = "apps/web/src/modules";
const registry = JSON.parse(
  readFileSync("docs/architecture/context-topology-migration.json", "utf8"),
);
const legacy = new Set(registry.legacyContexts);
const errors = [];
const layers = [
  "domain",
  "application",
  "contracts",
  "infrastructure",
  "presentation",
];

const contexts = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
for (const name of legacy)
  if (!contexts.includes(name))
    errors.push(`Migration registry references missing Context: ${name}.`);
if (registry.mode === "target" && legacy.size > 0)
  errors.push("Target mode requires an empty legacyContexts list.");

for (const name of contexts) {
  const contextRoot = join(root, name);
  const manifest = JSON.parse(
    readFileSync(join(contextRoot, "context.json"), "utf8"),
  );
  if (legacy.has(name)) {
    if (!existsSync(join(contextRoot, "src")))
      errors.push(`${name} is registered legacy but has no src/ tree.`);
    continue;
  }
  if (existsSync(join(contextRoot, "src")))
    errors.push(`${name} target Context must not contain legacy src/.`);
  for (const required of ["public-api.ts", "composition/index.ts", "tests"]) {
    if (!existsSync(join(contextRoot, required)))
      errors.push(`${name} target Context is missing ${required}.`);
  }
  const subdomains = [
    manifest.subdomain,
    ...(manifest.internalSubdomains ?? []),
  ];
  for (const subdomain of subdomains)
    for (const layer of layers) {
      if (!existsSync(join(contextRoot, layer, subdomain.name)))
        errors.push(`${name}/${subdomain.name} is missing ${layer}.`);
    }
  for (const forbidden of registry.forbiddenSharedDirectoryNames) {
    for (const layer of layers)
      if (existsSync(join(contextRoot, layer, forbidden)))
        errors.push(
          `${name} uses forbidden ownership-free ${layer}/${forbidden}.`,
        );
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Context target topology is valid in ${registry.mode} mode (${legacy.size} legacy Contexts).`,
);
