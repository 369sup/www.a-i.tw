import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const sourceRoot = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../../../..",
);
const generatorRelativePath =
  ".agents/plugins/plugins/modules/skills/scaffold-bounded-context/scripts/generate.mjs";
const templateRelativePath =
  ".agents/plugins/plugins/modules/skills/scaffold-bounded-context/assets/bounded-context-fixed-template";
const contextPath =
  "apps/web/src/modules/platform-governance/authentication-identity/example-context";

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function createFixture({ invalidMap = false } = {}) {
  const root = mkdtempSync(join(tmpdir(), "context-generator-"));
  const generatorPath = join(root, generatorRelativePath);
  mkdirSync(dirname(generatorPath), { recursive: true });
  cpSync(join(sourceRoot, generatorRelativePath), generatorPath);
  cpSync(
    join(sourceRoot, templateRelativePath),
    join(root, templateRelativePath),
    {
      recursive: true,
    },
  );

  writeJson(join(root, "docs/architecture/context-topology-migration.json"), {
    boundedContextTemplateVersion: 2,
    domainGroups: ["platform-governance"],
    domainAreas: {
      "platform-governance": ["authentication-identity"],
    },
  });
  writeJson(join(root, "docs/architecture/context-relocation-map.json"), {
    domainGroups: {
      "platform-governance": {
        areas: {
          "authentication-identity": {
            candidateContexts: ["example-context"],
          },
        },
      },
    },
  });
  writeJson(join(root, "apps/web/src/modules/platform-governance/group.json"), {
    group: "platform-governance",
  });
  writeJson(
    join(
      root,
      "apps/web/src/modules/platform-governance/authentication-identity/area.json",
    ),
    {
      area: "authentication-identity",
      ownsRuntime: false,
      contexts: ["example-context"],
    },
  );

  const destination = join(root, contextPath);
  mkdirSync(destination, { recursive: true });
  writeFileSync(join(destination, "AGENTS.md"), "# Preserved governance\n");
  writeFileSync(join(destination, "README.md"), "# Preserved evidence\n");
  writeJson(join(destination, "context.json"), {
    context: "example-context",
    lifecycle: "planned",
    runtimeEvidence: { status: "none" },
  });
  writeFileSync(join(destination, "public-api.ts"), "export {};\n");

  mkdirSync(join(root, "docs/domains"), { recursive: true });
  writeFileSync(
    join(root, "docs/domains/context-map.json"),
    invalidMap ? "{ invalid json" : '{"contexts":[]}\n',
  );

  return root;
}

function runGenerator(root, lifecycle = "prototype") {
  return spawnSync(
    process.execPath,
    [
      generatorRelativePath,
      "--context",
      "example-context",
      "--group",
      "platform-governance",
      "--area",
      "authentication-identity",
      "--domain",
      "Enterprise Identity",
      "--subdomain",
      "identity",
      "--type",
      "supporting",
      "--owner",
      "Product Team",
      "--problem",
      "Configure an identity provider.",
      "--first-use-case",
      "Configure a tested SAML connection.",
      "--source-of-truth",
      "IdentityProviderConnection",
      "--lifecycle",
      lifecycle,
      "--promote",
      "true",
    ],
    { cwd: root, encoding: "utf8" },
  );
}

test("promotes a planned descriptor without losing governance or duplicating registries", () => {
  const root = createFixture();
  const result = runGenerator(root);

  assert.equal(result.status, 0, result.stderr);
  const destination = join(root, contextPath);
  assert.equal(
    readFileSync(join(destination, "AGENTS.md"), "utf8"),
    "# Preserved governance\n",
  );
  assert.equal(
    readFileSync(join(destination, "README.md"), "utf8"),
    "# Preserved evidence\n",
  );
  for (const runtimeRoot of [
    "domain",
    "application",
    "contracts",
    "adapters",
    "composition",
    "tests",
  ])
    assert.equal(existsSync(join(destination, runtimeRoot)), true);

  const manifest = JSON.parse(
    readFileSync(join(destination, "context.json"), "utf8"),
  );
  assert.equal(manifest.lifecycle, "prototype");
  assert.equal(manifest.runtimeEvidence.status, "scaffolded");

  const area = JSON.parse(
    readFileSync(
      join(
        root,
        "apps/web/src/modules/platform-governance/authentication-identity/area.json",
      ),
      "utf8",
    ),
  );
  assert.deepEqual(area.contexts, ["example-context"]);
  const map = JSON.parse(
    readFileSync(join(root, "docs/domains/context-map.json"), "utf8"),
  );
  assert.deepEqual(
    map.contexts.map((entry) => entry.context),
    ["example-context"],
  );
});

test("rejects planned lifecycle promotion before changing the descriptor", () => {
  const root = createFixture();
  const result = runGenerator(root, "planned");

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /cannot be combined/);
  assert.equal(
    readFileSync(join(root, contextPath, "AGENTS.md"), "utf8"),
    "# Preserved governance\n",
  );
  assert.deepEqual(readdirSync(join(root, contextPath)).sort(), [
    "AGENTS.md",
    "README.md",
    "context.json",
    "public-api.ts",
  ]);
});

test("leaves the planned descriptor intact when preparation fails", () => {
  const root = createFixture({ invalidMap: true });
  const result = runGenerator(root);

  assert.notEqual(result.status, 0);
  assert.equal(
    readFileSync(join(root, contextPath, "README.md"), "utf8"),
    "# Preserved evidence\n",
  );
  assert.deepEqual(readdirSync(join(root, contextPath)).sort(), [
    "AGENTS.md",
    "README.md",
    "context.json",
    "public-api.ts",
  ]);
});
