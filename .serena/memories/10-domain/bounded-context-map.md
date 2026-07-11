# Bounded Context Map

## Purpose

Route analysis to the correct bounded-context definition before inspecting symbols.

## Summary

Identity & Access, Account, and Repository are strategic candidate contexts, not declared runtime modules. Experience owns presentation and Platform owns operations. A runtime context needs an approved owner, use case, contract, ADR, and evidence.

## Rules

- Do not treat a name match as proof that two symbols share an owner.
- Do not create or move a domain model until ownership and public interaction are explicit.

## Source Locations

- `docs/domains/`
- `docs/maps/context-map.json`

## Related Documents

- `docs/maps/domain-context-map.md`
- `docs/domains/bounded-contexts.md`

## Related Memories

- `mem:10-domain/ownership-map`
- `mem:10-domain/context-dependency-rules`

## Last Verified

- Date: 2026-07-11
- Evidence: strategic domain context map.
