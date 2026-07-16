# Project Overview

## Authority

Runtime, manifests, tests, root or nearer `AGENTS.md`, canonical `docs/`, and Git are authoritative. This memory is a routing index and never overrides repository evidence. The external Codex `MEMORY.md` registry is a separate source-context system and is not a Serena memory.

## Read Order

- Read this memory when a new task needs repository routing.
- Read `mem:current-work-state` only for resume, compact, pause, handoff, or a pending checkpoint.
- Read `mem:knowledge` only when a task needs one of its verified non-obvious records.

## Source Map

- Repository execution contract: `AGENTS.md`
- Module tactical placement and naming: `apps/web/src/modules/AGENTS.md`
- Module navigation and runtime inventory: `apps/web/src/modules/README.md`
- Documentation routing: `docs/ai-index.md`
- DDD and Hexagonal anti-rules: `docs/architecture/ddd-hexagonal-standard.md`
- Context internal topology: `docs/architecture/context-internal-topology.md`
- Runtime Context relationships: `docs/domains/context-map.md` and `docs/domains/context-map.json`
- GitHub non-Code semantic evidence: `docs/product/github-non-code-semantic-model.md`
- Serena lifecycle and admission policy: `docs/runbooks/serena-memory-policy.md`

## Stable Shape

- Authoritative repository root: `D:\GitHub\www.a-i.tw`; verify it with `git rev-parse --show-toplevel`.
- `apps/web` is the only deployable application.
- Product runtime belongs to app-local Bounded Contexts under `apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>/`.
- Domain Groups and Domain Areas are governance-only navigation layers.
- A Bounded Context is the semantic ownership boundary; only non-`planned` Contexts own implemented runtime, data, consistency, and contracts.
- Dependency direction is `UI / Infrastructure -> Application -> Domain`.
- Cross-Context collaboration uses a consumer-owned outbound Port, an ACL integration adapter, and provider `contracts/vN/public.ts`.
- `public-api.ts` is app-facing and is not a peer-Context entrypoint.
- The accepted portfolio contains six Domain Groups, twelve Domain Areas and thirty-seven physical Context descriptors.
  The current manifest snapshot contains twenty-one runtime Contexts and sixteen planned descriptors; ADR 0015 permits
  the distribution to change one verified promotion at a time.

## Memory Map

- `mem:project-overview`: routing and stable architecture index.
- `mem:knowledge`: durable verified organizational, architecture, environment, naming, ownership, and workflow records.
- `mem:current-work-state`: overwriteable temporary implementation checkpoint.
- Do not create additional Serena memories.

## Update Gate

Update this memory only when canonical routing, memory roles, authoritative root, or stable architecture shape changes. Formal decisions remain in docs or ADRs; temporary progress remains in `mem:current-work-state`.

## Last Verified

2026-07-17 against the active repository, module governance contract, ADR 0015, current manifests and Context Map.
