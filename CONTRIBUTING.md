# Contributing

## Before opening a pull request

1. Keep the dependency direction `UI / Infrastructure -> Application -> Domain`.
2. Do not add business behaviour until its owner, bounded context, contract, and
   acceptance criteria are documented.
3. Run `pnpm run ci` locally. For a focused change, run the smallest relevant
   workspace checks first, then the full gate before requesting review.

## Pull request expectations

Describe the user or operational outcome, the affected ownership boundary, and
the verification evidence. Do not commit credentials, generated `.next` output,
or local `.codex/config.toml` settings.

## Dependency updates

Review Dependabot changes independently. Runtime-coupled packages such as
`react` and `react-dom` should be updated and verified together when their
release line requires matching versions.
