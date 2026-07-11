#!/usr/bin/env bash
set -euo pipefail

mode="${1:-changed}"

run() {
  printf '\n==> %s\n' "$*"
  "$@"
}

verify_diff() {
  run git diff --check
}

verify_docs() {
  run pnpm docs:check
}

verify_runtime() {
  run pnpm check
  verify_docs
  run pnpm arch:check
  run pnpm build
  run pnpm test:e2e
  run pnpm semgrep
}

case "$mode" in
  changed)
    verify_diff
    run pnpm check
    ;;
  docs)
    verify_diff
    verify_docs
    ;;
  runtime)
    verify_diff
    verify_runtime
    ;;
  release)
    verify_diff
    verify_runtime
    run pnpm release:check
    ;;
  *)
    printf 'Usage: %s {changed|docs|runtime|release}\n' "$0" >&2
    exit 64
    ;;
esac

printf '\nVerification mode "%s" passed.\n' "$mode"
