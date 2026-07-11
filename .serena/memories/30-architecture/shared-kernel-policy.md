# Shared Kernel Policy

## Purpose

Prevent unowned shared code from becoming an implicit cross-context dependency.

## Summary

No shared kernel is approved. Shared-looking paths or names do not grant universal ownership or import rights.

## Rules

- Do not add business behavior to `shared`, `common`, `core`, `utils`, or `helpers`.
- Prefer explicit contracts and owner-named modules; require architecture approval for a shared kernel.

## Source Locations

- `packages/`
- `apps/web/src/modules/`

## Related Documents

- `docs/architecture/dependency-rules.md`

## Related Memories

- `mem:30-architecture/dependency-direction`
- `mem:40-engineering/import-export-policy`

## Last Verified

- Date: 2026-07-12
- Evidence: topology gate, package policy and shared-kernel policy.
