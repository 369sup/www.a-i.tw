# Verification Workflow

## Purpose

Select evidence-producing validation after Serena-assisted changes.

## Summary

Run language-server diagnostics first, then focused tests and repository checks proportional to risk. Boundary or runtime changes require architecture and full runtime gates.

## Rules

- Inspect `git diff` before handoff.
- Documentation changes run `pnpm docs:check`; runtime or boundary changes run `pnpm check`, `pnpm build`, `pnpm semgrep`, and applicable architecture tests.

## Source Locations

- `package.json`
- `scripts/validation/verify.sh`

## Related Documents

- `docs/06-quality/README.md`

## Related Memories

- `mem:40-engineering/serena-usage-policy`
- `mem:70-status/latest-checkpoint`

## Last Verified

- Date: 2026-07-11
- Evidence: workspace verification scripts.
