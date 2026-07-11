# Safe Refactoring Workflow

## Purpose

Guide evidence-based symbol refactors without hiding ownership or API changes.

## Summary

Confirm one target, declaration, references, implementations, owner, public surface, and tests before changing a symbol. Use semantic rename and symbol edits rather than broad textual replacement.

## Rules

- Check contracts, barrel exports, DTOs, adapters, composition roots, mocks, and documentation.
- Do not introduce import aliases to conceal a collision.

## Source Locations

- `packages/`
- `apps/web/src/modules/`

## Related Documents

- `docs/architecture/dependency-rules.md`
- `docs/contracts/README.md`

## Related Memories

- `mem:40-engineering/import-export-policy`
- `mem:40-engineering/verification-workflow`

## Last Verified

- Date: 2026-07-12
- Evidence: Serena usage policy and app-local topology.
