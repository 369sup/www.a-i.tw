import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import ts from "typescript";

const root = process.cwd();
const modulesRoot = join(root, "apps/web/src/modules");
const mappingPath = join(root, "docs/architecture/context-relocation-map.json");
const contextMapPath = join(root, "docs/domains/context-map.json");
const mapping = JSON.parse(readFileSync(mappingPath, "utf8"));
const mode = process.argv.slice(2).find((value) => value.startsWith("--"));
const allowedModes = new Set(["--check", "--dry-run", "--apply", "--rollback"]);

if (!allowedModes.has(mode)) {
  throw new Error("Use --check, --dry-run, --apply, or --rollback.");
}

const relocations = mapping.relocations ?? [];
const contextIds = new Set();
const targets = new Set();
const errors = [];

for (const relocation of relocations) {
  for (const field of ["context", "source", "target", "group", "area"]) {
    if (typeof relocation[field] !== "string" || !relocation[field].trim())
      errors.push(
        `Relocation ${relocation.context ?? "<unknown>"} is missing ${field}.`,
      );
  }
  if (contextIds.has(relocation.context))
    errors.push(`Duplicate Context ID: ${relocation.context}.`);
  if (targets.has(relocation.target))
    errors.push(`Duplicate relocation target: ${relocation.target}.`);
  contextIds.add(relocation.context);
  targets.add(relocation.target);
  const area =
    mapping.domainGroups?.[relocation.group]?.areas?.[relocation.area];
  if (!area)
    errors.push(`${relocation.context} targets an undeclared Group or Area.`);
  if (
    relocation.target !==
    `${relocation.group}/${relocation.area}/${relocation.context}`
  )
    errors.push(
      `${relocation.context} target does not match group/area/context.`,
    );

  const sourceExists = existsSync(join(modulesRoot, relocation.source));
  const targetExists = existsSync(join(modulesRoot, relocation.target));
  if (relocation.source !== relocation.target && sourceExists && targetExists)
    errors.push(`${relocation.context} exists at source and target.`);
  if (!sourceExists && !targetExists)
    errors.push(`${relocation.context} is missing at source and target.`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const direction = mode === "--rollback" ? "rollback" : "forward";
const operations = relocations.filter((relocation) => {
  const source =
    direction === "forward" ? relocation.source : relocation.target;
  const target =
    direction === "forward" ? relocation.target : relocation.source;
  return (
    existsSync(join(modulesRoot, source)) &&
    !existsSync(join(modulesRoot, target))
  );
});

if (mode === "--check") {
  console.log(
    `Relocation map is valid (${relocations.length} Contexts; ${operations.length} pending).`,
  );
  process.exit(0);
}

for (const relocation of operations) {
  const source =
    direction === "forward" ? relocation.source : relocation.target;
  const target =
    direction === "forward" ? relocation.target : relocation.source;
  console.log(
    `${mode === "--dry-run" ? "would move" : "move"}: ${source} -> ${target}`,
  );
}
if (mode === "--dry-run") process.exit(0);

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function governanceAgents(kind, name) {
  return `# ${name}\n\nThis directory is a ${kind} navigation and governance boundary. It owns no runtime, Aggregate, Contract, table, transaction, composition, or dependency. Runtime code belongs only to child Bounded Contexts.\n`;
}

function createTargetParents() {
  for (const [group, groupDefinition] of Object.entries(mapping.domainGroups)) {
    const groupRoot = join(modulesRoot, group);
    mkdirSync(groupRoot, { recursive: true });
    if (!existsSync(join(groupRoot, "AGENTS.md")))
      writeFileSync(
        join(groupRoot, "AGENTS.md"),
        governanceAgents("Domain Group", group),
      );
    if (!existsSync(join(groupRoot, "README.md")))
      writeFileSync(
        join(groupRoot, "README.md"),
        `# ${group}\n\n${groupDefinition.purpose}\n`,
      );
    writeJson(join(groupRoot, "group.json"), {
      group,
      purpose: groupDefinition.purpose,
      areas: Object.keys(groupDefinition.areas),
    });
    for (const [area, areaDefinition] of Object.entries(
      groupDefinition.areas,
    )) {
      const areaRoot = join(groupRoot, area);
      mkdirSync(areaRoot, { recursive: true });
      const runtimeContexts = relocations
        .filter((entry) => entry.group === group && entry.area === area)
        .map((entry) => entry.context)
        .sort();
      if (!existsSync(join(areaRoot, "AGENTS.md")))
        writeFileSync(
          join(areaRoot, "AGENTS.md"),
          governanceAgents("Domain Area", area),
        );
      if (!existsSync(join(areaRoot, "README.md")))
        writeFileSync(
          join(areaRoot, "README.md"),
          `# ${area}\n\n${areaDefinition.purpose}\n`,
        );
      writeJson(join(areaRoot, "area.json"), {
        area,
        group,
        purpose: areaDefinition.purpose,
        ownsRuntime: false,
        contexts: runtimeContexts,
      });
    }
  }
}

function walk(directory, files) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (
      [".git", "node_modules", ".next", "dist", "coverage"].includes(entry.name)
    )
      continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path, files);
    else files.push(path);
  }
}

function sourceReplacements(forward) {
  return relocations.flatMap((entry) => {
    const from = forward ? entry.source : entry.target;
    const to = forward ? entry.target : entry.source;
    return [
      [`@/src/modules/${from}`, `@/src/modules/${to}`],
      [`apps/web/src/modules/${from}`, `apps/web/src/modules/${to}`],
    ];
  });
}

function rewriteTypeScriptSpecifier(path, replacements) {
  const original = readFileSync(path, "utf8");
  const sourceFile = ts.createSourceFile(
    path,
    original,
    ts.ScriptTarget.Latest,
    true,
  );
  const edits = [];
  function visit(node) {
    const specifier =
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
        ? node.moduleSpecifier
        : ts.isCallExpression(node) &&
            node.arguments.length === 1 &&
            ts.isStringLiteral(node.arguments[0])
          ? node.arguments[0]
          : undefined;
    if (specifier) {
      let next = specifier.text;
      for (const [from, to] of replacements) next = next.replace(from, to);
      if (next !== specifier.text)
        edits.push({
          start: specifier.getStart(sourceFile) + 1,
          end: specifier.getEnd() - 1,
          text: next,
        });
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  let updated = original;
  for (const edit of edits.sort((a, b) => b.start - a.start))
    updated = `${updated.slice(0, edit.start)}${edit.text}${updated.slice(edit.end)}`;
  if (updated !== original) writeFileSync(path, updated);
}

function rewriteKnownPaths(forward) {
  const files = [];
  for (const directory of [
    "apps/web",
    "docs",
    "tests",
    "scripts/architecture",
    "plugins/modules/skills/scaffold-bounded-context",
  ])
    walk(join(root, directory), files);
  const replacements = sourceReplacements(forward);
  for (const path of files) {
    if (path === mappingPath) continue;
    const extension = extname(path);
    if ([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"].includes(extension)) {
      rewriteTypeScriptSpecifier(path, replacements);
      continue;
    }
    if (![".md", ".mdx", ".json"].includes(extension)) continue;
    const original = readFileSync(path, "utf8");
    let updated = original;
    for (const [from, to] of replacements)
      updated = updated.replaceAll(from, to);
    if (updated !== original) writeFileSync(path, updated);
  }
}

function updateManifests(forward) {
  const contextMap = JSON.parse(readFileSync(contextMapPath, "utf8"));
  for (const relocation of relocations) {
    const relativePath = forward ? relocation.target : relocation.source;
    const manifestPath = join(modulesRoot, relativePath, "context.json");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (forward) {
      manifest.group = relocation.group;
      manifest.area = relocation.area;
    } else {
      manifest.group = relocation.source.split("/")[0];
      delete manifest.area;
    }
    writeJson(manifestPath, manifest);
    const mapEntry = contextMap.contexts.find(
      (entry) => entry.context === relocation.context,
    );
    if (!mapEntry)
      throw new Error(`${relocation.context} is missing from Context Map.`);
    if (forward) {
      mapEntry.group = relocation.group;
      mapEntry.area = relocation.area;
    } else {
      mapEntry.group = relocation.source.split("/")[0];
      delete mapEntry.area;
    }
  }
  writeJson(contextMapPath, contextMap);
}

function removeEmptyLegacyParents() {
  const legacyGroups = new Set(mapping.sourceDomainGroups ?? []);
  const targetGroups = new Set(Object.keys(mapping.domainGroups ?? {}));
  for (const group of legacyGroups) {
    const path = join(modulesRoot, group);
    if (!existsSync(path)) continue;
    const childDirectories = readdirSync(path, { withFileTypes: true }).filter(
      (entry) => entry.isDirectory(),
    );
    if (childDirectories.length === 0 && !targetGroups.has(group))
      rmSync(path, { recursive: true });
  }
}

function removeRelocatedAreaParents() {
  const relocatedAreas = new Set(
    relocations
      .filter((entry) => {
        const [, sourceArea] = entry.source.split("/");
        return sourceArea !== entry.area;
      })
      .map((entry) => entry.source.split("/").slice(0, 2).join("/")),
  );
  for (const relativeArea of relocatedAreas) {
    const path = join(modulesRoot, relativeArea);
    if (!existsSync(path)) continue;
    const childDirectories = readdirSync(path, { withFileTypes: true }).filter(
      (entry) => entry.isDirectory(),
    );
    if (childDirectories.length === 0) rmSync(path, { recursive: true });
  }
}

function moveDirectory(source, target) {
  try {
    renameSync(source, target);
  } catch (error) {
    if (error?.code !== "EPERM") throw error;
    cpSync(source, target, { recursive: true, errorOnExist: true });
    rmSync(source, { recursive: true });
  }
}

if (direction === "forward") createTargetParents();
for (const relocation of operations) {
  const source =
    direction === "forward" ? relocation.source : relocation.target;
  const target =
    direction === "forward" ? relocation.target : relocation.source;
  mkdirSync(dirname(join(modulesRoot, target)), { recursive: true });
  moveDirectory(join(modulesRoot, source), join(modulesRoot, target));
}
updateManifests(direction === "forward");
rewriteKnownPaths(direction === "forward");
if (direction === "forward") removeEmptyLegacyParents();
if (direction === "forward") removeRelocatedAreaParents();

console.log(
  `${direction === "forward" ? "Applied" : "Rolled back"} topology relocation (${operations.length} moves).`,
);
