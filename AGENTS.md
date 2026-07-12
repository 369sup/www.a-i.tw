<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Repository Agent Rules

## Start Here

Use the smallest route that identifies ownership, boundary, contract, and required verification. Do not preload the documentation catalog.

1. Read this file and `.codex/AGENTS.md`.
2. Match the task to the routing table below.
3. Stop reading once owner, dependency direction, use case, ports/adapters, composition impact, and verification are known.
4. Before editing, state those facts in one compact note. If any item is unknown, read only the next canonical source needed to resolve it.

If Serena MCP tools are available, first call `serena.initial_instructions` and `serena.get_current_config`. If they are unavailable, continue from current runtime files and canonical docs; do not block the task.

## Minimal-Context Routing

| Task                                                                              | Read first                                                              | Read next only when needed                                                  |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Explanation or docs-only edit                                                     | `docs/ai-index.md`                                                      | The single canonical owner document selected by the index                   |
| Documentation topology, README, AGENTS, ADR, contract, runbook, canonical concern | `docs/README.md`, `docs/ai-index.md`                                    | The owning canonical document or registry entry                             |
| Product semantics or capability                                                   | `docs/product/product-model.md`, `docs/product/platform-world-model.md` | Relevant `docs/domains/*` owner and initiative                              |
| Context or cross-context change                                                   | `docs/domains/context-map.md`, target `context.json`                    | Contract, ADR, and upstream/downstream matrix for the affected edge         |
| Runtime behavior inside one Context                                               | Closest module `AGENTS.md`, `README.md`, `context.json`                 | Narrow Domain/Application symbols and tests                                 |
| Architecture governance or new concern                                            | `docs/architecture/ddd-hexagonal-standard.md`                           | `docs/architecture-document-catalog.md` and registry entry for that concern |
| Next.js implementation                                                            | Relevant guide under `node_modules/next/dist/docs/`                     | Only the route/runtime topic being changed                                  |

`docs/architecture-document-catalog.md` is an inventory. Read it only to add, move, audit, or reassign a canonical architecture concern.

## Architecture Boundaries

- This project is a Next.js + shadcn UI application organized as a Domain-Driven Modular Monolith with Hexagonal Architecture.
- Dependency direction is `UI / Infrastructure -> Application -> Domain`.
- Domain code must not depend on Next.js, React, database clients, external SDKs, Application, Infrastructure, or UI.
- Application owns use cases, commands, queries, and ports.
- UI, route handlers, Server Actions, and Infrastructure are adapters.
- Only a server-side composition root may wire concrete adapters.
- Cross-context semantic dependencies originate only from consumer Infrastructure integrations, implement a
  consumer-owned Application Port, and import the provider Published Language entrypoint. App server composition alone
  may import Context `public-api.ts` and `composition/index.ts`.
- Never import another context's Domain, Application, Infrastructure, composition internals, or private test fixtures.
- Do not invent missing ownership or use `shared`, `common`, `core`, `utils`, or `helpers` to bypass a boundary.

Before changing business behavior, identify the owning Domain, Bounded Context, use case, Port, Adapter, Context Map entry, and public contract. If those are missing, document the gap instead of inventing semantics.

## Repository Topology

- Product contexts live only at `apps/web/src/modules/<context>`.
- Target Context internals are layer-first then declared-subdomain: `domain/<subdomain>`,
  `application/<subdomain>`, `contracts/<subdomain>`, `infrastructure/<subdomain>` and optional
  `presentation/<subdomain>`. Existing `src/*` paths are transitional only when registered in
  `docs/architecture/context-topology-migration.json`.
- Internal subdomains require `context.json.internalSubdomains`; generators create their directories across owned
  layers. Do not create `shared`, `common`, `core`, `utils` or `helpers` as ownership-free escape hatches.
- Root `modules/` and horizontal `packages/{application,contracts,domain,foundation,infrastructure}` are forbidden.
- `packages/*` must contain only context-neutral technical capabilities.
- Repository-specific agent skills live in `.agents/skills/`.
- Codex command policy and project prompts live in `.codex/`.
- `.codex/rules/*.rules` controls command execution policy only; DDD, TypeScript, naming, and documentation rules come from this file and nested `AGENTS.md` files.

## Documentation And Memories

- `docs/ai-index.md` is the AI/document routing entrypoint.
- `docs/README.md` governs documentation topology.
- `docs/architecture/ddd-hexagonal-standard.md` is the canonical runtime and governance standard.
- The 30 required architecture concerns are registered in `docs/architecture/architecture-governance.json`.
- Runtime or boundary changes must keep registry entries, canonical docs, Fumadocs statements, manifests, and tests aligned.
- When files, docs, memories, skills, generated output, or parallel investigations disagree, prefer current runtime evidence and Context Map manifests, then canonical `docs/`.
- Serena memories are navigation hints, not canonical sources. Correct affected navigation memories after verified changes to canonical docs, manifests, runtime status, ownership, contracts, paths, or evidence.
- Never promote proposed semantics to Current memory before approval.
- Deletion, renaming, or broad memory hierarchy reorganization requires explicit user direction.

## Implementation Workflow

- Prefer narrow, evidence-backed edits that follow existing module patterns.
- For runtime changes, inspect the closest `AGENTS.md`, `README.md`, `context.json`, relevant symbols, and focused tests.
- For product behavior or boundary changes, follow `docs/engineering/semantic-development-workflow.md` G0-G7 before coding.
- Do not put Git hosting semantics into product domain language.
- Do not push, deploy, delete, reset, or rebase unless explicitly asked.
- If the work touches Next.js APIs, read the relevant local Next.js guide under `node_modules/next/dist/docs/` before editing.

## Verification

- Runtime or boundary changes: run `pnpm check`, `pnpm build`, and `pnpm semgrep`.
- Architecture changes: also run `pnpm arch:check`.
- Documentation-only changes: prefer `pnpm task:verify:docs` or the narrow documentation check that matches the touched files.
- Keep verification evidence aligned with the changed ownership and blast radius.

## Generated And Vendor Exceptions

- shadcn official components under `packages/ui/src/components/ui/**` and `apps/web/components/ui/**` may keep official generated patterns such as `as`, primitive wrappers, and namespace imports.
- Those exceptions do not apply to Domain/Application code, cross-context internals, or sensitive data handling.
- Custom business components outside those generated paths follow normal repository rules.
