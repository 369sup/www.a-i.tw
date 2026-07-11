#!/usr/bin/env bash
set -euo pipefail

git status --short
branch="$(git branch --show-current)"
printf 'Branch: %s\n' "$branch"

if upstream="$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null)"; then
  read -r behind ahead < <(git rev-list --left-right --count "$upstream...HEAD")
  printf 'Upstream: %s (ahead %s, behind %s)\n' "$upstream" "$ahead" "$behind"
else
  printf 'Upstream: not configured\n'
fi

if origin="$(git remote get-url origin 2>/dev/null)"; then
  printf 'Origin: %s\n' "$origin"
else
  printf 'Origin: not configured\n'
fi

git log -5 --oneline
