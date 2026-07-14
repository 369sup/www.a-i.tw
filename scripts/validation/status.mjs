import { spawnSync } from "node:child_process";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function git(args, { optional = false, stdio = "pipe" } = {}) {
  const result = spawnSync("git", args, {
    cwd: repoRoot,
    encoding: stdio === "pipe" ? "utf8" : undefined,
    stdio,
    windowsHide: true,
  });

  if (result.error) {
    console.error(`Unable to start git: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0 && !optional) {
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result.status === 0 ? (result.stdout?.trim() ?? "") : null;
}

git(["status", "--short"], { stdio: "inherit" });

const branch = git(["branch", "--show-current"]);
console.log(`Branch: ${branch}`);

const upstream = git(
  ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"],
  {
    optional: true,
  },
);
if (upstream) {
  const counts = git([
    "rev-list",
    "--left-right",
    "--count",
    `${upstream}...HEAD`,
  ]).split(/\s+/);
  console.log(
    `Upstream: ${upstream} (ahead ${counts[1]}, behind ${counts[0]})`,
  );
} else {
  console.log("Upstream: not configured");
}

const origin = git(["remote", "get-url", "origin"], { optional: true });
console.log(origin ? `Origin: ${origin}` : "Origin: not configured");

git(["log", "-5", "--oneline"], { stdio: "inherit" });
