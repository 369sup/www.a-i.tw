# Dependency Direction

## Purpose

Provide the dependency invariant for semantic architecture review.

## Summary

The intended direction is `UI / Infrastructure -> Application -> Domain`. Domain is framework and provider independent; Application owns use cases and Ports; Infrastructure implements outbound Ports; UI and delivery code must not depend directly on Infrastructure implementation. Only server-side composition roots wire concrete adapters.

## Rules

- Inspect references and implementations before concluding a dependency is legal.
- Classify findings by owner, consumer, dependency type, risk, and verification method.
- Treat routes, Server Actions, jobs, and test harnesses as inbound adapters. Verify that application-core tests can use fake or in-memory outbound adapters.

## Source Locations

- `modules/`
- `apps/web/`
- `apps/web/src/modules/`
- `.dependency-cruiser.cjs`

## Related Documents

- `docs/architecture/dependency-rules.md`

## Related Memories

- `mem:10-domain/context-dependency-rules`
- `mem:50-workflows/architecture-audit`

## Last Verified

- Date: 2026-07-11
- Evidence: dependency-cruiser, Semgrep, and architecture gates.
