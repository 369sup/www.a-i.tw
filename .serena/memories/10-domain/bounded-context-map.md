# Bounded Context Map

## Purpose

Route analysis to the correct bounded-context definition before inspecting symbols.

## Summary

Identity & Access, Account, Repository and Issues are approved app-local runtime Contexts owned by the www.a-i.tw Product Team. Issues is downstream of Identity & Access and Repository through published contracts and its own ACL. Master Template is an Architecture Team reference Context with declared internal Sub Template.

## Rules

- Do not treat a name match as proof that symbols share an owner.
- Cross-context consumers use provider contracts and consumer-owned ACLs.
- Do not create or move a Domain model until ownership and public interaction are explicit.
- Internal subdomains require manifest declaration and the standard path.
- Canonical Context Map manifests and runtime override this navigation memory.

## Source Locations

- `docs/domains/context-map.json`
- `apps/web/src/modules/*/context.json`

## Related Documents

- `docs/domains/context-map.md`
- `docs/domains/bounded-context-catalog.md`
- `docs/status/2026-07-12-work-management-30-concern-closure.md`

## Related Memories

- `mem:10-domain/ownership-map`
- `mem:10-domain/context-dependency-rules`
- `mem:20-contexts/work-management`

## Last Verified

- Date: 2026-07-12
- Evidence: manifest equality, module tree, cross-context checks and architecture gates.
