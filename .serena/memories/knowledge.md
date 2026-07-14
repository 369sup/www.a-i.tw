# Distilled Knowledge

## Purpose

Store only verified, reusable, non-obvious facts that are expensive to reconstruct and do not belong in canonical docs, code, tests, manifests, or Git.

## Active Records

No active records.

## Review Queue

No candidates awaiting distillation.

## Record Schema

### K-YYYYMMDD-short-slug

- Status: active | review | deprecated
- Tags: optional comma-separated retrieval hints; never create tag-only records
- Scope: repository, Context, symbol, tool, or workflow boundary
- Claim: one verified reusable semantic fact or relation
- Invariant: what must remain true
- Symbols and relations: qualified symbols plus defines/calls/imports/implements/consumes relations when applicable
- Why retained: why future work benefits and reconstruction is expensive
- Evidence: canonical path, symbol, test, command, or explicit approved decision
- Applies when: conditions under which the claim is valid
- Invalidated when: observable condition that requires removal or re-verification
- Last verified: YYYY-MM-DD plus evidence

## Maintenance

Follow `docs/runbooks/serena-memory-policy.md`. Merge duplicates, promote formal decisions to docs or ADRs, remove repository-reconstructable detail, and delete invalidated records instead of accumulating history.
