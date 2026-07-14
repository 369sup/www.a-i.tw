import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../..");
const semgrepHome = path.join(tmpdir(), "www-ai-semgrep-home");
mkdirSync(semgrepHome, { recursive: true });

const env = { ...process.env, HOME: semgrepHome };
delete env.HTTP_PROXY;
delete env.HTTPS_PROXY;
delete env.ALL_PROXY;

const semgrepArgs = [
  "scan",
  "--config",
  ".semgrep/ci.yml",
  "--config",
  ".semgrep/architecture.yml",
  "--exclude",
  ".next",
  "--exclude",
  ".source",
  "--exclude",
  ".turbo",
  "--exclude",
  "coverage",
  "--exclude",
  "node_modules",
  "--no-git-ignore",
  "--x-ignore-semgrepignore-files",
  "--error",
  "--metrics=off",
  "apps",
  "packages",
  "scripts",
];

function commandExists(command) {
  if (process.platform === "win32") {
    return (
      spawnSync("where.exe", [command], { stdio: "ignore", windowsHide: true })
        .status === 0
    );
  }

  return !spawnSync(command, ["--version"], { stdio: "ignore" }).error;
}

function run(command, args) {
  const result =
    process.platform === "win32"
      ? spawnSync(
          process.env.ComSpec ?? "cmd.exe",
          ["/d", "/s", "/c", command, ...args],
          {
            cwd: repoRoot,
            env,
            stdio: "inherit",
            windowsHide: true,
          },
        )
      : spawnSync(command, args, { cwd: repoRoot, env, stdio: "inherit" });

  if (result.error) {
    console.error(`Unable to start ${command}: ${result.error.message}`);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

if (commandExists("semgrep")) {
  run("semgrep", semgrepArgs);
}

if (commandExists("uvx")) {
  console.error(
    "Semgrep executable not found; running the isolated uvx package.",
  );
  run("uvx", ["--from", "semgrep", "semgrep", ...semgrepArgs]);
}

console.error(
  "Semgrep is required. Install semgrep or uv, then rerun pnpm semgrep.",
);
process.exit(127);
