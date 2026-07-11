#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "This wrapper must run inside WSL Ubuntu." >&2
  exit 1
fi

# Codex Desktop exports a Windows CODEX_HOME into WSL.  Its Windows-style
# marketplace paths cannot be resolved by the Linux Codex CLI, so isolate
# Linux CLI/plugin state in ~/.codex instead.
exec env -u CODEX_HOME codex "$@"
