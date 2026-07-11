import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, relative, resolve } from "node:path";

const roots = [
  ".agents",
  ".codex",
  ".github",
  ".semgrep",
  ".serena",
  "docs",
  "plugins",
  "scripts",
];
const documentExtensions = new Set([
  ".md",
  ".mdx",
  ".html",
  ".htm",
  ".rst",
  ".txt",
]);
const ignoredDirectories = new Set([".git", "cache", "logs", "node_modules"]);

function collectDocuments(directory, files = []) {
  if (!existsSync(directory)) return files;

  for (const entry of readdirSync(directory)) {
    if (ignoredDirectories.has(entry)) continue;

    const file = join(directory, entry);
    if (statSync(file).isDirectory()) {
      collectDocuments(file, files);
    } else if (documentExtensions.has(extname(file))) {
      files.push(file);
    }
  }

  return files;
}

function stripFencedCode(content) {
  return content.replace(/^```[\s\S]*?^```\s*$/gm, "");
}

function resolveDocumentLink(source, target) {
  const targetWithoutFragment = decodeURIComponent(target.split("#", 1)[0]);

  if (targetWithoutFragment.startsWith("/docs/")) {
    return resolve(
      "apps/web/content/docs",
      targetWithoutFragment.slice("/docs/".length),
    );
  }

  return resolve(source, "..", targetWithoutFragment);
}

function existingDocument(path) {
  const candidates = [
    path,
    `${path}.md`,
    `${path}.mdx`,
    join(path, "README.md"),
    join(path, "index.md"),
    join(path, "index.mdx"),
  ];

  return candidates.find(existsSync);
}

const failures = [];

for (const file of roots.flatMap((root) => collectDocuments(root))) {
  const content = stripFencedCode(readFileSync(file, "utf8"));
  const linkPattern = /!?\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g;

  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].replace(/^<|>$/g, "");
    if (!target.startsWith(".") && !target.startsWith("/docs/")) continue;

    const resolved = existingDocument(resolveDocumentLink(file, target));
    if (resolved) continue;

    const line = content.slice(0, match.index).split("\n").length;
    failures.push(`${file}:${line} → ${target}`);
  }

  const documentedPathPattern =
    /`(docs\/[A-Za-z0-9_./-]+(?:\.md|\.mdx|\.json|\/))`/g;
  for (const match of content.matchAll(documentedPathPattern)) {
    const documentedPath = normalize(match[1].replace(/\/$/, ""));
    if (existsSync(documentedPath)) continue;

    const line = content.slice(0, match.index).split("\n").length;
    failures.push(`${file}:${line} → ${match[1]}`);
  }
}

if (failures.length > 0) {
  console.error(`Broken documentation links:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("Documentation link checks passed.");
