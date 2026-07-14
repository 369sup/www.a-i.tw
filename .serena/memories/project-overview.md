# Project Overview

## Authority

Code, tests, manifests, root or nearer `AGENTS.md`, and canonical `docs/` are authoritative. This memory is routing only.

## Read Order

- New task needing repository routing: read this file only.
- Resumed, compacted, or paused task: read `mem:current-work-state`.
- Task requiring verified non-obvious prior knowledge: read `mem:knowledge` only after this index identifies the need.

## Source Map

- Execution and verification: `AGENTS.md`
- Documentation owner routing: `docs/ai-index.md`
- Architecture: `docs/architecture/ddd-hexagonal-standard.md`
- Context relationships: `docs/domains/context-map.md`
- Serena lifecycle and record admission: `docs/runbooks/serena-memory-policy.md`

## Stable Shape

- `apps/web` is the only deployable app.
- Product runtime is app-local Bounded Contexts grouped by governance-only Domain Group folders.
- Dependency direction is `UI / Infrastructure -> Application -> Domain`.
- Cross-Context calls use a consumer Port and ACL against the provider's versioned public contract.

## Memory Map

- `mem:project-overview`: routing and read-order index; keep small.
- `mem:current-work-state`: overwriteable resumable checkpoint.
- `mem:knowledge`: single-file distilled durable records; read on demand.

## Update Gate

Update this file only when source routing, memory roles, or stable repository shape changes. Put formal decisions in docs or ADRs, reusable non-obvious facts in `knowledge`, and temporary progress in `current-work-state`. Do not add new memory files.

## Last Verified

2026-07-14 against repository rules, canonical routing documents, Serena 1.5.3 activation, and architecture checks.
