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
let plannedContextCount = 0;

function sourceFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(path));
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(path);
  }
  return files;
}

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

const contextDirectoryByName = new Map(
  discovered.map((entry) => [entry.name, entry.directory]),
);

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
      plannedContextCount += 1;
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

  const readme = readFileSync(join(directory, "README.md"), "utf8");
  const agentRules = readFileSync(join(directory, "AGENTS.md"), "utf8");
  for (const [fileName, content] of [
    ["README.md", readme],
    ["AGENTS.md", agentRules],
  ]) {
    if (!content.includes(manifest.problem))
      errors.push(`${name} ${fileName} must contain the manifest problem.`);
    for (const sourceOfTruth of manifest.sourceOfTruth ?? []) {
      if (!content.includes(`\`${sourceOfTruth}\``))
        errors.push(
          `${name} ${fileName} must declare source-of-truth owner ${sourceOfTruth}.`,
        );
    }
  }
  if (manifest.firstUseCase && !readme.includes(manifest.firstUseCase))
    errors.push(`${name} README.md must contain the manifest firstUseCase.`);

  if (manifest.lifecycle !== "planned") {
    const integrationRoot = join(directory, "adapters/outbound/integrations");
    const integrationFiles = existsSync(integrationRoot)
      ? sourceFiles(integrationRoot).map((file) => ({
          file,
          source: readFileSync(file, "utf8"),
        }))
      : [];
    for (const relationship of manifest.relationships ?? []) {
      if (relationship.downstream !== name) continue;
      const consumerAclFile = integrationFiles.find(({ source }) =>
        source.includes(relationship.consumerAcl),
      );
      if (!consumerAclFile) {
        errors.push(
          `${name} consumerAcl ${relationship.consumerAcl} must exist in consumer adapters/outbound/integrations.`,
        );
      }
      const portRoot = join(directory, "application/ports/outbound");
      const portSource = existsSync(portRoot)
        ? sourceFiles(portRoot)
            .map((file) => readFileSync(file, "utf8"))
            .join("\n")
        : "";
      if (!portSource.includes(relationship.consumerPort))
        errors.push(
          `${name} consumerPort ${relationship.consumerPort} must exist in consumer application/ports/outbound.`,
        );

      const providerDirectory = contextDirectoryByName.get(
        relationship.upstream,
      );
      if (!providerDirectory) {
        errors.push(
          `${name} relationship provider ${relationship.upstream} does not exist.`,
        );
        continue;
      }
      const providerContracts = join(providerDirectory, "contracts");
      const providerContractSource = existsSync(providerContracts)
        ? sourceFiles(providerContracts)
            .map((file) => readFileSync(file, "utf8"))
            .join("\n")
        : "";
      if (!providerContractSource.includes(relationship.contract))
        errors.push(
          `${name} provider ${relationship.upstream} must publish ${relationship.contract}.`,
        );
      if (
        consumerAclFile &&
        !consumerAclFile.source.includes(`/${relationship.upstream}/contracts/`)
      )
        errors.push(
          `${name} consumerAcl ${relationship.consumerAcl} must import ${relationship.upstream} Published Language.`,
        );
    }
  }
}

for (const name of mapped.keys())
  if (!discovered.some((entry) => entry.name === name))
    errors.push(`${name} exists in the Context Map without a module.`);

const expectedPhysicalContextCount = 37;
const expectedRuntimeContextCount = 20;
const expectedPlannedContextCount = 17;
if (discovered.length !== expectedPhysicalContextCount)
  errors.push(
    `Physical portfolio must contain exactly ${expectedPhysicalContextCount} Context descriptors.`,
  );
if (mapped.size !== expectedRuntimeContextCount)
  errors.push(
    `Runtime Context Map must contain exactly ${expectedRuntimeContextCount} Contexts.`,
  );
if (plannedContextCount !== expectedPlannedContextCount)
  errors.push(
    `Physical portfolio must contain exactly ${expectedPlannedContextCount} planned descriptors.`,
  );

const synchronousEdges = new Map();
for (const context of map.contexts) {
  for (const relationship of context.relationships ?? []) {
    if (relationship.consistency !== "synchronous") continue;
    const key = `${relationship.upstream}->${relationship.downstream}`;
    synchronousEdges.set(key, [relationship.upstream, relationship.downstream]);
  }
}
const synchronousGraph = new Map();
for (const [upstream, downstream] of synchronousEdges.values()) {
  const downstreams = synchronousGraph.get(upstream) ?? [];
  downstreams.push(downstream);
  synchronousGraph.set(upstream, downstreams);
}
const visited = new Set();
const visiting = [];
function visit(context) {
  const cycleStart = visiting.indexOf(context);
  if (cycleStart >= 0) {
    errors.push(
      `Synchronous Context dependency cycle is forbidden: ${[
        ...visiting.slice(cycleStart),
        context,
      ].join(" -> ")}.`,
    );
    return;
  }
  if (visited.has(context)) return;
  visiting.push(context);
  for (const downstream of synchronousGraph.get(context) ?? [])
    visit(downstream);
  visiting.pop();
  visited.add(context);
}
for (const context of synchronousGraph.keys()) visit(context);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "App-local Context manifests match the fixed-template registry and Context Map.",
);
