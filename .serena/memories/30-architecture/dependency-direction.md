# Dependency Direction

## Purpose

Provide the dependency invariant for semantic architecture review.

## Summary

The intended direction is `UI / Infrastructure -> Application -> Domain`. Domain is framework and provider independent; infrastructure implements application ports; UI must not depend directly on infrastructure implementation.

## Rules

- Inspect references and implementations before concluding a dependency is legal.
- Classify findings by owner, consumer, dependency type, risk, and verification method.

## Source Locations

- `modules/`
- `apps/web/`
- `.dependency-cruiser.cjs`

## Related Documents

- `docs/04-architecture/dependency-rules.md`

## Related Memories

- `mem:10-domain/context-dependency-rules`
- `mem:50-workflows/architecture-audit`

## Last Verified

- Date: 2026-07-11
- Evidence: enforced scaffold dependency rules.
