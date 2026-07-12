import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const template = join(root, ".agents/skills/scaffold-bounded-context/assets/bounded-context-template-v2");
const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, values) => {
    if (value.startsWith("--")) pairs.push([value.slice(2), values[index + 1]]);
    return pairs;
  }, []),
);
const required = [
  "context",
  "domain",
  "subdomain",
  "type",
  "owner",
  "problem",
  "first-use-case",
  "source-of-truth",
];
const missing = required.filter((key) => !args[key]);

if (missing.length > 0) throw new Error(`Missing required options: ${missing.join(", ")}.`);
if (!/^[a-z][a-z0-9-]*$/.test(args.context)) throw new Error("--context must be kebab-case.");
if (!/^[a-z][a-z0-9-]*$/.test(args.subdomain)) throw new Error("--subdomain must be kebab-case.");
if (!["core", "supporting", "generic"].includes(args.type)) {
  throw new Error("--type must be core, supporting, or generic.");
}

const destination = join(root, "apps/web/src/modules", args.context);
if (existsSync(destination)) throw new Error(`Context already exists: ${args.context}.`);

cpSync(template, destination, { recursive: true });
const sourceOfTruth = args["source-of-truth"]
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
if (sourceOfTruth.length === 0)
  throw new Error("--source-of-truth requires at least one model name.");

function replacePlaceholders(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) replacePlaceholders(path);
    else {
      const content = readFileSync(path, "utf8")
        .replaceAll("__CONTEXT__", args.context)
        .replaceAll("__DOMAIN__", args.domain)
        .replaceAll("__SUBDOMAIN__", args.subdomain)
        .replaceAll("__TYPE__", args.type)
        .replaceAll("__OWNER__", args.owner);
      const enriched = content
        .replaceAll("__PROBLEM__", args.problem)
        .replaceAll("__FIRST_USE_CASE__", args["first-use-case"])
        .replaceAll("__SOURCE_OF_TRUTH__", JSON.stringify(sourceOfTruth))
        .replaceAll("__VERIFIED_AT__", new Date().toISOString().slice(0, 10));
      writeFileSync(path, enriched);
    }
  }
}

replacePlaceholders(destination);
for (const layer of ["domain", "application", "contracts", "infrastructure", "presentation"]) {
  const path = join(destination, layer, args.subdomain);
  mkdirSync(path, { recursive: true });
  writeFileSync(join(path, "README.md"), `# ${args.domain}: ${args.subdomain} ${layer}\n\nCreate tactical folders only for approved semantics.\n`);
}
mkdirSync(join(destination, "application", args.subdomain, "ports", "inbound"), { recursive: true });
mkdirSync(join(destination, "application", args.subdomain, "ports", "outbound"), { recursive: true });

const mapPath = join(root, "docs/domains/context-map.json");
const map = JSON.parse(readFileSync(mapPath, "utf8"));
const manifest = JSON.parse(readFileSync(join(destination, "context.json"), "utf8"));
map.contexts.push(manifest);
writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`);

console.log(`Created target-topology Context ${args.context}. Define its first use case, then run pnpm arch:target.`);
