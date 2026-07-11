# Semantic Development Lifecycle

## Purpose

Route product behavior and architecture-boundary changes through one evidence-backed sequence.

## Summary

Execute G0-G7 in order: orient and Serena handshake, approve semantics, update canonical knowledge, approve ownership and path, scaffold only when required, implement Domain to Application and Ports to adapters, compose inbound adapters, then verify and publish evidence.

## Rules

- Do not scaffold before problem, owner, language, Context, Aggregate, first use case and path are approved.
- Update canonical docs before runtime and before this navigation memory.
- Keep dependency direction Presentation or Infrastructure to Application to Domain.
- Cross-context consumers use their own Port or ACL and provider contracts.
- Finish with Serena diagnostics, check, docs, architecture, build, Semgrep and acceptance evidence.

## Source Locations

- `docs/engineering/semantic-development-workflow.md`
- `.agents/skills/semantic-development-lifecycle/SKILL.md`
- `.codex/prompts/11-semantic-development-lifecycle.md`

## Related Documents

- `docs/architecture/ddd-hexagonal-standard.md`
- `docs/ai-index.md`

## Related Memories

- `mem:40-engineering/serena-usage-policy`
- `mem:50-workflows/architecture-audit`
- `mem:40-engineering/verification-workflow`

## Last Verified

- Date: 2026-07-12
- Evidence: canonical workflow, Codex rule, agent skill and PR gate.
