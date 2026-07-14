import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const sourceExtensions = new Set([".ts", ".tsx"]);
const ambientDomainInputs = [
  { label: "process.env", pattern: /\bprocess\.env\b/u },
  { label: "Date.now()", pattern: /\bDate\.now\s*\(/u },
  { label: "Math.random()", pattern: /\bMath\.random\s*\(/u },
  {
    label: "runtime randomness",
    pattern:
      /\b(?:crypto|globalThis\.crypto)\.(?:randomUUID|getRandomValues)\s*\(/u,
  },
];

function walk(directory, files) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path, files);
    else if (
      sourceExtensions.has(`.${entry.name.split(".").pop()}`) &&
      !path.includes(`${join("domain", "tests")}`)
    )
      files.push(path);
  }
}

function walkRuntimeSource(directory, files) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walkRuntimeSource(path, files);
    else if (sourceExtensions.has(`.${entry.name.split(".").pop()}`))
      files.push(path);
  }
}

export function checkSourcePolicies(root = process.cwd()) {
  const modulesRoot = join(root, "apps/web/src/modules");
  const files = [];
  walk(modulesRoot, files);
  const errors = [];

  const runtimeFiles = [];
  walkRuntimeSource(join(root, "apps/web/src"), runtimeFiles);
  for (const file of runtimeFiles) {
    const normalized = relative(root, file).replaceAll("\\", "/");
    const content = readFileSync(file, "utf8");
    if (/workspace/iu.test(normalized) || /workspace/iu.test(content)) {
      errors.push(
        `${normalized} uses Workspace product language; GitHub product runtime must use Repository, Repositories, Repository management, or a precise technical owner name.`,
      );
    }
  }

  for (const file of files) {
    const normalized = relative(root, file).replaceAll("\\", "/");
    if (!/\/domain\/[^/]+\//u.test(normalized)) continue;
    const content = readFileSync(file, "utf8");
    for (const input of ambientDomainInputs) {
      if (input.pattern.test(content)) {
        errors.push(
          `${normalized} reads ${input.label}; Domain runtime inputs must be supplied through explicit values or Application-owned Ports.`,
        );
      }
    }
  }

  return errors;
}
