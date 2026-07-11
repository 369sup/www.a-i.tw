# Ownership Map

## Purpose

Provide a concise ownership index for proposed domain analysis.

## Summary

Identity & Access owns principal, credential/session, and access-decision language. Account owns account, namespace, membership, and team language. Repository owns visibility, grants, lifecycle, and repository-scoped decisions. These are proposed boundaries until runtime evidence exists.

## Rules

- Cross-context consumers use published language rather than internals.
- Repository does not own Git, source, commit, branch, PR, or Actions semantics.

## Source Locations

- `docs/domains/identity-and-access.md`
- `docs/domains/account.md`
- `docs/domains/repository.md`

## Related Documents

- `docs/domains/context-map.md`

## Related Memories

- `mem:10-domain/bounded-context-map`
- `mem:10-domain/context-dependency-rules`

## Last Verified

- Date: 2026-07-11
- Evidence: domain strategy documents.
