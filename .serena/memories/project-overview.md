# Project Overview

## Authority

Runtime, manifests, tests, root or nearer `AGENTS.md`, canonical `docs/`, and Git are authoritative. This memory is a routing index only and never overrides repository evidence.

## Read Order

- New task needing repository routing: read this memory.
- Resumed, compacted, paused, or handoff task: read `mem:current-work-state`.
- Task requiring verified non-obvious operational knowledge: read `mem:knowledge` only after this index identifies the relevant category.

## Canonical Source Map

- Repository-wide execution contract: `AGENTS.md`
- Module tactical placement and naming: `apps/web/src/modules/AGENTS.md`
- Module navigation and runtime inventory: `apps/web/src/modules/README.md`
- Documentation owner routing: `docs/ai-index.md`
- DDD and Hexagonal anti-rules: `docs/architecture/ddd-hexagonal-standard.md`
- Context internal topology: `docs/architecture/context-internal-topology.md`
- Context relationships: `docs/domains/context-map.md`
- GitHub non-Code semantic evidence: `docs/product/github-non-code-semantic-model.md`
- Serena lifecycle and admission policy: `docs/runbooks/serena-memory-policy.md`

## Stable Project Architecture

- Authoritative repository root: `D:\GitHub\www.a-i.tw`; verify with `git rev-parse --show-toplevel` before work.
- `apps/web` is the only deployable application.
- Product runtime belongs to app-local Bounded Contexts under `apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>/`.
- Domain Groups and Domain Areas are governance-only navigation layers.
- A Bounded Context is the semantic ownership boundary; only non-`planned` Contexts own implemented runtime, data, consistency, and contracts.
- Dependency direction is `UI / Infrastructure -> Application -> Domain`.
- Cross-Context collaboration uses a consumer-owned outbound Port, an ACL integration adapter, and the provider's `contracts/vN/public.ts`.
- `public-api.ts` is app-facing and is never the peer-Context entrypoint.
- The accepted portfolio is six Domain Groups, twelve Domain Areas, thirty-seven physical Context descriptors, twenty runtime Contexts, and seventeen planned descriptors. Verify these counts against manifests and ADR 0014 before relying on them. [ad-hoc note]

## Memory Roles

- `mem:project-overview`: routing and stable architecture index.
- `mem:knowledge`: distilled durable organizational, environment, naming, ownership, and workflow constraints.
- `mem:current-work-state`: overwriteable temporary implementation checkpoint.
- Do not create additional Serena memories.

## Update Gate

Update this memory only when canonical routing, memory roles, authoritative root, or stable architecture shape changes. Formal decisions remain in docs or ADRs; temporary progress remains in `current-work-state`.

## Last Verified

2026-07-16 against the active repository, module governance contract, ADR 0014, and Serena 1.5.3 configuration.
