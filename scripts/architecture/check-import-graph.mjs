import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = process.cwd();
const runs = [
  [
    "--config",
    ".dependency-cruiser.cjs",
    "--ts-config",
    resolve(root, "apps/web/tsconfig.json"),
    "--output-type",
    "err",
    "apps",
  ],
  [
    "--config",
    ".dependency-cruiser.cjs",
    "--ts-config",
    resolve(root, "packages/ui/tsconfig.json"),
    "--output-type",
    "err",
    "packages/ui",
  ],
  [
    "--config",
    ".dependency-cruiser.cjs",
    "--output-type",
    "err",
    "packages/eslint-config",
    "packages/testing-kit",
    "packages/typescript-config",
  ],
];

for (const args of runs) {
  const command = process.env.npm_execpath ? process.execPath : "pnpm";
  const commandArgs = process.env.npm_execpath
    ? [process.env.npm_execpath, "exec", "depcruise", ...args]
    : ["exec", "depcruise", ...args];
  const result = spawnSync(command, commandArgs, {
    cwd: root,
    encoding: "utf8",
    shell: false,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
