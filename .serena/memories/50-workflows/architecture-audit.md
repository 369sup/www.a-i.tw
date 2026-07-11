# Architecture Audit Workflow

## Purpose

Provide a repeatable semantic-analysis sequence for bounded-context audits.

## Summary

Read ownership and dependency memories, map public symbols, analyze references and implementations, then classify only evidence-backed findings before proposing a minimal fix.

## Rules

- Report symbol, declaration, references, owner, consumer, risk, remedy, and validation.
- Do not equate file location or same names with ownership.

## Source Locations

- `modules/`
- `apps/web/`

## Related Documents

- `docs/architecture/dependency-rules.md`
- `docs/domains/context-map.md`

## Related Memories

- `mem:10-domain/ownership-map`
- `mem:30-architecture/dependency-direction`

## Last Verified

- Date: 2026-07-11
- Evidence: Serena semantic workflow policy.
