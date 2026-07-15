# Current Work State
## Objective
Build substantive GitHub non-Code vertical slices from approved use cases, with Account/Profile provisioning now recoverable across Context boundaries.

## Scope
Canonical Use Case-first architecture documentation and the approved user-account first use case. No UI changes and no speculative Managed Account, suspension, event, or new contract semantics.

## Confirmed Decisions
- No fixed Value Object-first, Entity-first, Contract-first, or Adapter-first order.
- The canonical slice order starts with approved use case, acceptance/failure cases and invariants.
- PersonalAccount is the Aggregate Root for the approved first slice.
- UserAccountId, UserAccountHandle and PrincipalReference are required by the use case.
- PersonalAccount owns an internal provisioning -> active transition.
- Provisioning is never published through PersonalAccountRefV1 and is hidden from account queries.
- ProfileDirectory.save is idempotent by accountId; retry reuses the provisioning Account and its id.
- A retry must use the same canonical handle; different input is a provisioning conflict.
- Principal input is normalized before uniqueness lookup, preventing whitespace variants from bypassing one-account-per-principal.
- Existing seed Accounts reconstruct through createPersonalAccount then activatePersonalAccount.
- Profile remains owned by profile-presence; there is no cross-Context Aggregate or database transaction.
- Context7 Vitest v4.1.6 documentation was used as the closest documented version to installed v4.1.10 for rejected promises, fail-once mocks and call-count assertions.

## Completed
- Unified canonical development documentation around Use Case-first vertical slices.
- Documented user-account actor, input, result, failures, source of truth and consistency.
- Added UserAccountId, UserAccountHandle, PrincipalReference and specific errors.
- Added internal provisioning state, retry validation and one-way activation behavior.
- Updated User Account Application orchestration to persist provisioning, initialize Profile, activate and save.
- Added failure/retry tests proving hidden partial state, stable Account id, two Profile attempts and final activation.
- Added Principal normalization before lookup.

## In Progress
- Prior naming migration remains validated but unstaged and overlaps user-account Port filenames.

## Pending
- Audit Enterprise Account first use case and Team first use case using the same protocol.
- Decide whether durable production persistence later needs an explicit worker/outbox around provisioning; current in-process retry semantics are correct for the approved in-memory slice.

## Modified Files
- docs/architecture/ddd-hexagonal-standard.md
- apps/web/src/modules/AGENTS.md
- apps/web/src/modules/platform-governance/accounts-profile/organization-account/README.md
- apps/web/src/modules/platform-governance/accounts-profile/user-account/README.md
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/aggregates/personal-account.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/value-objects/user-account-id.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/value-objects/user-account-handle.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/value-objects/principal-reference.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/errors/invalid-user-account-id-error.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/errors/invalid-user-account-handle-error.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/errors/invalid-principal-reference-error.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/errors/invalid-personal-account-transition-error.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/domain/user-account/errors/personal-account-provisioning-conflict-error.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/application/use-cases/user-account-service.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/adapters/outbound/persistence/in-memory-user-account-store.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/tests/domain/personal-account.test.ts
- apps/web/src/modules/platform-governance/accounts-profile/user-account/tests/application/account-profile.test.ts
- .serena/memories/current-work-state.md

## Git Anchor
- branch: main
- HEAD: 7bf385cf6db8ffafb09c9b8c27356f3ce984111c
- working tree: dirty; current slice, prior naming migration and unrelated user changes remain unstaged

## Validation
- Serena diagnostics: zero on all changed TypeScript files.
- Focused User Account tests: 2 files, 7 tests passed.
- Full Web tests: 57 files, 135 tests passed.
- @a-i/web typecheck passed.
- @a-i/web build passed on Next.js 16.2.10 with 28 routes.
- pnpm docs:check passed.
- pnpm arch:check passed; 90 architecture tests passed.
- @a-i/web lint completed with one unrelated existing warning in app/(console)/dashboard/page.tsx and zero errors.
- git diff --check passed with only an existing CRLF normalization warning for current-work-state.

## Known Risks
- Durable multi-process delivery is not part of the approved in-memory slice; a future database-backed implementation may require an outbox/worker and lease/retry policy.
- The large dirty working tree requires path-scoped staging and commits.
- User-account Port rename files belong to the prior naming migration, not this semantic slice.

## Next Action
Audit and implement the approved Enterprise Account first use case, then correct Team aggregate classification based on its independent Store and transaction boundary.
