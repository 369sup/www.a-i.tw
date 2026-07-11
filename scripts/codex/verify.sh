#!/usr/bin/env bash
set -euo pipefail
mode="${1:-changed}"
case "$mode" in
  changed) git diff --check; pnpm check ;;
  runtime) git diff --check; pnpm check; pnpm arch:check; pnpm build; pnpm semgrep ;;
  docs) git diff --check; pnpm docs:check; pnpm release:check ;;
  release) git diff --check; pnpm check; pnpm docs:check; pnpm release:check; pnpm arch:check; pnpm build; pnpm semgrep ;;
  *) printf 'Usage: %s {changed|runtime|docs|release}\n' "$0" >&2; exit 64 ;;
esac
