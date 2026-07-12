# Memory Governance

## Purpose

Keep Serena memories concise, current, source-backed and maintainable.

## Summary

Memories are version-controlled navigation artifacts, not a second documentation system. After canonical docs and runtime evidence change, proactive memory maintenance updates, organizes, distills and edits affected navigation memories so stale summaries do not mislead future work.

## Rules

- Use the required structure and `mem:` links.
- Read scoped memories during G0 and compare them with canonical docs, manifests, runtime and tests.
- Keep stable, non-obvious navigation facts only; place temporary investigation in `_temporary/`.
- Update affected status/context memories after diagnostics, tests and diff evidence are available.
- Distill rather than copy canonical documents.
- Never let memory override formal docs or runtime evidence.
- Proactively maintain affected memories after canonical changes and verification; routine update, organization, distillation and editing do not require a separate prompt.
- Do not delete, rename or broadly reorganize the memory hierarchy without explicit user direction.
- Prefer narrow edits, re-read changed memories and report which memories changed.

## Source Locations

- `.serena/memories/`
- `.serena/.gitignore`

## Related Documents

- `docs/runbooks/serena-memory-policy.md`
- `docs/engineering/semantic-development-workflow.md`

## Related Memories

- `mem:70-status/latest-checkpoint`
- `mem:40-engineering/serena-usage-policy`

## Last Verified

- Date: 2026-07-12
- Evidence: proactive memory-maintenance policy aligned across repository rules, workflow, skill and runbook.
