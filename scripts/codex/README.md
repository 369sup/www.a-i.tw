# Codex commands

These commands keep routine monorepo output out of the Codex conversation. Run them from Git Bash at the repository
root.

## Development

Development servers are interactive and should not be wrapped:

```bash
pnpm dev
pnpm start
```

## Turbo tasks

Turbo already supports error-only task logs, so use it directly:

```bash
pnpm exec turbo run lint --output-logs=errors-only
pnpm exec turbo run typecheck --output-logs=errors-only
pnpm exec turbo run build --output-logs=errors-only
pnpm exec turbo run test:coverage --output-logs=errors-only
```

## Quiet wrappers

Composite or non-Turbo commands capture complete stdout and stderr in `.codex/logs/`. A passing command prints one
summary line. A failing command prints only the final 160 lines and the complete log path.

```bash
./scripts/codex/check.sh
./scripts/codex/test.sh
./scripts/codex/semgrep.sh
```

`check.sh` preserves the root `pnpm check` behavior: Prettier check, then Turbo `check` and `test`. Use `test.sh` when
only the workspace test graph is needed. Use `semgrep.sh` for the repository security rules.

## Proportional verification

Commands without dedicated wrappers should be captured through the shared quiet runner:

```bash
./scripts/codex/_run-quiet.sh docs pnpm docs:check
./scripts/codex/_run-quiet.sh architecture pnpm arch:check
./scripts/codex/_run-quiet.sh e2e pnpm test:e2e
./scripts/codex/_run-quiet.sh release pnpm task:verify:all
```

Do not use a quiet wrapper for a persistent development server. Do not report a check as passed without the wrapper's
zero exit status.
