import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, values) => {
    if (value.startsWith("--")) pairs.push([value.slice(2), values[index + 1]]);
    return pairs;
  }, []),
);
const required = ["context", "subdomain", "type"];
const missing = required.filter((key) => !args[key]);
if (missing.length > 0)
  throw new Error(`Missing required options: ${missing.join(", ")}.`);
if (!/^[a-z][a-z0-9-]*$/.test(args.context))
  throw new Error("--context must be kebab-case.");
if (!/^[a-z][a-z0-9-]*$/.test(args.subdomain))
  throw new Error("--subdomain must be kebab-case.");
if (!["core", "supporting", "generic"].includes(args.type))
  throw new Error("--type must be core, supporting, or generic.");

const contextRoot = join(root, "apps/web/src/modules", args.context);
const manifestPath = join(contextRoot, "context.json");
if (!existsSync(manifestPath))
  throw new Error(`Context does not exist: ${args.context}.`);
const subdomainRoot = join(contextRoot, "src/subdomains", args.subdomain);
if (existsSync(subdomainRoot))
  throw new Error(`Internal subdomain already exists: ${args.subdomain}.`);

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const internalSubdomains = manifest.internalSubdomains ?? [];
if (internalSubdomains.some((entry) => entry.name === args.subdomain))
  throw new Error(`Internal subdomain is already declared: ${args.subdomain}.`);

const templateRoot = join(
  root,
  ".agents/skills/scaffold-bounded-context/assets/internal-subdomain-template",
);
cpSync(templateRoot, subdomainRoot, { recursive: true });
for (const relativePath of [
  "README.md",
  "application/README.md",
  "domain/README.md",
  "infrastructure/README.md",
]) {
  const path = join(subdomainRoot, relativePath);
  const content = readFileSync(path, "utf8")
    .replaceAll("{{context}}", args.context)
    .replaceAll("{{subdomain}}", args.subdomain)
    .replaceAll("{{type}}", args.type);
  writeFileSync(path, content);
}
writeFileSync(
  join(subdomainRoot, "composition.ts"),
  "// Export a composition factory only after the first approved use case defines its Ports.\nexport {};\n",
);

manifest.internalSubdomains = [
  ...internalSubdomains,
  { name: args.subdomain, type: args.type },
];
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const mapPath = join(root, "docs/domains/context-map.json");
const map = JSON.parse(readFileSync(mapPath, "utf8"));
const index = map.contexts.findIndex((entry) => entry.context === args.context);
if (index < 0) throw new Error(`Context Map entry is missing: ${args.context}.`);
map.contexts[index] = manifest;
writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`);

console.log(
  `Created internal ${args.type} subdomain ${args.context}/${args.subdomain}. Define its first use case, then run pnpm arch:check.`,
);
