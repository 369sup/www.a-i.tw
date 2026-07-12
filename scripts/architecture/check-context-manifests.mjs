import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const contextsRoot = "apps/web/src/modules";
const appPackagePath = "apps/web/package.json";
const mapPath = "docs/domains/context-map.json";
const fixturesPath = "docs/architecture/reference-fixtures.json";
const migrationPath = "docs/architecture/context-topology-migration.json";
const errors = [];
const legacyRequiredPaths = [
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
const targetRequiredPaths = [
  "AGENTS.md",
  "README.md",
  "context.json",
  "domain",
  "application",
  "contracts",
  "infrastructure",
  "presentation",
  "composition/index.ts",
  "public-api.ts",
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
const fixtures = readJson(fixturesPath);
const migration = readJson(migrationPath);
const legacyContexts = new Set(migration.legacyContexts);
const appPackage = readJson(appPackagePath);
const mapped = new Map(
  map.contexts.map((context) => [context.context, context]),
);
const registeredFixtures = new Map(
  fixtures.fixtures.map((fixture) => [fixture.context, fixture]),
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

  for (const required of legacyContexts.has(name)
    ? legacyRequiredPaths
    : targetRequiredPaths) {
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
  if (!Array.isArray(manifest.sourceOfTruth) || !manifest.sourceOfTruth.length)
    errors.push(`${name} must declare at least one sourceOfTruth model.`);
  if (
    !manifest.runtimeEvidence?.status ||
    !manifest.runtimeEvidence?.verifiedAt
  )
    errors.push(`${name} must declare runtimeEvidence status and verifiedAt.`);
  for (const relationship of manifest.relationships ?? []) {
    for (const field of [
      "upstream",
      "downstream",
      "pattern",
      "contract",
      "consumerPort",
      "consumerAcl",
      "consistency",
      "failureMode",
      "status",
    ])
      if (!relationship[field])
        errors.push(`${name} relationship is missing ${field}.`);
    if (relationship.downstream !== name)
      errors.push(
        `${name} may register only relationships where it is downstream.`,
      );
  }
  for (const subdomain of legacyContexts.has(name)
    ? (manifest.internalSubdomains ?? [])
    : []) {
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

  if (manifest.kind === "product") {
    const mapEntry = mapped.get(name);
    if (!mapEntry) errors.push(`${name} is missing from ${mapPath}.`);
    else if (JSON.stringify(mapEntry) !== JSON.stringify(manifest))
      errors.push(`${name} differs from its Context Map entry.`);
  } else if (manifest.kind === "architecture-fixture") {
    if (!registeredFixtures.has(name))
      errors.push(`${name} is missing from ${fixturesPath}.`);
    if (mapped.has(name))
      errors.push(
        `${name} is an architecture fixture and cannot be in the product Context Map.`,
      );
  } else
    errors.push(`${name} must declare kind product or architecture-fixture.`);
}

for (const name of mapped.keys()) {
  if (!directories.includes(name))
    errors.push(
      `${name} exists in the Context Map without an app-local module.`,
    );
}
for (const name of registeredFixtures.keys())
  if (!directories.includes(name))
    errors.push(
      `${name} is registered as a fixture without a module directory.`,
    );

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("App-local Contexts match the standard tree and Context Map.");
