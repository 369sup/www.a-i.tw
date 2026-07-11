#!/usr/bin/env bash
set -euo pipefail
printf 'Node: '; node --version
printf 'pnpm: '; pnpm --version
printf 'Codex: '
"$(dirname "$0")/wsl-codex.sh" --version
printf 'WSL Codex home: %s\n' "${CODEX_WSL_HOME:-$HOME/.codex}"
printf 'Inherited CODEX_HOME: %s\n' "${CODEX_HOME:-<unset>}"
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

printf '\nWSL plugin state:\n'
"$(dirname "$0")/wsl-codex.sh" plugin marketplace list
"$(dirname "$0")/wsl-codex.sh" plugin list

printf '\nSerena runtime:\n'
if command -v serena >/dev/null 2>&1; then
  printf 'Serena: '; serena --version
  printf 'Path: '; readlink -f "$(command -v serena)"
else
  printf '%s\n' '- Serena is not installed in this WSL environment.'
fi
