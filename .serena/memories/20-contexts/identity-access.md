# Identity and Access Context

## Purpose

Route analysis of Principal, authentication eligibility and session facts.

## Summary

Identity & Access is a verified app-local supporting Context owned by the www.a-i.tw Product Team. It owns Principal validity and in-memory session facts. It publishes PrincipalRefV1 to Account, Repository and Work Management; it does not own Account relationships, Repository roles or work assignments.

## Rules

- Distinguish Principal, Account, Credential, Membership, Repository Role and Assignee.
- Active Principal is necessary but not sufficient for resource or work authorization.
- Consumers use versioned contracts and their own translation/ACL.
- Formal docs, manifest, runtime and tests override this navigation memory.

## Source Locations

- `apps/web/src/modules/identity-access/context.json`
- `apps/web/src/modules/identity-access/src/`

## Related Documents

- `docs/domains/identity-and-access.md`
- `docs/domains/context-map.md`

## Related Memories

- `mem:10-domain/bounded-context-map`
- `mem:20-contexts/work-management`

## Last Verified

- Date: 2026-07-12
- Evidence: runtime manifest, Principal contract references and Identity tests.
