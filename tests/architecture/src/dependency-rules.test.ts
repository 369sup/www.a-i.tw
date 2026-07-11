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
      "modules",
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
    ["domain-imports-application", "domain-does-not-depend-outward"],
    [
      "application-imports-infrastructure",
      "application-does-not-depend-on-infrastructure",
    ],
    ["cross-context-internal", "no-cross-context-internal-imports"],
    ["contracts-import-domain", "contracts-are-standalone"],
    ["circular-domain", "no-circular-dependencies"],
    ["domain-imports-core", "domain-has-no-external-dependencies"],
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
  const directory = join(root, "modules", name);
  mkdirSync(join(directory, "src", "application"), { recursive: true });
  writeFileSync(
    join(directory, "package.json"),
    JSON.stringify({ name: `@a-i/${name}` }),
  );
  writeFileSync(
    join(directory, "context.json"),
    JSON.stringify({ context: name, relationships }),
  );
  return directory;
}

describe("cross-context import checker", () => {
  it("allows an approved published-contract import", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-contract-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [{ target: "beta" }]);
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "src", "application", "use-case.ts"),
      'import type { BetaContract } from "@a-i/beta/contracts";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([]);
  });

  it("rejects a relative import that bypasses a Context package export", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-relative-import-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha", [{ target: "beta" }]);
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "src", "application", "use-case.ts"),
      'import type { BetaContract } from "../../../beta/src/contracts/public";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([
      expect.stringContaining("relative cross-context import"),
    ]);
  });

  it("rejects a published-contract import with no Context Map relationship", () => {
    const root = mkdtempSync(join(tmpdir(), "www-ai-missing-relationship-"));
    temporaryDirectories.push(root);
    const alpha = writeContext(root, "alpha");
    writeContext(root, "beta");
    writeFileSync(
      join(alpha, "src", "application", "use-case.ts"),
      'import type { BetaContract } from "@a-i/beta/contracts";\nexport type Value = BetaContract;',
    );

    expect(checkCrossContextImports(root)).toEqual([
      expect.stringContaining("without a Context Map relationship"),
    ]);
  });
});
