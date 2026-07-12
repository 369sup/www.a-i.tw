# Distributed Request Context Resolution

## Purpose

Route analysis of Request Envelope, capability-owned context resolvers and resource-owner authorization decisions.

## Summary

There is no universal RequestContextService. Experience owns a minimal RequestEnvelopeV1 protocol containing viewer, actor, safe credential metadata, correlation and active scope. Actor/Scope protocol now lives in request-envelope.ts; each capability family owns a separate typed Resource/Action/Decision fragment. The verified RepositoryCapabilityContextV1 adds owner, optional Organization, Repository, local capability descriptor, requested action and a Repository-owned participation decision.

## Boundary Rules

- Experience presentation owns consumer-shaped ACL views and imports no provider module contracts.
- Only server composition translates Identity, Account and Repository facades into Experience Ports.
- Capability descriptors map keys to canonical actions but never grant access.
- Repository remains the decision owner for Repository actions.
- Context fragments are immutable, request-scoped read models, not persisted authority or authorization caches.
- A context field exists only when the current capability needs it, its source owner has approved it, and unavailable or stale behavior is defined.
- Unapproved Enterprise, Policy and Entitlement facts are omitted; they are not represented by speculative optional or empty placeholders.
- The shared envelope excludes resources, relationship graphs, Membership collections, roles, permissions, policies, entitlements, raw credentials and cached authorization decisions.
- Unknown capability, missing resource/owner and active-scope mismatch fail closed.
- Other capability families define separate typed fragments; do not extend a giant optional DTO.
- Formal docs, runtime, architecture gates and tests override this memory.

## Source Locations

- `apps/web/src/presentation/request-context/request-envelope.ts`
- `apps/web/src/presentation/request-context/repository-capability-context.ts`
- `apps/web/src/server/composition/repository-capability-context.ts`
- `apps/web/src/app/(console)/workspace/@inspector/page.tsx`

## Related Documents

- `docs/product/platform-world-model.md`
- `docs/application/request-context-resolution.md`
- `docs/decisions/0007-request-context-orchestration.md`
- `docs/evidence/2026-07-12-platform-world-model.md`

## Last Verified

- Date: 2026-07-12
- Evidence: diagnostics clean; 25 check tasks; docs and architecture gates; Next build; 0 Semgrep findings; 4 E2E flows.
