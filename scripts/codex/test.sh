#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)

"$script_dir/_run-quiet.sh" test \
  pnpm exec turbo run test --output-logs=errors-only
