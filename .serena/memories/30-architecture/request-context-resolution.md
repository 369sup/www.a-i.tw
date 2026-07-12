# Distributed Request Context Resolution

## Purpose

Route analysis of Request Envelope, capability-owned context resolvers and resource-owner authorization decisions.

## Summary

There is no universal RequestContextService. Experience owns a minimal RequestEnvelopeV1 protocol containing viewer, actor, safe credential metadata, correlation and active scope. Each capability family owns a typed resolver and fragment. The verified first resolver is RepositoryCapabilityContextV1, which adds owner, optional Organization, Repository, local capability descriptor, requested action and a Repository-owned participation decision.

## Boundary Rules

- Experience presentation owns consumer-shaped ACL views and imports no provider module contracts.
- Only server composition translates Identity, Account and Repository facades into Experience Ports.
- Capability descriptors map keys to canonical actions but never grant access.
- Repository remains the decision owner for Repository actions.
- Context fragments are immutable, request-scoped read models, not persisted authority or authorization caches.
- A context field exists only when the current capability needs it, its source owner has approved it, and unavailable or stale behavior is defined.
- Unapproved Enterprise, Policy and Entitlement facts are omitted; they are not represented by speculative optional or empty placeholders.
- The shared envelope excludes resource graphs, Membership collections, roles, permissions, policies, entitlements, raw credentials and cached authorization decisions.
- Unknown capability, missing resource/owner and active-scope mismatch fail closed.
- Discussion, Notification, Enterprise Administration and other capability families must define separate typed fragments; do not extend a giant optional DTO.
- Formal docs, runtime, architecture gates and tests override this memory.

## Source Locations

- `apps/web/src/presentation/request-context/repository-capability-context.ts`
- `apps/web/src/server/composition/repository-capability-context.ts`
- `apps/web/src/app/(console)/workspace/@inspector/page.tsx`

## Related Documents

- `docs/application/request-context-resolution.md`
- `docs/decisions/0007-request-context-orchestration.md`
- `docs/evidence/2026-07-12-repository-capability-context.md`
- `docs/status/2026-07-12-request-context-30-concern-closure.md`

## Last Verified

- Date: 2026-07-12
- Evidence: documentation ownership, architecture concern, link and workspace checks passed after the minimum-context clarification; runtime verification remains the previously recorded clean diagnostics, 20 web tests, 164-module architecture cruise, build, zero Semgrep findings and 4 E2E flows.
