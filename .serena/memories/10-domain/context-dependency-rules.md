# Context Dependency Rules

## Purpose

Guide dependency and reference analysis across bounded contexts.

## Summary

Cross-context interaction uses explicit public contracts, ports, events, or published language. Application may orchestrate contexts but does not absorb another context's domain ownership.

## Rules

- Flag direct imports into another context's domain, application, or infrastructure internals.
- Prefer a contract, port, facade, adapter, or anti-corruption layer to direct technical coupling.
- A shared-looking type or file path is not a Shared Kernel. Require explicit owner and approval before sharing a model.

## Source Locations

- `packages/`
- `apps/web/src/modules/`

## Related Documents

- `docs/architecture/dependency-rules.md`
- `docs/contracts/README.md`

## Related Memories

- `mem:30-architecture/dependency-direction`
- `mem:40-engineering/import-export-policy`

## Last Verified

- Date: 2026-07-12
- Evidence: cross-context checker, Context Map and contract policy.
