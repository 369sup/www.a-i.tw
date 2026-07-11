#!/usr/bin/env bash
set -euo pipefail

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "This wrapper must run inside WSL Ubuntu." >&2
  exit 1
fi

# Codex Desktop exports a Windows CODEX_HOME into WSL. Its Windows-style
# marketplace paths cannot be resolved by the Linux Codex CLI, so direct WSL
# CLI use must always select a Linux-owned state directory.
linux_codex_home="${CODEX_WSL_HOME:-$HOME/.codex}"

if [[ "$linux_codex_home" != /* ]]; then
  echo "CODEX_WSL_HOME must be an absolute Linux path." >&2
  exit 2
fi

exec env CODEX_HOME="$linux_codex_home" codex "$@"
