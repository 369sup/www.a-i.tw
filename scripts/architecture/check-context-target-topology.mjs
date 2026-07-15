import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = "apps/web/src/modules";
const registry = JSON.parse(
  readFileSync("docs/architecture/context-topology-migration.json", "utf8"),
);
const portfolio = JSON.parse(
  readFileSync("docs/architecture/context-relocation-map.json", "utf8"),
);
const errors = [];
const legalDomainGroups = [
  "business-operations",
  "collaboration",
  "ecosystem",
  "engagement",
  "platform-governance",
  "programs",
];
const legalDomainAreas = {
  "business-operations": ["assurance-support", "commercial"],
  collaboration: ["community-knowledge", "repository-work"],
  ecosystem: ["apps-marketplace"],
  engagement: ["social-discovery"],
  "platform-governance": [
    "access-policy",
    "accounts-profile",
    "authentication-identity",
    "participation-teams",
  ],
  programs: ["education", "professional-programs"],
};
const legalTemplateVersion = 2;
const domainCategories = [
  "aggregates",
  "domain-services",
  "entities",
  "errors",
  "events",
  "policies",
  "specifications",
  "value-objects",
];
const exactDirectoryChildren = new Map([
  [
    "application",
    ["commands", "dto", "ports", "process-managers", "queries", "use-cases"],
  ],
  ["application/ports", ["inbound", "outbound"]],
  ["adapters", ["inbound", "outbound"]],
  ["adapters/inbound", ["events", "http", "jobs", "server-actions", "ui"]],
  [
    "adapters/outbound",
    ["cache", "integrations", "messaging", "persistence", "telemetry"],
  ],
  ["tests", ["adapters", "application", "architecture", "contracts", "domain"]],
]);
const fixedLeaves = [
  "application/dto",
  "application/use-cases",
  "application/process-managers",
  "application/ports/inbound",
  "application/ports/outbound",
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
const allowedContextRootDirectories = new Set([
  "domain",
  "application",
  "contracts",
  "adapters",
  "composition",
  "tests",
]);
const allowedContextRootFiles = new Set([
  "README.md",
  "AGENTS.md",
  "context.json",
  "public-api.ts",
]);
const allowedGroupFiles = new Set(["README.md", "AGENTS.md", "group.json"]);
const allowedAreaFiles = new Set(["README.md", "AGENTS.md", "area.json"]);
const allowedModulesRootFiles = new Set(["README.md", "AGENTS.md"]);

function entries(path) {
  return readdirSync(path, { withFileTypes: true });
}

function requireNonEmpty(path, label) {
  if (!existsSync(path)) errors.push(`${label} is missing.`);
  else if (!readFileSync(path, "utf8").trim())
    errors.push(`${label} must not be empty.`);
}

function checkExactDirectories(
  contextRoot,
  relativePath,
  expectedNames,
  allowedFiles = [],
) {
  const path = join(contextRoot, relativePath);
  if (!existsSync(path)) {
    errors.push(`${contextRoot} is missing directory ${relativePath}.`);
    return;
  }
  const actualDirectories = entries(path)
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const expectedDirectories = [...expectedNames].sort();
  if (
    JSON.stringify(actualDirectories) !== JSON.stringify(expectedDirectories)
  ) {
    errors.push(
      `${contextRoot}/${relativePath} directories must be exactly: ${expectedDirectories.join(", ")}.`,
    );
  }
  for (const entry of entries(path)) {
    if (entry.isFile() && !allowedFiles.includes(entry.name))
      errors.push(
        `${contextRoot}/${relativePath} must not contain root file ${entry.name}.`,
      );
  }
}

function checkLeafDirectory(contextRoot, relativePath) {
  const path = join(contextRoot, relativePath);
  if (!existsSync(path)) {
    errors.push(`${contextRoot} is missing directory ${relativePath}.`);
    return;
  }
  for (const entry of entries(path)) {
    if (entry.isDirectory()) {
      errors.push(
        `${contextRoot}/${relativePath} is a fixed tactical leaf and must not contain directory ${entry.name}.`,
      );
    }
  }
}

function checkLeafFileConvention(contextRoot, relativePath, suffix) {
  const path = join(contextRoot, relativePath);
  if (!existsSync(path)) return;

  const escapedSuffix = suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const kebabCaseFile = new RegExp(
    `^[a-z0-9]+(?:-[a-z0-9]+)*${escapedSuffix}$`,
  );
  for (const entry of entries(path)) {
    if (
      entry.isFile() &&
      entry.name !== ".gitkeep" &&
      !kebabCaseFile.test(entry.name)
    ) {
      errors.push(
        `${contextRoot}/${relativePath} must contain only kebab-case ${suffix} files; found ${entry.name}.`,
      );
    }
  }
}

function checkNamedHandlerDirectory(contextRoot, relativePath, kind) {
  const path = join(contextRoot, relativePath);
  if (!existsSync(path)) {
    errors.push(`${contextRoot} is missing directory ${relativePath}.`);
    return;
  }
  for (const entry of entries(path)) {
    if (entry.isFile() && entry.name !== ".gitkeep") {
      errors.push(
        `${contextRoot}/${relativePath} may contain only named ${kind} directories.`,
      );
    }
    if (!entry.isDirectory()) continue;
    if (!/^[a-z][a-z0-9-]*$/.test(entry.name)) {
      errors.push(
        `${contextRoot}/${relativePath}/${entry.name} must use kebab-case.`,
      );
      continue;
    }
    const actual = entries(join(path, entry.name))
      .map((child) => child.name)
      .sort();
    const expected = [
      kind === "command" ? "command.ts" : "query.ts",
      "handler.ts",
    ].sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      errors.push(
        `${contextRoot}/${relativePath}/${entry.name} must contain exactly ${expected.join(", ")}.`,
      );
    }
  }
}

function checkContracts(contextRoot) {
  const contractsRoot = join(contextRoot, "contracts");
  if (!existsSync(contractsRoot)) {
    errors.push(`${contextRoot} is missing directory contracts.`);
    return;
  }
  const versions = entries(contractsRoot).filter((entry) =>
    entry.isDirectory(),
  );
  if (!versions.length)
    errors.push(`${contextRoot}/contracts must contain at least one version.`);
  for (const entry of entries(contractsRoot)) {
    if (entry.isFile())
      errors.push(
        `${contextRoot}/contracts must not contain root file ${entry.name}.`,
      );
  }
  for (const version of versions) {
    if (!/^v[1-9][0-9]*$/.test(version.name)) {
      errors.push(
        `${contextRoot}/contracts/${version.name} must use v<number> naming.`,
      );
      continue;
    }
    const versionPath = `contracts/${version.name}`;
    checkExactDirectories(
      contextRoot,
      versionPath,
      ["commands", "dto", "errors", "events", "queries"],
      ["public.ts"],
    );
    requireNonEmpty(
      join(contextRoot, versionPath, "public.ts"),
      `${contextRoot}/${versionPath}/public.ts`,
    );
    for (const category of ["commands", "queries", "events", "dto", "errors"]) {
      checkLeafDirectory(contextRoot, `${versionPath}/${category}`);
      checkLeafFileConvention(contextRoot, `${versionPath}/${category}`, ".ts");
    }
    for (const file of entries(join(contextRoot, versionPath)).filter((entry) =>
      entry.isFile(),
    )) {
      if (file.name !== "public.ts")
        errors.push(
          `${contextRoot}/${versionPath} has unexpected root file ${file.name}.`,
        );
    }
  }
}

function checkComposition(contextRoot) {
  const path = join(contextRoot, "composition");
  requireNonEmpty(
    join(path, "index.ts"),
    `${contextRoot}/composition/index.ts`,
  );
  if (!existsSync(path)) return;
  for (const entry of entries(path)) {
    if (
      entry.isDirectory() ||
      (entry.isFile() && !entry.name.endsWith(".ts"))
    ) {
      errors.push(
        `${contextRoot}/composition accepts TypeScript modules only.`,
      );
    }
  }
  checkLeafFileConvention(contextRoot, "composition", ".ts");
}

const declaredDomainGroups = [...(registry.domainGroups ?? [])].sort();
if (JSON.stringify(declaredDomainGroups) !== JSON.stringify(legalDomainGroups))
  errors.push(
    `topology registry Domain Groups must be exactly: ${legalDomainGroups.join(", ")}.`,
  );
if (registry.boundedContextTemplateVersion !== legalTemplateVersion)
  errors.push(`boundedContextTemplateVersion must be ${legalTemplateVersion}.`);
for (const groupName of legalDomainGroups) {
  const declaredAreas = [...(registry.domainAreas?.[groupName] ?? [])].sort();
  if (
    JSON.stringify(declaredAreas) !==
    JSON.stringify(legalDomainAreas[groupName])
  )
    errors.push(
      `${groupName} registry Areas must be exactly: ${legalDomainAreas[groupName].join(", ")}.`,
    );
}

for (const entry of entries(root)) {
  if (entry.isFile() && !allowedModulesRootFiles.has(entry.name))
    errors.push(`modules has unexpected root file ${entry.name}.`);
}
const discoveredDomainGroups = entries(root)
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
if (
  JSON.stringify(discoveredDomainGroups) !== JSON.stringify(legalDomainGroups)
)
  errors.push(
    `modules Domain Groups must be exactly: ${legalDomainGroups.join(", ")}.`,
  );

let discoveredContexts = 0;
const discoveredContextIds = new Set();
for (const groupName of legalDomainGroups) {
  const groupRoot = join(root, groupName);
  if (!existsSync(groupRoot)) continue;
  requireNonEmpty(join(groupRoot, "README.md"), `${groupName}/README.md`);
  requireNonEmpty(join(groupRoot, "AGENTS.md"), `${groupName}/AGENTS.md`);
  requireNonEmpty(join(groupRoot, "group.json"), `${groupName}/group.json`);
  const groupManifest = JSON.parse(
    readFileSync(join(groupRoot, "group.json"), "utf8"),
  );
  if (groupManifest.group !== groupName)
    errors.push(`${groupName}/group.json group must match its directory.`);
  const declaredAreas = [...(groupManifest.areas ?? [])].sort();
  for (const entry of entries(groupRoot)) {
    if (entry.isFile() && !allowedGroupFiles.has(entry.name))
      errors.push(`${groupName} has unexpected root file ${entry.name}.`);
  }
  const actualAreas = entries(groupRoot)
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  if (JSON.stringify(actualAreas) !== JSON.stringify(declaredAreas))
    errors.push(
      `${groupName}/group.json areas must match child Domain Area directories.`,
    );
  if (
    JSON.stringify(actualAreas) !== JSON.stringify(legalDomainAreas[groupName])
  )
    errors.push(
      `${groupName} Domain Areas must be exactly: ${legalDomainAreas[groupName].join(", ")}.`,
    );

  for (const areaName of actualAreas) {
    const areaRoot = join(groupRoot, areaName);
    requireNonEmpty(
      join(areaRoot, "README.md"),
      `${groupName}/${areaName}/README.md`,
    );
    requireNonEmpty(
      join(areaRoot, "AGENTS.md"),
      `${groupName}/${areaName}/AGENTS.md`,
    );
    const areaManifestPath = join(areaRoot, "area.json");
    requireNonEmpty(areaManifestPath, `${groupName}/${areaName}/area.json`);
    for (const entry of entries(areaRoot))
      if (entry.isFile() && !allowedAreaFiles.has(entry.name))
        errors.push(
          `${groupName}/${areaName} has unexpected root file ${entry.name}.`,
        );
    if (!existsSync(areaManifestPath)) continue;
    const areaManifest = JSON.parse(readFileSync(areaManifestPath, "utf8"));
    if (areaManifest.group !== groupName || areaManifest.area !== areaName)
      errors.push(
        `${groupName}/${areaName}/area.json must match its parent path.`,
      );
    if (areaManifest.ownsRuntime !== false)
      errors.push(
        `${groupName}/${areaName}/area.json ownsRuntime must be false.`,
      );
    const actualContexts = entries(areaRoot)
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    const declaredContexts = [...(areaManifest.contexts ?? [])].sort();
    if (JSON.stringify(actualContexts) !== JSON.stringify(declaredContexts))
      errors.push(
        `${groupName}/${areaName}/area.json contexts must match child Context directories.`,
      );

    for (const contextName of actualContexts) {
      discoveredContexts += 1;
      if (discoveredContextIds.has(contextName))
        errors.push(`${contextName} Context ID must be globally unique.`);
      discoveredContextIds.add(contextName);
      const contextRoot = join(areaRoot, contextName);
      const manifestPath = join(contextRoot, "context.json");
      requireNonEmpty(
        join(contextRoot, "README.md"),
        `${groupName}/${areaName}/${contextName}/README.md`,
      );
      requireNonEmpty(
        join(contextRoot, "AGENTS.md"),
        `${groupName}/${areaName}/${contextName}/AGENTS.md`,
      );
      requireNonEmpty(
        manifestPath,
        `${groupName}/${areaName}/${contextName}/context.json`,
      );
      requireNonEmpty(
        join(contextRoot, "public-api.ts"),
        `${groupName}/${areaName}/${contextName}/public-api.ts`,
      );
      if (!existsSync(manifestPath)) continue;
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
      if (manifest.boundaryType !== "bounded-context")
        errors.push(
          `${groupName}/${areaName}/${contextName} must declare boundaryType bounded-context.`,
        );
      if (manifest.templateVersion !== legalTemplateVersion)
        errors.push(
          `${groupName}/${areaName}/${contextName} templateVersion must be ${legalTemplateVersion}.`,
        );
      if (manifest.group !== groupName)
        errors.push(
          `${groupName}/${areaName}/${contextName} manifest group must match its parent.`,
        );
      if (manifest.area !== areaName)
        errors.push(
          `${groupName}/${areaName}/${contextName} manifest area must match its parent.`,
        );
      const capability = manifest.subdomain?.name;
      const hasValidCapability = /^[a-z][a-z0-9-]*$/.test(capability ?? "");
      if (!hasValidCapability)
        errors.push(
          `${groupName}/${areaName}/${contextName} must declare a kebab-case primary domain capability.`,
        );

      const isPlanned = manifest.lifecycle === "planned";
      if (isPlanned) {
        const rootDirectories = entries(contextRoot).filter((entry) =>
          entry.isDirectory(),
        );
        if (rootDirectories.length)
          errors.push(
            `${groupName}/${areaName}/${contextName} planned Context must not contain runtime directories.`,
          );
        if (
          JSON.stringify(manifest.runtimeEvidence) !==
          JSON.stringify({ status: "none" })
        )
          errors.push(
            `${groupName}/${areaName}/${contextName} planned Context runtimeEvidence must be status none.`,
          );
        if (manifest.firstUseCase !== null)
          errors.push(
            `${groupName}/${areaName}/${contextName} planned Context firstUseCase must be null.`,
          );
        const expectedPublicApi =
          "// Planned bounded context.\n// No runtime API is published.\nexport {};\n";
        if (
          readFileSync(join(contextRoot, "public-api.ts"), "utf8") !==
          expectedPublicApi
        )
          errors.push(
            `${groupName}/${areaName}/${contextName} planned public-api.ts must publish no runtime API.`,
          );
      }

      for (const entry of entries(contextRoot)) {
        if (
          entry.isDirectory() &&
          !allowedContextRootDirectories.has(entry.name)
        )
          errors.push(
            `${groupName}/${areaName}/${contextName} has unexpected root directory ${entry.name}.`,
          );
        if (entry.isFile() && !allowedContextRootFiles.has(entry.name))
          errors.push(
            `${groupName}/${areaName}/${contextName} has unexpected root file ${entry.name}.`,
          );
      }
      if (isPlanned) continue;
      const domainRoot = join(contextRoot, "domain");
      if (!existsSync(domainRoot))
        errors.push(`${contextRoot} is missing directory domain.`);
      else {
        for (const entry of entries(domainRoot)) {
          if (entry.isFile())
            errors.push(
              `${contextRoot}/domain must not contain root file ${entry.name}.`,
            );
          else if (!/^[a-z][a-z0-9-]*$/.test(entry.name))
            errors.push(
              `${contextRoot}/domain/${entry.name} must use kebab-case.`,
            );
          else {
            checkExactDirectories(
              contextRoot,
              `domain/${entry.name}`,
              domainCategories,
            );
            for (const category of domainCategories) {
              checkLeafDirectory(
                contextRoot,
                `domain/${entry.name}/${category}`,
              );
              checkLeafFileConvention(
                contextRoot,
                `domain/${entry.name}/${category}`,
                ".ts",
              );
            }
          }
        }
        if (hasValidCapability && !existsSync(join(domainRoot, capability)))
          errors.push(
            `${contextRoot}/domain must contain primary capability ${capability}.`,
          );
      }
      for (const [path, children] of exactDirectoryChildren)
        checkExactDirectories(contextRoot, path, children);
      for (const leaf of fixedLeaves) {
        checkLeafDirectory(contextRoot, leaf);
        checkLeafFileConvention(
          contextRoot,
          leaf,
          leaf === "adapters/inbound/ui"
            ? ".tsx"
            : leaf.startsWith("tests/")
              ? ".test.ts"
              : ".ts",
        );
      }
      checkNamedHandlerDirectory(
        contextRoot,
        "application/commands",
        "command",
      );
      checkNamedHandlerDirectory(contextRoot, "application/queries", "query");
      checkContracts(contextRoot);
      checkComposition(contextRoot);
    }
  }
}

const targetContexts = [];
for (const [groupName, group] of Object.entries(portfolio.domainGroups ?? {}))
  for (const [areaName, area] of Object.entries(group.areas ?? {}))
    for (const contextName of area.candidateContexts ?? []) {
      targetContexts.push(contextName);
      if (
        !existsSync(
          join(root, groupName, areaName, contextName, "context.json"),
        )
      )
        errors.push(
          `${groupName}/${areaName}/${contextName} accepted target Context descriptor is missing.`,
        );
    }
const acceptedTargetContextCount = registry.acceptedTargetContextCount ?? 37;
if (targetContexts.length !== acceptedTargetContextCount)
  errors.push(
    `Accepted target portfolio must contain exactly ${acceptedTargetContextCount} Contexts.`,
  );
if (new Set(targetContexts).size !== targetContexts.length)
  errors.push("Accepted target portfolio Context IDs must be globally unique.");

if (registry.mode !== "target" || (registry.legacyContexts ?? []).length)
  errors.push(
    "Fixed-template mode does not permit legacy Context registrations.",
  );
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Fixed three-level Context topology is canonical (${discoveredContexts} templateVersion 2 Contexts).`,
);
