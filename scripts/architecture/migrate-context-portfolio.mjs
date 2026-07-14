import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const modulesRoot = join(root, "apps/web/src/modules");
const ledger = JSON.parse(
  readFileSync(
    join(root, "docs/architecture/context-relocation-map.json"),
    "utf8",
  ),
).portfolioMigration;
const apply = process.argv.includes("--apply");

if (!ledger) throw new Error("Portfolio migration ledger is missing.");
const targets = [...ledger.runtimeTargets, ...ledger.plannedTargets];
if (targets.length !== 37 || new Set(targets).size !== 37)
  throw new Error("Portfolio ledger must declare exactly 37 unique targets.");
if (ledger.runtimeTargets.length !== 20 || ledger.plannedTargets.length !== 17)
  throw new Error(
    "Portfolio ledger must declare 20 runtime and 17 planned targets.",
  );

const manifests = [];
for (const group of readdirSync(modulesRoot)) {
  const groupRoot = join(modulesRoot, group);
  if (!existsSync(join(groupRoot, "group.json"))) continue;
  for (const area of readdirSync(groupRoot)) {
    const areaRoot = join(groupRoot, area);
    if (!existsSync(join(areaRoot, "area.json"))) continue;
    for (const context of readdirSync(areaRoot)) {
      const manifestPath = join(areaRoot, context, "context.json");
      if (!existsSync(manifestPath)) continue;
      manifests.push({
        path: join(areaRoot, context),
        manifest: JSON.parse(readFileSync(manifestPath, "utf8")),
      });
    }
  }
}

const byId = new Map(manifests.map((entry) => [entry.manifest.context, entry]));
const errors = [];
for (const target of targets)
  if (!byId.has(target)) errors.push(`Missing target: ${target}`);
for (const entry of manifests)
  if (!targets.includes(entry.manifest.context))
    errors.push(`Unexpected Context: ${entry.manifest.context}`);

for (const operation of ledger.operations) {
  const sourcePresent = byId.has(operation.sourceContext);
  const targetStates = operation.targetContexts.map((id) => {
    const target = byId.get(id)?.manifest;
    return `${id}:${target?.lifecycle ?? "missing"}/${target?.runtimeEvidence?.status ?? "missing"}`;
  });
  console.log(
    `${operation.operation.padEnd(6)} ${operation.sourceContext} -> ${operation.targetContexts.join(", ")} ` +
      `[source=${sourcePresent ? "present" : "absent"}; targets=${targetStates.join(", ")}]`,
  );
  if (sourcePresent && apply && operation.operation !== "retain")
    errors.push(
      `${operation.sourceContext} still exists. Semantic ${operation.operation} requires the explicit capability ownership steps in the ledger; no name-based move is permitted.`,
    );
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(
    `${apply ? "Apply verification" : "Dry run"} complete: 37 Contexts, 20 runtime, 17 planned.`,
  );
}
