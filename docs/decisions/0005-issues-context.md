# ADR 0005: Issues Context for Issue, Label and Assignment

## 狀態

Accepted — 2026-07-12

## 背景

Issue has an independent identity, repository-scoped number and lifecycle. Label has repository-scoped uniqueness.
Assignment is work responsibility, not Account Membership or Repository Access Grant. Placing these models inside the
Repository aggregate would mix collaboration work with resource governance and enlarge its transaction boundary.

## 決策

Create an `issues` core Bounded Context owned by `www.a-i.tw Product Team` at
`apps/web/src/modules/issues`. It owns Issue, Label and Assignment. Repository is upstream and publishes
`RepositoryCollaborationScopeV1` plus `RepositoryParticipationDecisionV1`. Issues owns a
`RepositoryParticipationGateway` ACL and fails closed when the upstream fact is missing or denied.

The first in-memory slice supports create/list/close/reopen Issue, create/apply/remove Label and assign/unassign an
eligible Principal. No Shared Kernel, cross-context entity import or cross-context transaction is approved.

## 後果

- Repository remains governance owner; it does not own Issue state.
- Issues stores Repository and Principal ids as references, not foreign-owned aggregates.
- Concrete stores and ACL wiring live only in server composition.
- Comments, reactions, notifications, Projects, transfer and persistence remain out of scope.
