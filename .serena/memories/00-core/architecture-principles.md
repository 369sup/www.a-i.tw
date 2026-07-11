# Architecture Principles

## Purpose

Summarize durable architectural constraints before symbol-level analysis.

## Summary

Domain owns business rules and does not depend on delivery frameworks, databases, or SDKs. Application orchestrates use cases through ports. Infrastructure implements ports. UI and route handlers are delivery adapters.

## Rules

- Cross-context interaction uses explicit contracts, ports, events, or consumer-owned adapters.
- Do not infer ownership solely from a file path or shared-looking name.

## Source Locations

- `modules/`
- `apps/web/`
- `packages/`

## Related Documents

- `docs/04-architecture/dependency-rules.md`
- `docs/04-architecture/ports-and-adapters.md`

## Related Memories

- `mem:30-architecture/dependency-direction`
- `mem:30-architecture/shared-kernel-policy`

## Last Verified

- Date: 2026-07-11
- Evidence: architecture dependency rules.
