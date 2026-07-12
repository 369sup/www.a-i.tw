# Account Context

## Purpose

Route analysis of Account, namespace, Membership, Team and relationship-fact language.

## Summary

Account is a verified app-local runtime Context owned by the www.a-i.tw Product Team. It owns Account, Membership Invitation, Membership and Team invariants. It publishes minimal Account eligibility, Membership and Team facts; it never returns a Repository Role or resource authorization decision.

## Rules

- Distinguish Principal, Account, Membership, Team and Repository grant.
- Account Domain owns relationship invariants; Account Application owns use cases and store Ports.
- Cross-context consumers use versioned contracts only.
- Membership or Team facts establish relationships, not Repository permission.
- Formal docs, manifests, runtime symbols and tests override this navigation memory.

## Source Locations

- `apps/web/src/modules/account/context.json`
- `apps/web/src/modules/account/src/domain/`
- `apps/web/src/modules/account/src/application/`
- `apps/web/src/modules/account/src/contracts/public.ts`

## Related Documents

- `docs/domains/account.md`
- `docs/domains/context-map.md`
- `docs/contracts/account-contracts.md`
- `docs/evidence/2026-07-12-membership-team-repository-access.md`

## Related Memories

- `mem:10-domain/ownership-map`
- `mem:10-domain/context-dependency-rules`
- `mem:20-contexts/repository`

## Last Verified

- Date: 2026-07-12
- Evidence: Account manifest, Team/Membership services and tests, published contracts, architecture gates.
