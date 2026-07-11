import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const modules = existsSync("modules")
  ? readdirSync("modules", { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];
const modulePackages = new Set(modules.map((name) => `@a-i/${name}`));

function packageJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function dependencies(pkg) {
  return {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
    ...pkg.optionalDependencies,
  };
}

for (const directory of ["apps", "modules", "packages", "tests"]) {
  if (!existsSync(directory)) continue;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(directory, entry.name, "package.json");
    if (!existsSync(path)) continue;
    const pkg = packageJson(path);
    const deps = dependencies(pkg);

    for (const [name, version] of Object.entries(deps)) {
      if (name.startsWith("@a-i/") && version !== "workspace:*") {
        errors.push(`${pkg.name} must use workspace:* for ${name}.`);
      }
      if (directory === "packages" && modulePackages.has(name)) {
        errors.push(
          `${pkg.name} is a technical package and cannot depend on business context ${name}.`,
        );
      }
      if (directory === "modules" && name === "@a-i/web") {
        errors.push(`${pkg.name} cannot depend on a deployable application.`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Workspace dependency declarations respect package ownership.");
