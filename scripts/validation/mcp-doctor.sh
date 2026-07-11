#!/usr/bin/env bash
set -euo pipefail

readonly config_path=".codex/config.toml"
readonly repository_root="/home/sup/code/www.a-i.tw"

require_command() {
  local command_name="$1"
  if ! command -v "$command_name" >/dev/null 2>&1; then
    printf 'Missing required command: %s\n' "$command_name" >&2
    exit 1
  fi
}

require_command node
require_command npx
require_command uvx
require_command serena
require_command curl

test -f "$config_path"
test -d "$repository_root"

node - <<'NODE'
const { readFileSync } = require("node:fs");

const config = readFileSync(".codex/config.toml", "utf8");
const requiredServers = ["filesystem", "git", "serena"];

for (const server of requiredServers) {
  const section = `[mcp_servers.${server}]`;
  if (!config.includes(`${section}\nenabled = true`)) {
    throw new Error(`${server} MCP must be enabled in .codex/config.toml`);
  }
}

console.log("Required MCP servers are enabled.");
NODE

serena --help >/dev/null

check_endpoint() {
  local endpoint="$1"
  local accepted_codes="$2"
  local status

  status="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 20 "$endpoint")"
  if [[ " $accepted_codes " != *" $status "* ]]; then
    printf 'Unexpected MCP endpoint status for %s: %s\n' "$endpoint" "$status" >&2
    exit 1
  fi
  printf 'MCP endpoint reachable: %s (%s)\n' "$endpoint" "$status"
}

# OAuth and MCP transport endpoints commonly reject a browser-style GET while
# still proving that DNS, TLS, and the endpoint route are available.
check_endpoint "https://mcp.vercel.com" "401 405"
check_endpoint "https://ui.shadcn.com/mcp" "200 401 405"
check_endpoint "https://developers.openai.com/mcp" "200 401 405"

printf 'MCP runtime prerequisites are healthy. Reopen the Codex task after config changes.\n'
