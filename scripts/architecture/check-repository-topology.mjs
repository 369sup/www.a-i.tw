import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const exactAreaEntries = {
  ".agents": {
    directories: ["plugins", "skills"],
    files: ["AGENTS.md", "README.md"],
  },
  ".codex": {
    directories: ["agents", "environments", "logs", "rules"],
    files: ["AGENTS.md", "README.md", "config.toml"],
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
      "manifest.ts",
      "not-found.tsx",
      "opengraph-image.tsx",
      "robots.ts",
      "sitemap.ts",
      "template.tsx",
      "twitter-image.tsx",
      "unauthorized.tsx",
    ],
  },
  "apps/web/src/composition": {
    directories: [],
    files: ["product-composition.ts"],
  },
};
const requiredRoots = [
  ".agents",
  ".codex",
  ".github",
  ".semgrep",
  ".serena",
  "apps",
  "docs",
  "packages",
  "scripts",
  "tests",
];
const forbiddenRoots = [
  "modules",
  "application",
  "contracts",
  "domain",
  "foundation",
  "infrastructure",
  "tooling",
  "ui",
  "shared",
  "common",
  "core",
  "utils",
  "helpers",
];
const forbiddenPackageCategories = new Set([
  "application",
  "contracts",
  "domain",
  "foundation",
  "infrastructure",
  "tooling",
  "shared",
  "common",
  "core",
  "utils",
  "helpers",
]);
const requiredWebRouteGroups = [
  "apps/web/src/app/(public)",
  "apps/web/src/app/(console)",
];
const forbiddenWebAppEntries = [
  "apps/web/src/app/(product)",
  "apps/web/src/app/docs",
  "apps/web/src/app/api",
  "apps/web/src/app/architecture",
  "apps/web/src/app/@modal",
  "apps/web/src/app/page.tsx",
];
const forbiddenWebRootEntries = [
  "apps/web/components",
  "apps/web/lib",
  "apps/web/components.json",
];
const forbiddenConsoleEntries = [
  "apps/web/src/app/(console)/architecture",
  "apps/web/src/app/(console)/@modal",
];
const forbiddenWebSourceEntries = ["apps/web/src/presentation"];
const forbiddenAppFileNames = new Set(["actions.ts"]);
const allowedAppTsxFileNames = new Set([
  "apple-icon.tsx",
  "error.tsx",
  "forbidden.tsx",
  "global-error.tsx",
  "global-not-found.tsx",
  "icon.tsx",
  "layout.tsx",
  "loading.tsx",
  "not-found.tsx",
  "opengraph-image.tsx",
  "page.tsx",
  "template.tsx",
  "twitter-image.tsx",
  "unauthorized.tsx",
]);
const rootOnlyAppTsxFileNames = new Set([
  "forbidden.tsx",
  "global-error.tsx",
  "global-not-found.tsx",
  "unauthorized.tsx",
]);

function sortedEntries(path, kind) {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) =>
      kind === "directories" ? entry.isDirectory() : entry.isFile(),
    )
    .map((entry) => entry.name)
    .sort();
}

function checkExactArea(path, contract) {
  if (!existsSync(path)) return;
  const actualDirectories = sortedEntries(path, "directories");
  const actualFiles = sortedEntries(path, "files");
  const expectedDirectories = [...contract.directories].sort();
  const expectedFiles = [...contract.files].sort();
  const optionalFiles = [...(contract.optionalFiles ?? [])].sort();
  if (
    JSON.stringify(actualDirectories) !== JSON.stringify(expectedDirectories)
  ) {
    errors.push(
      `${path} directories must be exactly: ${expectedDirectories.join(", ") || "(none)"}.`,
    );
  }
  if (
    expectedFiles.some((file) => !actualFiles.includes(file)) ||
    actualFiles.some(
      (file) => !expectedFiles.includes(file) && !optionalFiles.includes(file),
    )
  ) {
    errors.push(
      `${path} files must include: ${expectedFiles.join(", ") || "(none)"}; optional files: ${optionalFiles.join(", ") || "(none)"}.`,
    );
  }
}

function walkDirectories(path, visit) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = join(path, entry.name);
    visit(child, entry.name);
    walkDirectories(child, visit);
  }
}

function checkAppEntryTree(path) {
  const entries = readdirSync(path, { withFileTypes: true });
  const directoryName = path.split(/[\\/]/u).at(-1) ?? "";
  const isAppRoot = path.replaceAll("\\", "/").endsWith("apps/web/src/app");
  const ownsParallelRouteSlots = entries.some(
    (entry) => entry.isDirectory() && entry.name.startsWith("@"),
  );
  for (const entry of entries) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_")) {
        errors.push(
          `App Router ownership bucket is forbidden: ${child}. Private folders prefixed with _ are prohibited; use an owning Context adapter or a responsibility-named composition file.`,
        );
      }
      checkAppEntryTree(child);
      continue;
    }
    if (entry.isFile() && forbiddenAppFileNames.has(entry.name)) {
      errors.push(
        `Generic App Router action file is forbidden: ${child}. Use an owning Context adapter and a responsibility-named command composition file.`,
      );
    }
    if (
      entry.isFile() &&
      entry.name.endsWith(".tsx") &&
      !allowedAppTsxFileNames.has(entry.name) &&
      !(
        entry.name === "default.tsx" &&
        (directoryName.startsWith("@") || ownsParallelRouteSlots)
      )
    ) {
      errors.push(
        `App Router TSX entry is forbidden: ${child}. Use an approved Next.js App Router file convention; default.tsx is limited to parallel routes.`,
      );
    }
    if (
      entry.isFile() &&
      rootOnlyAppTsxFileNames.has(entry.name) &&
      !isAppRoot
    ) {
      errors.push(
        `Root-only App Router TSX entry is misplaced: ${child}. ${entry.name} must live at apps/web/src/app.`,
      );
    }
  }
}

function checkRouteSegment(directory, name) {
  if (
    existsSync(join(directory, "page.tsx")) &&
    existsSync(join(directory, "route.ts"))
  ) {
    errors.push(
      `Route segment cannot contain both page.tsx and route.ts: ${directory}.`,
    );
  }
}

for (const root of requiredRoots) {
  if (!existsSync(root))
    errors.push(`Required repository root is missing: ${root}.`);
}
for (const [path, contract] of Object.entries(exactAreaEntries)) {
  checkExactArea(path, contract);
}
for (const root of forbiddenRoots) {
  if (existsSync(root))
    errors.push(`Forbidden parallel repository root exists: ${root}.`);
}
if (!existsSync("packages/AGENTS.md") || !existsSync("packages/README.md")) {
  errors.push("packages must define AGENTS.md and README.md ownership policy.");
}
if (existsSync("packages")) {
  for (const entry of readdirSync("packages", { withFileTypes: true })) {
    if (entry.isDirectory() && forbiddenPackageCategories.has(entry.name)) {
      errors.push(
        `packages/${entry.name} is a forbidden horizontal layer or ownership-free category.`,
      );
    }
  }
}
for (const routeGroup of requiredWebRouteGroups) {
  if (!existsSync(routeGroup))
    errors.push(`Required web route group is missing: ${routeGroup}.`);
}
for (const entry of forbiddenWebAppEntries) {
  if (existsSync(entry))
    errors.push(
      `Web route must be classified under (public) or (console): ${entry}.`,
    );
}
for (const entry of forbiddenWebRootEntries) {
  if (existsSync(entry))
    errors.push(
      `Web capability must have an explicit owner under src: ${entry}.`,
    );
}
for (const entry of forbiddenConsoleEntries) {
  if (existsSync(entry))
    errors.push(
      `Console has a duplicate Template UX or global modal slot: ${entry}.`,
    );
}
for (const entry of forbiddenWebSourceEntries) {
  if (existsSync(entry)) {
    errors.push(
      `Deprecated presentation root is forbidden: ${entry}. Place product behavior in its owning Context and assemble it in App Router.`,
    );
  }
}
if (existsSync("apps/web/src/app")) {
  checkAppEntryTree("apps/web/src/app");
}

for (const skill of readdirSync(".agents/skills", { withFileTypes: true })) {
  if (
    skill.isDirectory() &&
    !existsSync(join(".agents/skills", skill.name, "SKILL.md"))
  ) {
    errors.push(
      `Repository skill is missing SKILL.md: .agents/skills/${skill.name}.`,
    );
  }
}
for (const packageEntry of readdirSync("packages", { withFileTypes: true })) {
  if (
    packageEntry.isDirectory() &&
    !existsSync(join("packages", packageEntry.name, "package.json"))
  ) {
    errors.push(
      `Workspace package is missing package.json: packages/${packageEntry.name}.`,
    );
  }
}
const repositoryPluginRoot = ".agents/plugins/plugins";
for (const plugin of readdirSync(repositoryPluginRoot, {
  withFileTypes: true,
})) {
  if (!plugin.isDirectory()) continue;
  const pluginRoot = join(repositoryPluginRoot, plugin.name);
  if (!existsSync(join(pluginRoot, ".codex-plugin", "plugin.json"))) {
    errors.push(`Plugin is missing .codex-plugin/plugin.json: ${pluginRoot}.`);
  }
  if (!existsSync(join(pluginRoot, "skills"))) {
    errors.push(`Plugin is missing skills/: ${pluginRoot}.`);
  } else {
    for (const skill of readdirSync(join(pluginRoot, "skills"), {
      withFileTypes: true,
    })) {
      if (
        skill.isDirectory() &&
        !existsSync(join(pluginRoot, "skills", skill.name, "SKILL.md"))
      ) {
        errors.push(
          `Plugin skill is missing SKILL.md: ${pluginRoot}/skills/${skill.name}.`,
        );
      }
    }
  }
}

const marketplacePath = ".agents/plugins/marketplace.json";
if (!existsSync(marketplacePath)) {
  errors.push(`Repository marketplace is missing: ${marketplacePath}.`);
} else {
  try {
    const marketplace = JSON.parse(readFileSync(marketplacePath, "utf8"));
    if (!Array.isArray(marketplace.plugins)) {
      errors.push(`${marketplacePath} plugins must be an array.`);
    } else {
      const marketplaceNames = new Set();
      for (const entry of marketplace.plugins) {
        const name = entry?.name;
        if (typeof name !== "string" || name.length === 0) {
          errors.push(`${marketplacePath} contains a plugin without a name.`);
          continue;
        }
        if (marketplaceNames.has(name)) {
          errors.push(`Duplicate repository marketplace plugin: ${name}.`);
        }
        marketplaceNames.add(name);
        const expectedSourcePath = `./.agents/plugins/plugins/${name}`;
        if (entry?.source?.source !== "local") {
          errors.push(
            `Repository marketplace plugin ${name} must use a local source.`,
          );
        }
        if (entry?.source?.path !== expectedSourcePath) {
          errors.push(
            `Repository marketplace plugin ${name} must use source.path ${expectedSourcePath}.`,
          );
        }
        const manifestPath = join(
          repositoryPluginRoot,
          name,
          ".codex-plugin",
          "plugin.json",
        );
        if (!existsSync(manifestPath)) {
          errors.push(
            `Marketplace plugin manifest is missing: ${manifestPath}.`,
          );
          continue;
        }
        const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
        if (manifest.name !== name) {
          errors.push(
            `Marketplace plugin ${name} does not match manifest name ${manifest.name}.`,
          );
        }
      }
      for (const plugin of readdirSync(repositoryPluginRoot, {
        withFileTypes: true,
      })) {
        if (plugin.isDirectory() && !marketplaceNames.has(plugin.name)) {
          errors.push(
            `Plugin is missing from repository marketplace: ${plugin.name}.`,
          );
        }
      }
    }
  } catch (error) {
    errors.push(`Repository marketplace is invalid JSON: ${error.message}`);
  }
}
for (const routeGroup of requiredWebRouteGroups) {
  if (
    !existsSync(join(routeGroup, "AGENTS.md")) ||
    !existsSync(join(routeGroup, "README.md"))
  ) {
    errors.push(`${routeGroup} must define AGENTS.md and README.md.`);
  }
  checkRouteSegment(routeGroup, routeGroup);
  walkDirectories(routeGroup, checkRouteSegment);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Repository roots and technical package topology are canonical.");
