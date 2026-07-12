# Repository Context

## Purpose

Route analysis of Repository visibility, lifecycle, Principal/Team grants and repository-scoped decision language.

## Summary

Repository is a verified app-local runtime Context owned by the www.a-i.tw Product Team. It owns Repository identity, visibility, lifecycle, Access Grant, Repository Role and effective-access decisions. It excludes Git, source, commit, branch, PR, Actions, package and code-security semantics.

## Rules

- Do not conflate Repository with a filesystem folder or Git adapter.
- Repository consumes Account eligibility, Membership and Team facts through its Application-owned AccountDirectoryGateway ACL.
- Account facts never carry a Repository Role.
- Principal and Team grants remain Repository-private.
- Other Contexts require an explicit versioned contract and consumer-owned ACL.
- Formal docs, manifests, runtime symbols and tests override this navigation memory.

## Source Locations

- `apps/web/src/modules/repository/context.json`
- `apps/web/src/modules/repository/src/domain/`
- `apps/web/src/modules/repository/src/application/repository-service.ts`
- `apps/web/src/modules/repository/src/contracts/public.ts`

## Related Documents

- `docs/domains/repository.md`
- `docs/domains/context-map.md`
- `docs/contracts/repository-contracts.md`
- `docs/evidence/2026-07-12-membership-team-repository-access.md`

## Related Memories

- `mem:10-domain/ownership-map`
- `mem:10-domain/context-dependency-rules`
- `mem:20-contexts/account`

## Last Verified

- Date: 2026-07-12
- Evidence: Repository manifest, AccountDirectoryGateway references, Principal/Team grant tests, composition and architecture gates.
