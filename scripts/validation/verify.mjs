import { spawnSync } from "node:child_process";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../..");
const mode = process.argv[2] ?? "changed";
const validModes = new Set(["changed", "docs", "runtime", "release"]);

if (!validModes.has(mode)) {
  console.error(
    "Usage: node scripts/validation/verify.mjs {changed|docs|runtime|release}",
  );
  process.exit(64);
}

function run(command, args) {
  console.log(`\n==> ${command} ${args.join(" ")}`);

  const result =
    process.platform === "win32" && command === "pnpm"
      ? spawnSync(
          process.env.ComSpec ?? "cmd.exe",
          ["/d", "/s", "/c", command, ...args],
          {
            cwd: repoRoot,
            stdio: "inherit",
            windowsHide: true,
          },
        )
      : spawnSync(command, args, { cwd: repoRoot, stdio: "inherit" });

  if (result.error) {
    console.error(`Unable to start ${command}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) process.exit(result.status ?? 1);
}

function verifyDiff() {
  run("git", ["diff", "--check"]);
}

function verifyDocs() {
  run("pnpm", ["docs:check"]);
}

function verifyRuntime() {
  run("pnpm", ["check"]);
  verifyDocs();
  run("pnpm", ["arch:check"]);
  run("pnpm", ["build"]);
  run("pnpm", ["test:e2e"]);
  run("pnpm", ["semgrep"]);
}

if (mode === "changed") {
  verifyDiff();
  run("pnpm", ["check"]);
} else if (mode === "docs") {
  verifyDiff();
  verifyDocs();
} else {
  verifyDiff();
  verifyRuntime();
  if (mode === "release") run("pnpm", ["release:check"]);
}

console.log(`\nVerification mode "${mode}" passed.`);
