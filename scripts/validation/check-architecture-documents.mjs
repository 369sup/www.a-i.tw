import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";

const registryPath = "docs/architecture/architecture-governance.json";
const catalogPath = "docs/architecture-document-catalog.md";
const allowedLifecycle = new Set([
  "accepted",
  "baseline",
  "current",
  "proposed",
  "none-approved",
]);
const errors = [];

if (!existsSync(registryPath)) {
  console.error(`Missing architecture governance registry: ${registryPath}`);
  process.exit(1);
}

const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const concerns = registry.concerns ?? [];
if (concerns.length !== 30) {
  errors.push(
    `Architecture governance must contain exactly 30 concerns; found ${concerns.length}.`,
  );
}
const ids = new Set();
const paths = new Set();
const catalog = readFileSync(catalogPath, "utf8");
for (const entry of concerns) {
  if (ids.has(entry.id))
    errors.push(`Duplicate architecture concern id: ${entry.id}.`);
  if (paths.has(entry.path))
    errors.push(`Duplicate canonical architecture path: ${entry.path}.`);
  ids.add(entry.id);
  paths.add(entry.path);
  if (!entry.owner?.trim()) errors.push(`Concern ${entry.id} has no owner.`);
  if (!allowedLifecycle.has(entry.lifecycle)) {
    errors.push(
      `Concern ${entry.id} has invalid lifecycle: ${entry.lifecycle}.`,
    );
  }
  if (!existsSync(entry.path)) {
    errors.push(`Concern ${entry.id} path is missing: ${entry.path}.`);
  } else if (statSync(entry.path).isFile()) {
    const document = readFileSync(entry.path, "utf8");
    const status = document
      .split("\n")
      .slice(0, 12)
      .find((line) => line.toLowerCase().includes("狀態"));
    const expected =
      entry.lifecycle === "none-approved" ? "none approved" : entry.lifecycle;
    if (!status || !status.toLowerCase().replace("-", " ").includes(expected)) {
      errors.push(
        `Concern ${entry.id} lifecycle ${entry.lifecycle} does not match document status: ${entry.path}.`,
      );
    }
  }
  if (!catalog.includes(entry.path.replace("docs/", ""))) {
    errors.push(
      `Concern ${entry.id} is missing from architecture-document-catalog.md.`,
    );
  }
}
for (let id = 1; id <= 30; id += 1) {
  if (!ids.has(id)) errors.push(`Architecture concern id is missing: ${id}.`);
}
if (!existsSync(registry.standard)) {
  errors.push(
    `Canonical architecture standard is missing: ${registry.standard}.`,
  );
}

const adrIds = new Set();
for (const file of readdirSync("docs/decisions")) {
  const filenameMatch = /^(\d{4})-.+\.md$/u.exec(file);
  if (!filenameMatch) continue;
  const document = readFileSync(`docs/decisions/${file}`, "utf8");
  const headingMatch = /^# ADR (\d{4}):/mu.exec(document);
  if (!headingMatch) {
    errors.push(`ADR file has no matching title: docs/decisions/${file}.`);
    continue;
  }
  if (filenameMatch[1] !== headingMatch[1]) {
    errors.push(
      `ADR filename and title differ: docs/decisions/${file} uses ADR ${headingMatch[1]}.`,
    );
  }
  if (adrIds.has(headingMatch[1])) {
    errors.push(`Duplicate ADR id: ${headingMatch[1]}.`);
  }
  adrIds.add(headingMatch[1]);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "All 30 architecture concerns have one canonical owner and document.",
);
