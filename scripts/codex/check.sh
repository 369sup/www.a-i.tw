#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)

"$script_dir/_run-quiet.sh" check \
  bash -c 'pnpm format:check && pnpm exec turbo run check test --output-logs=errors-only'
