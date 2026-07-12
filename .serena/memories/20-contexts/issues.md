# Issues Context

## Purpose

Route analysis of repository-scoped Issue, Label and Assignment language.

## Summary

Issues is a verified app-local core Context owned by the www.a-i.tw Product Team. It owns Issue identity/number/lifecycle, Label classification and Assignment responsibility. Repository remains upstream governance owner; Issues consumes collaboration scope and participation decisions through its own ACL.

## Rules

- Never import Repository, Identity or Account internals.
- Issue, Label and Assignment references remain inside one Repository scope.
- Authentication alone does not establish assignment eligibility.
- Closed Issues reject Label and Assignment mutation.
- Formal docs, manifests, runtime and tests override this navigation memory.

## Source Locations

- `apps/web/src/modules/issues/context.json`
- `apps/web/src/modules/issues/src/domain/`
- `apps/web/src/modules/issues/src/application/issues-service.ts`
- `apps/web/src/modules/issues/src/infrastructure/`

## Related Documents

- `docs/decisions/0005-issues-context.md`
- `docs/initiatives/issues-v1/README.md`
- `docs/evidence/2026-07-12-issues-v1.md`
- `docs/status/2026-07-12-issues-30-concern-closure.md`

## Related Memories

- `mem:10-domain/bounded-context-map`
- `mem:20-contexts/repository`
- `mem:20-contexts/identity-access`

## Last Verified

- Date: 2026-07-12
- Evidence: Serena symbols/references/diagnostics, 16 web tests, 3 E2E tests, docs/architecture/build/Semgrep gates.
