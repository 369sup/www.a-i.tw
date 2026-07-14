import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { checkCrossContextImports } from "../../../scripts/architecture/cross-context-imports.mjs";
import { checkSourcePolicies } from "../../../scripts/architecture/source-policies.mjs";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(testDirectory, "../../..");
const fixtureRoot = join(testDirectory, "../fixtures");
const dependencyCruiser = join(
  repositoryRoot,
  "node_modules",
  "dependency-cruiser",
  "bin",
  "dependency-cruise.mjs",
);
const ruleConfig = join(repositoryRoot, ".dependency-cruiser.cjs");
const temporaryDirectories: string[] = [];

type Violation = {
  rule: { name: string };
};

function inspectFixture(name: string, inputPaths = ["apps"]): Violation[] {
  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "www-ai-architecture-"),
  );
  temporaryDirectories.push(temporaryDirectory);
  cpSync(join(fixtureRoot, name), temporaryDirectory, { recursive: true });

  const result = spawnSync(
    process.execPath,
    [
      dependencyCruiser,
      "--config",
      ruleConfig,
      "--output-type",
      "json",
      ...inputPaths,
    ],
    {
      cwd: temporaryDirectory,
      encoding: "utf8",
    },
  );

  if (result.error) throw result.error;
  if (!result.stdout) {
    throw new Error(
      `dependency-cruiser produced no JSON for ${name}: ${result.stderr}`,
    );
  }

  const output = JSON.parse(result.stdout) as {
    summary: { violations: Violation[] };
  };
  return output.summary.violations;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true });
  }
});

describe("architecture dependency rules", () => {
  it("accepts own-Domain use cases and outbound integration Published Language", () => {
    expect(inspectFixture("valid")).toEqual([]);
  });

  it.each([
    ["domain-imports-application", "target-domain-does-not-depend-outward"],
    [
      "application-imports-infrastructure",
      "target-application-does-not-depend-on-infrastructure",
    ],
    ["cross-context-internal", "no-target-cross-context-internal-imports"],
    ["contracts-import-domain", "target-contracts-are-standalone"],
    [
      "server-composition-imports-context-internal",
      "server-composition-uses-context-entrypoints",
    ],
    ["circular-domain", "no-circular-dependencies"],
    ["domain-imports-core", "target-domain-has-no-external-dependencies"],
    [
      "internal-subdomain-domain-imports-core",
      "target-domain-has-no-external-dependencies",
    ],
  ])("rejects %s with %s", (fixture, rule) => {
    const violations = inspectFixture(fixture);

    expect(violations.map((violation) => violation.rule.name)).toContain(rule);
  });

  it("rejects a technical package dependency on an application", () => {
    const violations = inspectFixture("package-imports-application", [
      "apps",
      "packages",
    ]);

    expect(violations.map((violation) => violation.rule.name)).toContain(
      "technical-packages-do-not-depend-on-applications",
    );
  });
});

function writeContext(
  root: string,
  name: string,
  relationships: Array<{ upstream: string; downstream: string }> = [],
) {
  const directory = join(root, "apps/web/src/modules", "example", "area", name);
  mkdirSync(join(directory, "application", "use-cases"), {
    recursive: true,
  });
  mkdirSync(join(directory, "adapters", "outbound", "integrations"), {
    recursive: true,
  });
  mkdirSync(join(directory, "contracts", "v1"), { recursive: true });
  writeFileSync(
    join(directory, "contracts", "v1", "public.ts"),
    "export {};\n",
  );
  writeFileSync(
    join(directory, "context.json"),
    JSON.stringify({
      context: name,
      group: "example",
      area: "area",
      relationships,
    }),
  );
  return directory;
}

function writeCanonicalTopologyFixture() {
  const root = mkdtempSync(join(tmpdir(), "www-ai-topology-"));
  temporaryDirectories.push(root);
  const modulesRoot = join(root, "apps/web/src/modules");
  const domainGroups = [
    "business-operations",
    "collaboration",
    "ecosystem",
    "engagement",
    "platform-governance",
    "programs",
  ];
  const domainAreas = {
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
  } as const;
  const groupRoot = join(modulesRoot, "platform-governance");
  const areaRoot = join(groupRoot, "authentication-identity");
  const contextRoot = join(areaRoot, "example");
  const requiredDirectories = [
    ...[
      "aggregates",
      "entities",
      "value-objects",
      "domain-services",
      "policies",
      "specifications",
      "events",
      "errors",
    ].map((category) => `domain/example/${category}`),
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
    "composition",
    "tests/domain",
    "tests/application",
    "tests/adapters",
    "tests/contracts",
    "tests/architecture",
  ];
  for (const directory of requiredDirectories) {
    mkdirSync(join(contextRoot, directory), { recursive: true });
  }
  mkdirSync(join(root, "docs/architecture"), { recursive: true });
  for (const group of domainGroups) {
    const directory = join(modulesRoot, group);
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(directory, "README.md"), `# ${group}\n`);
    writeFileSync(join(directory, "AGENTS.md"), `# ${group} rules\n`);
    writeFileSync(
      join(directory, "group.json"),
      JSON.stringify({
        group,
        areas: domainAreas[group as keyof typeof domainAreas],
      }),
    );
    for (const area of domainAreas[group as keyof typeof domainAreas]) {
      const areaDirectory = join(directory, area);
      mkdirSync(areaDirectory, { recursive: true });
      writeFileSync(join(areaDirectory, "README.md"), `# ${area}\n`);
      writeFileSync(join(areaDirectory, "AGENTS.md"), `# ${area} rules\n`);
      writeFileSync(
        join(areaDirectory, "area.json"),
        JSON.stringify({
          area,
          group,
          ownsRuntime: false,
          contexts:
            group === "platform-governance" &&
            area === "authentication-identity"
              ? ["example"]
              : [],
        }),
      );
    }
  }
  writeFileSync(join(contextRoot, "README.md"), "# Example\n");
  writeFileSync(join(contextRoot, "AGENTS.md"), "# Example rules\n");
  writeFileSync(
    join(contextRoot, "context.json"),
    JSON.stringify({
      context: "example",
      group: "platform-governance",
      area: "authentication-identity",
      boundaryType: "bounded-context",
      templateVersion: 2,
      subdomain: { name: "example", type: "core" },
    }),
  );
  writeFileSync(join(contextRoot, "public-api.ts"), "export {};\n");
  writeFileSync(join(contextRoot, "contracts/v1/public.ts"), "export {};\n");
  writeFileSync(join(contextRoot, "composition/index.ts"), "export {};\n");
  writeFileSync(
    join(root, "docs/architecture/context-topology-migration.json"),
    JSON.stringify({
      domainGroups,
      domainAreas,
      mode: "target",
      boundedContextTemplateVersion: 2,
      acceptedTargetContextCount: 1,
      legacyContexts: [],
    }),
  );
  writeFileSync(
    join(root, "docs/architecture/context-relocation-map.json"),
    JSON.stringify({
      version: 1,
      domainGroups: {
        "platform-governance": {
          purpose: "Fixture group",
          areas: {
            "authentication-identity": {
              purpose: "Fixture area",
              candidateContexts: ["example"],
            },
          },
        },
      },
    }),
  );
  return { root, groupRoot, areaRoot, contextRoot };
}

function inspectTopology(root: string) {
  return spawnSync(
    process.execPath,
    [
      join(
        repositoryRoot,
        "scripts/architecture/check-context-target-topology.mjs",
      ),
    ],
    { cwd: root, encoding: "utf8" },
  );
}

function writeMigrationFixture() {
  const root = mkdtempSync(join(tmpdir(), "www-ai-context-migration-"));
  temporaryDirectories.push(root);
  const source = join(root, "apps/web/src/modules/old-group/sample");
  mkdirSync(source, { recursive: true });
  const manifest = { context: "sample", group: "old-group", relationships: [] };
  writeFileSync(join(source, "context.json"), JSON.stringify(manifest));
  mkdirSync(join(root, "docs/architecture"), { recursive: true });
  mkdirSync(join(root, "docs/domains"), { recursive: true });
  writeFileSync(
    join(root, "docs/architecture/context-relocation-map.json"),
    JSON.stringify({
      version: 1,
      sourceDomainGroups: ["old-group"],
      domainGroups: {
        "new-group": {
          purpose: "Fixture group",
          areas: {
            area: { purpose: "Fixture area", candidateContexts: ["sample"] },
          },
        },
      },
      relocations: [
        {
          context: "sample",
          source: "old-group/sample",
          target: "new-group/area/sample",
          group: "new-group",
          area: "area",
        },
      ],
    }),
  );
  writeFileSync(
    join(root, "docs/domains/context-map.json"),
    JSON.stringify({ contexts: [manifest] }),
  );
  return root;
}

function inspectMigration(root: string, mode: string) {
  return spawnSync(
    process.execPath,
    [
      join(repositoryRoot, "scripts/architecture/migrate-context-topology.mjs"),
      mode,
    ],
    { cwd: root, encoding: "utf8" },
  );
}

const repositoryAreaContract = {
  ".agents": {
    directories: ["plugins", "skills"],
    files: ["AGENTS.md", "README.md"],
  },
  ".codex": {
    directories: [
      "agents",
      "environments",
      "logs",
      "plugins",
      "profiles",
      "prompts",
      "rules",
    ],
    files: ["AGENTS.md", "README.md", "TOOL-ROUTING.md", "config.toml"],
  },
  ".github": {
    directories: ["ISSUE_TEMPLATE", "instructions", "workflows"],
    files: [
      "AGENTS.md",
      "CODEOWNERS",
      "PULL_REQUEST_TEMPLATE.md",
      "README.md",
      "copilot-instructions.md",
      "dependabot.yml",
    ],
  },
  ".semgrep": {
    directories: [],
    files: ["AGENTS.md", "README.md", "architecture.yml", "ci.yml"],
  },
  ".serena": {
    directories: ["cache", "memories"],
    files: [".gitignore", "AGENTS.md", "README.md", "project.yml"],
  },
  docs: {
    directories: [
      "application",
      "architecture",
      "contracts",
      "data",
      "decisions",
      "domains",
      "engineering",
      "evidence",
      "experience",
      "governance",
      "initiatives",
      "operations",
      "product",
      "roadmap",
      "runbooks",
      "status",
      "strategy",
      "templates",
    ],
    files: [
      "AGENTS.md",
      "README.md",
      "ai-index.md",
      "architecture-document-catalog.md",
      "glossary.md",
    ],
  },
  packages: {
    directories: [
      "eslint-config",
      "shadcn",
      "testing-kit",
      "typescript-config",
    ],
    files: ["AGENTS.md", "README.md"],
  },
  plugins: {
    directories: ["modules", "serena"],
    files: ["AGENTS.md", "README.md"],
  },
  scripts: {
    directories: ["architecture", "codex", "validation"],
    files: ["AGENTS.md", "README.md"],
  },
  tests: {
    directories: ["architecture", "e2e"],
    files: ["AGENTS.md", "README.md"],
  },
  "apps/web/src/app": {
    directories: ["(console)", "(public)"],
    files: [
      "AGENTS.md",
      "README.md",
      "favicon.ico",
      "globals.css",
      "layout.tsx",
    ],
    optionalFiles: [
      "apple-icon.tsx",
      "error.tsx",
      "forbidden.tsx",
      "global-error.tsx",
      "global-not-found.tsx",
      "icon.tsx",
      "loading.tsx",
      "not-found.tsx",
      "opengraph-image.tsx",
      "template.tsx",
      "twitter-image.tsx",
      "unauthorized.tsx",
    ],
  },
  "apps/web/src/composition": {
    directories: [],
    files: ["product-composition.ts"],
  },
} as const;

const repositoryPluginNames = ["modules", "serena"] as const;

function writeRepositoryAreaFixture() {
  const root = mkdtempSync(join(tmpdir(), "www-ai-repository-topology-"));
  temporaryDirectories.push(root);

  for (const [area, contract] of Object.entries(repositoryAreaContract)) {
    const areaRoot = join(root, area);
    mkdirSync(areaRoot, { recursive: true });
    for (const directory of contract.directories) {
      mkdirSync(join(areaRoot, directory), { recursive: true });
    }
    for (const file of contract.files) {
      writeFileSync(join(areaRoot, file), "");
    }
  }

  for (const packageName of repositoryAreaContract.packages.directories) {
    writeFileSync(
      join(root, "packages", packageName, "package.json"),
      JSON.stringify({ name: `@fixture/${packageName}` }),
    );
  }
  for (const pluginName of repositoryPluginNames) {
    const pluginRoot = join(root, ".agents", "plugins", "plugins", pluginName);
    mkdirSync(join(pluginRoot, ".codex-plugin"), { recursive: true });
    mkdirSync(join(pluginRoot, "skills"), { recursive: true });
    writeFileSync(
      join(pluginRoot, ".codex-plugin", "plugin.json"),
      JSON.stringify({ name: pluginName }),
    );
  }
  writeFileSync(
    join(root, ".agents", "plugins", "marketplace.json"),
    JSON.stringify({
      name: "fixture-marketplace",
      plugins: repositoryPluginNames.map((name) => ({
        name,
        source: { source: "local", path: `./plugins/${name}` },
      })),
    }),
  );
  for (const routeGroup of repositoryAreaContract["apps/web/src/app"]
    .directories) {
    const routeRoot = join(root, "apps/web/src/app", routeGroup);
    writeFileSync(join(routeRoot, "AGENTS.md"), "# Rules\n");
    writeFileSync(join(routeRoot, "README.md"), "# Route group\n");
  }

  return root;
}

function inspectRepositoryAreas(root: string) {
  return spawnSync(
    process.execPath,
    [
      join(
        repositoryRoot,
        "scripts/architecture/check-repository-topology.mjs",
      ),
    ],
    { cwd: root, encoding: "utf8" },
  );
}

describe("cross-context import checker", () => {
  it("allows a consumer Infrastructure integration to import approved Published Language", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-contract-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [
      { upstream: "beta", downstream: "alpha" },
    ]);
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "adapters", "outbound", "integrations", "beta.adapter.ts"),
      'import type { BetaContract } from "@/src/modules/example/area/beta/contracts/v1/public";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([]);
  });

  it("rejects a relative import that bypasses a Context package export", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-relative-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [
      { upstream: "beta", downstream: "alpha" },
    ]);
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "adapters", "outbound", "integrations", "beta.adapter.ts"),
      'import type { BetaContract } from "@/src/modules/example/area/beta/domain/beta/entities/private";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([
      expect.stringContaining("peer Context imports may target only"),
    ]);
  });

  it("rejects a published-contract import with no Context Map relationship", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-missing-relationship-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha");
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "adapters", "outbound", "integrations", "beta.adapter.ts"),
      'import type { BetaContract } from "@/src/modules/example/area/beta/contracts/v1/public";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([
      expect.stringContaining("without a Context Map relationship"),
    ]);
  });

  it("rejects a new Application-to-provider contract dependency", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-application-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [
      { upstream: "beta", downstream: "alpha" },
    ]);
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "application", "use-cases", "use-case.ts"),
      'import type { BetaContract } from "@/src/modules/example/area/beta/contracts/v1/public";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([
      expect.stringContaining(
        "cross-context semantic dependencies belong only in consumer adapters/outbound",
      ),
    ]);
  });

  it("rejects an ungoverned cross-context dependency exception", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-exception-policy-"));
    temporaryDirectories.push(root);
    mkdirSync(join(root, "docs/architecture"), { recursive: true });
    writeFileSync(
      join(root, "docs/architecture/cross-context-dependency-exceptions.json"),
      JSON.stringify({
        exceptions: [
          {
            consumer: "alpha",
            file: "application/use-cases/use-case.ts",
            provider: "beta",
          },
        ],
      }),
    );

    expect(checkCrossContextImports(root)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("must declare owner"),
        expect.stringContaining("must declare expiresAt"),
      ]),
    );
  });

  it("accepts the canonical fixed Context topology", () => {
    const result = spawnSync(
      process.execPath,
      [
        join(
          repositoryRoot,
          "scripts/architecture/check-context-target-topology.mjs",
        ),
      ],
      { cwd: repositoryRoot, encoding: "utf8" },
    );
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain(
      "Fixed three-level Context topology is canonical",
    );
  });

  it("accepts a minimal generated fixed-tree fixture", () => {
    const { root } = writeCanonicalTopologyFixture();
    const result = inspectTopology(root);

    expect(result.status, result.stderr).toBe(0);
  });

  it("rejects a Domain Group outside the closed registry", () => {
    const { root } = writeCanonicalTopologyFixture();
    const rogueGroup = join(root, "apps/web/src/modules/rogue");
    mkdirSync(rogueGroup);
    writeFileSync(join(rogueGroup, "README.md"), "# Rogue\n");
    writeFileSync(join(rogueGroup, "AGENTS.md"), "# Rogue rules\n");
    writeFileSync(
      join(rogueGroup, "group.json"),
      JSON.stringify({ group: "rogue", areas: [] }),
    );

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("modules Domain Groups must be exactly");
  });

  it("rejects an alternative Context root layer", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    mkdirSync(join(contextRoot, "infrastructure"));
    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "platform-governance/authentication-identity/example has unexpected root directory infrastructure",
    );
  });

  it("rejects the former two-level Context placement", () => {
    const { root, groupRoot, contextRoot } = writeCanonicalTopologyFixture();
    cpSync(contextRoot, join(groupRoot, "legacy"), { recursive: true });

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "group.json areas must match child Domain Area directories",
    );
  });

  it("rejects an additional classification layer below a Domain Area", () => {
    const { root, areaRoot, contextRoot } = writeCanonicalTopologyFixture();
    const nested = join(areaRoot, "sub-area", "example");
    mkdirSync(join(areaRoot, "sub-area"), { recursive: true });
    cpSync(contextRoot, nested, { recursive: true });
    const area = JSON.parse(readFileSync(join(areaRoot, "area.json"), "utf8"));
    area.contexts.push("sub-area");
    writeFileSync(join(areaRoot, "area.json"), JSON.stringify(area));

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("sub-area/context.json is missing");
  });

  it("rejects runtime files owned by a Domain Area", () => {
    const { root, areaRoot } = writeCanonicalTopologyFixture();
    writeFileSync(join(areaRoot, "public-api.ts"), "export {};\n");

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("has unexpected root file public-api.ts");
  });

  it("rejects manifest Area and path disagreement", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    const manifest = JSON.parse(
      readFileSync(join(contextRoot, "context.json"), "utf8"),
    );
    manifest.area = "accounts-profile";
    writeFileSync(join(contextRoot, "context.json"), JSON.stringify(manifest));

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("manifest area must match its parent");
  });

  it("rejects duplicate global Context IDs", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    const otherArea = join(
      root,
      "apps/web/src/modules/platform-governance/accounts-profile",
    );
    const duplicate = join(otherArea, "example");
    cpSync(contextRoot, duplicate, { recursive: true });
    const area = JSON.parse(readFileSync(join(otherArea, "area.json"), "utf8"));
    area.contexts.push("example");
    writeFileSync(join(otherArea, "area.json"), JSON.stringify(area));

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "example Context ID must be globally unique",
    );
  });

  it("rejects a nested directory below a fixed tactical leaf", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    mkdirSync(join(contextRoot, "domain/example/aggregates/internal"));

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "domain/example/aggregates is a fixed tactical leaf and must not contain directory internal",
    );
  });

  it("rejects simplifying the template by removing a mandatory directory", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    rmSync(join(contextRoot, "domain/example/policies"), { recursive: true });

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "is missing directory domain/example/policies",
    );
  });

  it("rejects source files in a structural parent", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    writeFileSync(join(contextRoot, "domain/policy.ts"), "export {};\n");

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "domain must not contain root file policy.ts",
    );
  });

  it("rejects additional contract-version root entries", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    writeFileSync(join(contextRoot, "contracts/v1/private.ts"), "export {};\n");

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "contracts/v1 has unexpected root file private.ts",
    );
  });

  it("rejects a directory that does not declare Bounded Context identity", () => {
    const { root, contextRoot } = writeCanonicalTopologyFixture();
    writeFileSync(
      join(contextRoot, "context.json"),
      JSON.stringify({
        context: "example",
        group: "platform-governance",
        area: "authentication-identity",
        boundaryType: "module",
        templateVersion: 2,
      }),
    );

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "platform-governance/authentication-identity/example must declare boundaryType bounded-context",
    );
  });

  it("rejects a topology registry that changes the closed six groups", () => {
    const { root } = writeCanonicalTopologyFixture();
    const registryPath = join(
      root,
      "docs/architecture/context-topology-migration.json",
    );
    const registry = JSON.parse(readFileSync(registryPath, "utf8"));
    registry.domainGroups.push("rogue");
    writeFileSync(registryPath, JSON.stringify(registry));

    const result = inspectTopology(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "topology registry Domain Groups must be exactly",
    );
  });
});

describe("mechanical Context topology migration", () => {
  it("validates and previews a declarative relocation", () => {
    const root = writeMigrationFixture();

    expect(inspectMigration(root, "--check").status).toBe(0);
    const preview = inspectMigration(root, "--dry-run");
    expect(preview.status, preview.stderr).toBe(0);
    expect(preview.stdout).toContain(
      "old-group/sample -> new-group/area/sample",
    );
    expect(
      existsSync(join(root, "apps/web/src/modules/old-group/sample")),
    ).toBe(true);
  });

  it("applies idempotently and rolls path metadata back", () => {
    const root = writeMigrationFixture();
    const applied = inspectMigration(root, "--apply");

    expect(applied.status, applied.stderr).toBe(0);
    const target = join(root, "apps/web/src/modules/new-group/area/sample");
    expect(existsSync(target)).toBe(true);
    expect(
      JSON.parse(readFileSync(join(target, "context.json"), "utf8")),
    ).toMatchObject({
      context: "sample",
      group: "new-group",
      area: "area",
    });

    const second = inspectMigration(root, "--apply");
    expect(second.status, second.stderr).toBe(0);
    expect(second.stdout).toContain("(0 moves)");

    const rollback = inspectMigration(root, "--rollback");
    expect(rollback.status, rollback.stderr).toBe(0);
    expect(
      existsSync(join(root, "apps/web/src/modules/old-group/sample")),
    ).toBe(true);
  });

  it("rejects collisions and missing Context locations", () => {
    const collisionRoot = writeMigrationFixture();
    mkdirSync(
      join(collisionRoot, "apps/web/src/modules/new-group/area/sample"),
      {
        recursive: true,
      },
    );
    expect(inspectMigration(collisionRoot, "--check").status).toBe(1);

    const missingRoot = writeMigrationFixture();
    rmSync(join(missingRoot, "apps/web/src/modules/old-group/sample"), {
      recursive: true,
    });
    expect(inspectMigration(missingRoot, "--check").status).toBe(1);
  });
});

describe("source policy checker", () => {
  it("accepts explicit Domain inputs", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-source-policy-"));
    temporaryDirectories.push(root);
    const domain = join(
      root,
      "apps/web/src/modules/example/area/alpha/domain/alpha/value-objects",
    );
    mkdirSync(domain, { recursive: true });
    writeFileSync(
      join(domain, "expiry.ts"),
      "export const hasExpired = (now: Date, expiresAt: Date) => now >= expiresAt;\n",
    );

    expect(checkSourcePolicies(root)).toEqual([]);
  });

  it("accepts Repository product language", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-source-policy-"));
    temporaryDirectories.push(root);
    const route = join(root, "apps/web/src/app/repositories");
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, "page.tsx"),
      "export default function RepositoriesPage() { return <main>Repository management</main>; }\n",
    );

    expect(checkSourcePolicies(root)).toEqual([]);
  });

  it("rejects Workspace product language in runtime source", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-source-policy-"));
    temporaryDirectories.push(root);
    const route = join(root, "apps/web/src/app/repositories");
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, "page.tsx"),
      "export default function WorkspacePage() { return <main>Repositories</main>; }\n",
    );

    expect(checkSourcePolicies(root)).toEqual([
      expect.stringContaining("uses Workspace product language"),
    ]);
  });

  it.each([
    ["environment", "process.env.FEATURE_FLAG", "process.env"],
    ["clock", "Date.now()", "Date.now()"],
    ["randomness", "crypto.randomUUID()", "runtime randomness"],
  ])("rejects ambient Domain %s", (_name, expression, label) => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-source-policy-"));
    temporaryDirectories.push(root);
    const domain = join(
      root,
      "apps/web/src/modules/example/area/alpha/domain/alpha/entities",
    );
    mkdirSync(domain, { recursive: true });
    writeFileSync(
      join(domain, "ambient.ts"),
      `export const ambient = ${expression};\n`,
    );

    expect(checkSourcePolicies(root)).toEqual([
      expect.stringContaining(`reads ${label}`),
    ]);
  });
});

describe("closed repository area topology", () => {
  it("accepts the exact governed root structures", () => {
    const result = inspectRepositoryAreas(writeRepositoryAreaFixture());

    expect(result.status, result.stderr).toBe(0);
  });

  it("rejects an additional Codex resource hierarchy", () => {
    const root = writeRepositoryAreaFixture();
    mkdirSync(join(root, ".codex", "shortcuts"));

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(".codex directories must be exactly");
  });

  it("rejects an unowned composition bucket", () => {
    const root = writeRepositoryAreaFixture();
    mkdirSync(join(root, "apps/web/src/composition/services"), {
      recursive: true,
    });

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "apps/web/src/composition directories must be exactly",
    );
  });

  it("rejects a repository marketplace path outside the plugin root", () => {
    const root = writeRepositoryAreaFixture();
    const marketplacePath = join(
      root,
      ".agents",
      "plugins",
      "marketplace.json",
    );
    const marketplace = JSON.parse(readFileSync(marketplacePath, "utf8"));
    marketplace.plugins[0].source.path = "../../plugins/serena";
    writeFileSync(marketplacePath, JSON.stringify(marketplace));

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("must use source.path ./plugins/modules");
  });

  it("rejects simplifying the closed package registry", () => {
    const root = writeRepositoryAreaFixture();
    rmSync(join(root, "packages", "testing-kit"), { recursive: true });

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("packages directories must be exactly");
  });

  it("rejects a third application audience route group", () => {
    const root = writeRepositoryAreaFixture();
    mkdirSync(join(root, "apps/web/src/app", "(admin)"));

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "apps/web/src/app directories must be exactly",
    );
  });

  it.each(["_lib", "_actions", "_components", "_draft"])(
    "rejects the %s App Router ownership bucket recursively",
    (directory) => {
      const root = writeRepositoryAreaFixture();
      mkdirSync(
        join(root, "apps/web/src/app/(console)/repositories", directory),
        { recursive: true },
      );

      const result = inspectRepositoryAreas(root);

      expect(result.status).toBe(1);
      expect(result.stderr).toContain(
        "App Router ownership bucket is forbidden",
      );
    },
  );

  it.each([
    "folder",
    "@slot",
    "(group)",
    "[param]",
    "[...param]",
    "[[...param]]",
    "(.)segment",
    "(..)segment",
    "(..)(..)segment",
    "(...)segment",
  ])("allows the %s route segment convention", (segment) => {
    const root = writeRepositoryAreaFixture();
    const route = join(root, "apps/web/src/app/(console)", segment);
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, "page.tsx"),
      "export default function Page() { return null; }\n",
    );

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(0);
  });

  it("rejects generic actions.ts files recursively", () => {
    const root = writeRepositoryAreaFixture();
    const route = join(root, "apps/web/src/app/(console)/notifications");
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, "actions.ts"),
      "export async function act() {}\n",
    );

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Generic App Router action file is forbidden",
    );
  });

  it("rejects TSX files that are not approved App Router conventions", () => {
    const root = writeRepositoryAreaFixture();
    const route = join(root, "apps/web/src/app/(console)/repositories");
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, "repository-composition.tsx"),
      "export function RepositoryComposition() { return null; }\n",
    );

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("App Router TSX entry is forbidden");
  });

  it.each([
    "page.tsx",
    "layout.tsx",
    "template.tsx",
    "loading.tsx",
    "error.tsx",
    "not-found.tsx",
    "icon.tsx",
    "apple-icon.tsx",
    "opengraph-image.tsx",
    "twitter-image.tsx",
  ])("allows the %s App Router convention", (fileName) => {
    const root = writeRepositoryAreaFixture();
    const route = join(root, "apps/web/src/app/(console)/settings");
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, fileName),
      "export default function Convention() { return null; }\n",
    );

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(0);
  });

  it.each([
    "global-error.tsx",
    "global-not-found.tsx",
    "unauthorized.tsx",
    "forbidden.tsx",
  ])(
    "allows the root-only %s App Router convention at app root",
    (fileName) => {
      const root = writeRepositoryAreaFixture();
      writeFileSync(
        join(root, "apps/web/src/app", fileName),
        "export default function Convention() { return null; }\n",
      );

      const result = inspectRepositoryAreas(root);

      expect(result.status).toBe(0);
    },
  );

  it("rejects a root-only App Router convention in a nested segment", () => {
    const root = writeRepositoryAreaFixture();
    const route = join(root, "apps/web/src/app/(console)/settings");
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, "global-error.tsx"),
      "export default function GlobalError() { return null; }\n",
    );

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Root-only App Router TSX entry is misplaced",
    );
  });

  it("allows default.tsx only for a parallel route slot or its owner", () => {
    const root = writeRepositoryAreaFixture();
    const route = join(root, "apps/web/src/app/(console)/repositories");
    const slot = join(route, "@inspector");
    mkdirSync(slot, { recursive: true });
    writeFileSync(
      join(route, "default.tsx"),
      "export default function Default() { return null; }\n",
    );
    writeFileSync(
      join(slot, "default.tsx"),
      "export default function Default() { return null; }\n",
    );

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(0);
  });

  it("rejects the deprecated presentation root", () => {
    const root = writeRepositoryAreaFixture();
    mkdirSync(join(root, "apps/web/src/presentation"), { recursive: true });

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Deprecated presentation root is forbidden",
    );
  });

  it("rejects page/handler ambiguity inside a route group", () => {
    const root = writeRepositoryAreaFixture();
    const route = join(root, "apps/web/src/app/(public)/docs/(alternate)");
    mkdirSync(route, { recursive: true });
    writeFileSync(
      join(route, "page.tsx"),
      "export default function Page() {}\n",
    );
    writeFileSync(join(route, "route.ts"), "export function GET() {}\n");

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "cannot contain both page.tsx and route.ts",
    );
  });

  it("rejects a plugin without its machine-readable manifest", () => {
    const root = writeRepositoryAreaFixture();
    rmSync(
      join(root, ".agents/plugins/plugins/modules/.codex-plugin/plugin.json"),
    );

    const result = inspectRepositoryAreas(root);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Plugin is missing .codex-plugin/plugin.json",
    );
  });
});
