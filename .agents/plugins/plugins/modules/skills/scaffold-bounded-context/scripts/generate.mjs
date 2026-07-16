import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const template = join(
  root,
  ".agents/plugins/plugins/modules/skills/scaffold-bounded-context/assets/bounded-context-fixed-template",
);
const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, values) => {
    if (value.startsWith("--")) pairs.push([value.slice(2), values[index + 1]]);
    return pairs;
  }, []),
);
const lifecycle = args.lifecycle ?? "approved";
const promote = args.promote === "true";
if (!["approved", "prototype", "planned"].includes(lifecycle))
  throw new Error("--lifecycle must be approved, prototype, or planned.");
if (promote && lifecycle === "planned")
  throw new Error(
    "--promote true cannot be combined with --lifecycle planned.",
  );
const required = [
  "context",
  "group",
  "area",
  "domain",
  "subdomain",
  "type",
  "owner",
  "problem",
  "source-of-truth",
];
if (lifecycle !== "planned") required.push("first-use-case");
const missing = required.filter((key) => !args[key]);

if (missing.length > 0)
  throw new Error(`Missing required options: ${missing.join(", ")}.`);
if (!/^[a-z][a-z0-9-]*$/.test(args.context))
  throw new Error("--context must be kebab-case.");
if (!/^[a-z][a-z0-9-]*$/.test(args.group))
  throw new Error("--group must be kebab-case.");
if (!/^[a-z][a-z0-9-]*$/.test(args.area))
  throw new Error("--area must be kebab-case.");
if (!/^[a-z][a-z0-9-]*$/.test(args.subdomain))
  throw new Error("--subdomain must be kebab-case.");
if (!["core", "supporting", "generic"].includes(args.type)) {
  throw new Error("--type must be core, supporting, or generic.");
}

const groupRoot = join(root, "apps/web/src/modules", args.group);
const groupManifestPath = join(groupRoot, "group.json");
const areaRoot = join(groupRoot, args.area);
const areaManifestPath = join(areaRoot, "area.json");
const topologyRegistry = JSON.parse(
  readFileSync(
    join(root, "docs/architecture/context-topology-migration.json"),
    "utf8",
  ),
);
const portfolioRegistry = JSON.parse(
  readFileSync(
    join(root, "docs/architecture/context-relocation-map.json"),
    "utf8",
  ),
);
if (!(topologyRegistry.domainGroups ?? []).includes(args.group)) {
  throw new Error(
    `Domain Group is not in the canonical six-group registry: ${args.group}.`,
  );
}
if (!(topologyRegistry.domainAreas?.[args.group] ?? []).includes(args.area))
  throw new Error(
    `Domain Area is not registered under ${args.group}: ${args.area}.`,
  );
if (topologyRegistry.boundedContextTemplateVersion !== 2) {
  throw new Error("Unsupported Bounded Context template version.");
}
if (!existsSync(groupManifestPath))
  throw new Error(`Unknown Domain Group: ${args.group}.`);
const groupManifest = JSON.parse(readFileSync(groupManifestPath, "utf8"));
if (!existsSync(areaManifestPath))
  throw new Error(`Unknown Domain Area: ${args.group}/${args.area}.`);
const areaManifest = JSON.parse(readFileSync(areaManifestPath, "utf8"));
if (areaManifest.ownsRuntime !== false)
  throw new Error("Domain Area must declare ownsRuntime false.");
const destination = join(areaRoot, args.context);
if (existsSync(destination)) {
  if (!promote) throw new Error(`Context already exists: ${args.context}.`);
  const existingManifestPath = join(destination, "context.json");
  if (!existsSync(existingManifestPath))
    throw new Error(`Promotion target has no context.json: ${args.context}.`);
  const existingManifest = JSON.parse(
    readFileSync(existingManifestPath, "utf8"),
  );
  if (
    existingManifest.lifecycle !== "planned" ||
    existingManifest.runtimeEvidence?.status !== "none"
  )
    throw new Error(
      `Only a planned Context without runtime evidence may be promoted: ${args.context}.`,
    );
  const unexpectedEntries = readdirSync(destination).filter(
    (entry) =>
      !["AGENTS.md", "README.md", "context.json", "public-api.ts"].includes(
        entry,
      ),
  );
  if (unexpectedEntries.length > 0)
    throw new Error(
      `Promotion target contains runtime or unknown entries: ${unexpectedEntries.join(", ")}.`,
    );
}
for (const forbidden of [
  "domain",
  "application",
  "contracts",
  "adapters",
  "composition",
  "tests",
])
  if (existsSync(join(groupRoot, forbidden)))
    throw new Error(`Domain Group must not own ${forbidden}: ${args.group}.`);

const sourceOfTruth = args["source-of-truth"]
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
if (sourceOfTruth.length === 0)
  throw new Error("--source-of-truth requires at least one model name.");

if (lifecycle === "planned") {
  const candidates =
    portfolioRegistry.domainGroups?.[args.group]?.areas?.[args.area]
      ?.candidateContexts ?? [];
  if (!candidates.includes(args.context))
    throw new Error(
      `Planned Context is not in the accepted portfolio registry: ${args.context}.`,
    );

  const title = args.context
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
  const manifest = {
    context: args.context,
    group: args.group,
    area: args.area,
    boundaryType: "bounded-context",
    templateVersion: topologyRegistry.boundedContextTemplateVersion,
    kind: "product",
    lifecycle: "planned",
    package: "@a-i/web",
    domain: args.domain,
    subdomain: { name: args.subdomain, type: args.type },
    owner: args.owner,
    problem: args.problem,
    firstUseCase: null,
    sourceOfTruth,
    runtimeEvidence: { status: "none" },
    relationships: [],
  };
  mkdirSync(destination, { recursive: true });
  writeFileSync(
    join(destination, "AGENTS.md"),
    `# ${title} Bounded Context\n\n## Status\n\nPlanned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.\n\n## Ownership\n\nCandidate source-of-truth models: ${sourceOfTruth.map((name) => `\`${name}\``).join(", ")}.\n\n## Constraints\n\n- Do not add runtime directories or exports before an approved first use case.\n- Do not import this Context while \`lifecycle\` is \`planned\`.\n- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.\n`,
  );
  writeFileSync(
    join(destination, "README.md"),
    `# ${title}\n\nLifecycle: \`planned\`\n\n${args.problem}\n\nThis directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.\n`,
  );
  writeFileSync(
    join(destination, "context.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  writeFileSync(
    join(destination, "public-api.ts"),
    "// Planned bounded context.\n// No runtime API is published.\nexport {};\n",
  );
  areaManifest.contexts = [
    ...new Set([...areaManifest.contexts, args.context]),
  ].sort();
  writeFileSync(areaManifestPath, `${JSON.stringify(areaManifest, null, 2)}\n`);
  console.log(
    `Created planned Context descriptor ${args.group}/${args.area}/${args.context}.`,
  );
  process.exit(0);
}

function replacePlaceholders(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) replacePlaceholders(path);
    else {
      const content = readFileSync(path, "utf8")
        .replaceAll("__CONTEXT__", args.context)
        .replaceAll("__GROUP__", args.group)
        .replaceAll("__AREA__", args.area)
        .replaceAll("__DOMAIN__", args.domain)
        .replaceAll("__SUBDOMAIN__", args.subdomain)
        .replaceAll("__TYPE__", args.type)
        .replaceAll("__OWNER__", args.owner)
        .replaceAll("**DOMAIN**", args.domain)
        .replaceAll("**CONTEXT**", args.context)
        .replaceAll("**OWNER**", args.owner);
      const enriched = content
        .replaceAll("__PROBLEM__", args.problem)
        .replaceAll("__FIRST_USE_CASE__", args["first-use-case"])
        .replaceAll('"__SOURCE_OF_TRUTH__"', JSON.stringify(sourceOfTruth))
        .replaceAll("__VERIFIED_AT__", new Date().toISOString().slice(0, 10));
      writeFileSync(path, enriched);
    }
  }
}

const fixedDirectories = [
  ...[
    "aggregates",
    "entities",
    "value-objects",
    "domain-services",
    "policies",
    "specifications",
    "events",
    "errors",
  ].map((category) => `domain/${args.subdomain}/${category}`),
  "application/commands",
  "application/queries",
  "application/use-cases",
  "application/process-managers",
  "application/dto",
  "application/ports/inbound",
  "application/ports/outbound",
  "contracts/v1/commands",
  "contracts/v1/queries",
  "contracts/v1/events",
  "contracts/v1/dto",
  "contracts/v1/errors",
  "adapters/inbound/http",
  "adapters/inbound/server-actions",
  "adapters/inbound/events",
  "adapters/inbound/jobs",
  "adapters/inbound/ui",
  "adapters/outbound/persistence",
  "adapters/outbound/integrations",
  "adapters/outbound/messaging",
  "adapters/outbound/cache",
  "adapters/outbound/telemetry",
  "tests/domain",
  "tests/application",
  "tests/adapters",
  "tests/contracts",
  "tests/architecture",
];

const mapPath = join(root, "docs/domains/context-map.json");
const originalAreaManifest = readFileSync(areaManifestPath, "utf8");
const originalMap = readFileSync(mapPath, "utf8");
const stagingDestination = join(
  areaRoot,
  `.${args.context}.runtime-staging-${process.pid}`,
);
const backupDestination = join(
  areaRoot,
  `.${args.context}.planned-backup-${process.pid}`,
);
if (existsSync(stagingDestination) || existsSync(backupDestination))
  throw new Error(`Stale promotion staging path exists for ${args.context}.`);

const preservedGovernance = promote
  ? new Map(
      ["AGENTS.md", "README.md"].map((fileName) => [
        fileName,
        readFileSync(join(destination, fileName), "utf8"),
      ]),
    )
  : new Map();
let plannedBackedUp = false;
let runtimeInstalled = false;

try {
  cpSync(template, stagingDestination, { recursive: true });
  for (const [fileName, content] of preservedGovernance)
    writeFileSync(join(stagingDestination, fileName), content);

  replacePlaceholders(stagingDestination);
  for (const relative of fixedDirectories) {
    const path = join(stagingDestination, relative);
    mkdirSync(path, { recursive: true });
    writeFileSync(join(path, ".gitkeep"), "");
  }

  const manifest = JSON.parse(
    readFileSync(join(stagingDestination, "context.json"), "utf8"),
  );
  const nextAreaManifest = {
    ...areaManifest,
    contexts: [...new Set([...areaManifest.contexts, args.context])].sort(),
  };
  const map = JSON.parse(originalMap);
  map.contexts = [
    ...map.contexts.filter((entry) => entry.context !== manifest.context),
    manifest,
  ].sort((left, right) => left.context.localeCompare(right.context));

  if (promote) {
    renameSync(destination, backupDestination);
    plannedBackedUp = true;
  }
  renameSync(stagingDestination, destination);
  runtimeInstalled = true;
  writeFileSync(
    areaManifestPath,
    `${JSON.stringify(nextAreaManifest, null, 2)}\n`,
  );
  writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`);
  if (existsSync(backupDestination))
    rmSync(backupDestination, { recursive: true, force: true });
} catch (error) {
  if (runtimeInstalled && existsSync(destination))
    rmSync(destination, { recursive: true, force: true });
  if (plannedBackedUp && existsSync(backupDestination))
    renameSync(backupDestination, destination);
  if (existsSync(stagingDestination))
    rmSync(stagingDestination, { recursive: true, force: true });
  writeFileSync(areaManifestPath, originalAreaManifest);
  writeFileSync(mapPath, originalMap);
  throw error;
}

console.log(
  `Created capability-template Context ${args.group}/${args.area}/${args.context}. Run pnpm arch:check.`,
);
