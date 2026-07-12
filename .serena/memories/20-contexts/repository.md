# Repository Context

## Purpose

Route analysis of Repository visibility, lifecycle, grants, roles, participation decisions and capability-context integration.

## Summary

Repository is a verified core Context. It owns Repository identity, owner reference, visibility, lifecycle, Access Grant, Repository Role and effective-access/participation decisions. The Repository Capability Context resolver is downstream Experience orchestration: it maps a local capability key to a canonical action, but always delegates allow/deny to Repository.

## Rules

- Repository consumes Account facts through its Application-owned ACL.
- Account facts never carry Repository roles.
- Experience imports no Repository contracts directly; server composition translates to consumer-owned views.
- Capability descriptors cannot grant access or cache decisions.
- Active-scope mismatch fails before authorization.
- Other Contexts require explicit contracts and consumer-owned ACLs.
- Formal docs, manifests, runtime symbols and tests override this memory.

## Source Locations

- `apps/web/src/modules/repository/`
- `apps/web/src/presentation/request-context/repository-capability-context.ts`
- `apps/web/src/server/composition/repository-capability-context.ts`

## Related Documents

- `docs/domains/repository.md`
- `docs/application/request-context-resolution.md`
- `docs/decisions/0007-request-context-orchestration.md`

## Last Verified

- Date: 2026-07-12
- Evidence: resolver tests, architecture dependency cruise, production build and browser inspector flow.
