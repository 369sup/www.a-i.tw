# Bounded Context Map

## Purpose

Route analysis to the correct bounded-context definition before inspecting symbols.

## Summary

Identity & Access, Account, and Repository are approved app-local runtime Contexts owned by the www.a-i.tw Product Team. Master Template is an Architecture Team reference Context with a declared internal `sub-template` supporting subdomain. Experience owns presentation and Platform owns operations.

## Rules

- Do not treat a name match as proof that two symbols share an owner.
- Do not create or move a domain model until ownership and public interaction are explicit.
- Internal subdomains require a manifest declaration and `src/subdomains/<name>` structure.

## Source Locations

- `docs/domains/`
- `docs/domains/context-map.json`

## Related Documents

- `docs/domains/context-map.md`
- `docs/domains/bounded-contexts.md`

## Related Memories

- `mem:10-domain/ownership-map`
- `mem:10-domain/context-dependency-rules`

## Last Verified

- Date: 2026-07-12
- Evidence: runtime Context Map, manifests, module tree and architecture gates.
