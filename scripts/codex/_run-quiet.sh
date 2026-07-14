#!/usr/bin/env bash

set -u

if (( $# < 2 )); then
  printf 'Usage: %s <log-name> <command> [args...]\n' "$0" >&2
  exit 64
fi

log_name=$1
shift

repo_root=$(git rev-parse --show-toplevel 2>/dev/null) || {
  printf 'Unable to locate the Git repository root.\n' >&2
  exit 1
}

log_dir="$repo_root/.codex/logs"
mkdir -p "$log_dir"

timestamp=$(date -u +'%Y%m%dT%H%M%SZ')
log_file="$log_dir/${timestamp}-${log_name}.log"

set +e
(cd "$repo_root" && "$@") >"$log_file" 2>&1
status=$?
set -e

if (( status == 0 )); then
  printf 'PASS %s (full log: %s)\n' "$log_name" "$log_file"
  exit 0
fi

printf 'FAIL %s (exit %d; full log: %s)\n' "$log_name" "$status" "$log_file" >&2
printf '%s\n' '--- last 160 log lines ---' >&2
tail -n 160 "$log_file" >&2
exit "$status"
