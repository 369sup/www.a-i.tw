# Import and Export Policy

## Purpose

Guide semantic checks for imports, public surfaces, and naming conflicts.

## Summary

Public package exports and published contracts define supported cross-context consumption. Import aliases must not conceal a naming or ownership conflict.

## Rules

- Inspect barrel exports, re-exports, DTOs, contracts, adapters, composition roots, and tests before a rename.
- Do not use import aliases as a semantic refactor shortcut.

## Source Locations

- `package.json`
- `modules/`
- `packages/`

## Related Documents

- `docs/contracts/README.md`
- `docs/04-architecture/dependency-rules.md`

## Related Memories

- `mem:50-workflows/safe-refactoring`
- `mem:30-architecture/shared-kernel-policy`

## Last Verified

- Date: 2026-07-11
- Evidence: package export and architecture checks.
