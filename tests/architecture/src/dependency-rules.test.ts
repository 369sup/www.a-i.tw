import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { checkCrossContextImports } from "../../../scripts/architecture/cross-context-imports.mjs";

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

function inspectFixture(name: string): Violation[] {
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
      "apps",
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
  it("accepts a Context that imports its own Domain and another Context contract", () => {
    expect(inspectFixture("valid")).toEqual([]);
  });

  it.each([
    ["domain-imports-application", "app-local-domain-does-not-depend-outward"],
    [
      "application-imports-infrastructure",
      "app-local-application-does-not-depend-on-infrastructure",
    ],
    ["cross-context-internal", "no-app-local-cross-context-internal-imports"],
    ["contracts-import-domain", "app-local-contracts-are-standalone"],
    ["circular-domain", "no-circular-dependencies"],
    ["domain-imports-core", "app-local-domain-has-no-external-dependencies"],
    [
      "internal-subdomain-domain-imports-core",
      "internal-subdomain-domain-has-no-external-dependencies",
    ],
  ])("rejects %s with %s", (fixture, rule) => {
    const violations = inspectFixture(fixture);

    expect(violations.map((violation) => violation.rule.name)).toContain(rule);
  });
});

function writeContext(
  root: string,
  name: string,
  relationships: Array<{ target: string }> = [],
) {
  const directory = join(root, "apps/web/src/modules", name);
  mkdirSync(join(directory, "application", name, "use-cases"), {
    recursive: true,
  });
  mkdirSync(
    join(directory, "infrastructure", name, "integrations", "outbound"),
    { recursive: true },
  );
  mkdirSync(join(directory, "contracts", name), { recursive: true });
  writeFileSync(
    join(directory, "context.json"),
    JSON.stringify({ context: name, relationships }),
  );
  return directory;
}

describe("cross-context import checker", () => {
  it("allows a consumer Infrastructure integration to import approved Published Language", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-contract-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [{ target: "beta" }]);
    writeContext(root, "beta");
    writeFileSync(
      join(
        alpha,
        "infrastructure",
        "alpha",
        "integrations",
        "outbound",
        "beta.adapter.ts",
      ),
      'import type { BetaContract } from "@/src/modules/beta/contracts/beta/public";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([]);
  });

  it("rejects a relative import that bypasses a Context package export", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-relative-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [{ target: "beta" }]);
    writeContext(root, "beta");
    writeFileSync(
      join(
        alpha,
        "infrastructure",
        "alpha",
        "integrations",
        "outbound",
        "beta.adapter.ts",
      ),
      'import type { BetaContract } from "@/src/modules/beta/domain/beta/private";\nexport type Value = BetaContract;',
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
      join(
        alpha,
        "infrastructure",
        "alpha",
        "integrations",
        "outbound",
        "beta.adapter.ts",
      ),
      'import type { BetaContract } from "@/src/modules/beta/contracts/beta/public";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([
      expect.stringContaining("without a Context Map relationship"),
    ]);
  });

  it("rejects a new Application-to-provider contract dependency", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-application-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [{ target: "beta" }]);
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "application", "alpha", "use-cases", "use-case.ts"),
      'import type { BetaContract } from "@/src/modules/beta/contracts/beta/public";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([
      expect.stringContaining(
        "cross-context semantic dependencies belong only in consumer infrastructure",
      ),
    ]);
  });

  it("accepts the registered target Context topology", () => {
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
    expect(result.stdout).toContain("target mode");
  });
});
