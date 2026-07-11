#!/usr/bin/env bash
set -euo pipefail
printf 'Node: '; node --version
printf 'pnpm: '; pnpm --version
printf 'Codex: '; codex --version
printf '\nRepository status:\n'
"$(dirname "$0")/status.sh"
printf '\nConfigured project MCP servers:\n'
sed -nE 's/^\[mcp_servers\.([^].]+)\]$/- \1/p' .codex/config.toml
printf '\nProject MCP configuration:\n'
if git ls-files --error-unmatch .codex/config.toml >/dev/null 2>&1; then
  printf '%s\n' '- .codex/config.toml is version-controlled; credentials must remain in the user environment.'
else
  printf '%s\n' '- .codex/config.toml is not version-controlled.'
fi
