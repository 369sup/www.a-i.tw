# Import and Export Policy

## Purpose

Guide semantic checks for imports, public surfaces, and naming conflicts.

## Summary

App-local `src/contracts/public.ts` files define supported cross-context consumption. Context public and composition entrypoints are app-internal; import aliases must not conceal a naming or ownership conflict.

## Rules

- Inspect barrel exports, re-exports, DTOs, contracts, adapters, composition roots, and tests before a rename.
- Do not use import aliases as a semantic refactor shortcut.

## Source Locations

- `package.json`
- `apps/web/src/modules/`
- `packages/`

## Related Documents

- `docs/contracts/README.md`
- `docs/architecture/dependency-rules.md`

## Related Memories

- `mem:50-workflows/safe-refactoring`
- `mem:30-architecture/shared-kernel-policy`

## Last Verified

- Date: 2026-07-12
- Evidence: app-local public-entrypoint and cross-context import checks.
