# Account Membership, Invitation and Team Value Object evidence

日期：2026-07-14

狀態：Verified Current slice

## Scope

The approved Account Context now reconstructs its existing Membership, Invitation and Team runtime with Context-owned
Value Objects and consumer-owned outbound Ports. The slice does not create a new Bounded Context, change a Context Map
relationship, or expand Published Language. Existing contracts continue to publish primitive, minimal relationship
facts rather than internal branded Domain values.

## Implemented invariants

- Membership and Invitation identities reject blank construction.
- Membership role, Membership status and Invitation status are separate closed vocabularies.
- Invitations expire exactly seven days after issue; acceptance at or after expiry is rejected.
- Only the invited Principal may accept a pending invitation; pending invitations can be cancelled and terminal states
  cannot transition again.
- Expired pending invitations are persisted as expired and no longer permanently block reinvitation.
- Team identity is distinct from its canonical organization-local name.
- Team membership contains unique Account-owned Membership references; Application orchestration admits only active
  organization members.
- In-memory Membership, Invitation and Team seeds reconstruct through Domain factories.

## Boundary audit

- Domain has no framework, SDK, I/O, Application, Adapter or UI dependency.
- Time is supplied to Domain behavior; Domain does not read ambient system time.
- Application owns `MembershipStore`, `MembershipInvitationStore` and `TeamStore` Ports.
- Adapters map persistence seeds and do not define lifecycle policy.
- Contracts remain versioned primitive Published Language; no peer Context import changed.
- Composition remains the only concrete wiring root.

## Evidence

| Check                          | Result                                                                 |
| ------------------------------ | ---------------------------------------------------------------------- |
| Focused Account tests          | 6 files, 21 tests passed                                               |
| `pnpm --filter @a-i/web test`  | 29 files, 66 tests passed                                              |
| `pnpm --filter @a-i/web check` | passed; one unrelated existing Projects warning remains                |
| Serena core-file diagnostics   | no diagnostics                                                         |
| `pnpm docs:check`              | passed                                                                 |
| `pnpm arch:check`              | passed; canonical topology/import boundaries and 37 architecture tests |
| `pnpm build`                   | passed with Next.js 16.2.10 production build                           |
| `pnpm semgrep`                 | passed; 237 targets, 4 rules, 0 findings                               |

Repository-wide `pnpm check` reached `format:check` and remained blocked by pre-existing formatting differences in
`.codex/agents/README.md` and `.codex/prompts/README.md`. The unrelated files were not changed.

## Official semantic sources

- [Inviting users to join your organization](https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization)
- [Adding people to your organization](https://docs.github.com/en/organizations/managing-membership-in-your-organization/adding-people-to-your-organization)
- [Canceling or editing an invitation](https://docs.github.com/en/organizations/managing-membership-in-your-organization/canceling-or-editing-an-invitation-to-join-your-organization)

## Remaining boundary

Team visibility, maintainers, nested hierarchy, outside collaborators, billing-manager roles and invitation delivery
failure are not part of this approved slice. They require separate semantics and use-case approval before runtime code.
