<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project architecture

### Minimal-context routing

Do not preload the documentation catalog. Start from the row matching the task and stop reading when ownership,
boundary, contract and required verification are known.

| Task                                   | Read first                                                              | Read next only when needed                                                  |
| -------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Explanation or docs-only edit          | `docs/ai-index.md`                                                      | The single canonical owner document selected by the index                   |
| Product semantics or capability        | `docs/product/product-model.md`, `docs/product/platform-world-model.md` | Relevant `docs/domains/*` owner and initiative                              |
| Context or cross-context change        | `docs/domains/context-map.md`, target `context.json`                    | Contract, ADR and upstream/downstream matrix for the affected edge          |
| Runtime behavior inside one Context    | Closest module `AGENTS.md`, `README.md`, `context.json`                 | Narrow Domain/Application symbols and tests                                 |
| Architecture governance or new concern | `docs/architecture/ddd-hexagonal-standard.md`                           | `docs/architecture-document-catalog.md` and registry entry for that concern |
| Next.js implementation                 | Relevant guide under `node_modules/next/dist/docs/`                     | Only the route/runtime topic being changed                                  |

`docs/architecture-document-catalog.md` is an inventory, not mandatory startup reading. Read it only to add, move,
audit or reassign a canonical architecture concern. `docs/README.md` is needed when changing documentation topology,
not for every narrow code edit. Serena memories are navigation hints; read only the scoped memory named for the task.

Before editing, state the selected owner, dependency direction, use case, Ports/Adapters and composition impact in one
compact note. If any item is unknown, read the next canonical source; otherwise begin the narrow change.

- This project is a Next.js + shadcn UI application organized as a Domain-Driven Modular Monolith with Hexagonal Architecture.
- Dependency direction is `UI / Infrastructure -> Application -> Domain`; domain code must not depend on Next.js, React, database clients, or external SDKs.
- Treat Ports and Adapters as mandatory: UI, route handlers, Server Actions, and infrastructure are adapters; Application owns use cases and Ports; Domain owns business invariants. Only a server-side composition root may wire concrete adapters.
- Before changing business behavior, identify the owning Domain, Bounded Context, use case, Port, Adapter, Context Map entry, and public contract. Do not invent missing ownership or use `shared`, `common`, `core`, `utils`, or `helpers` to bypass a boundary.
- Cross-context interaction must use an approved published contract, Port, event, or anti-corruption adapter. Never import another context's Domain, Application, Infrastructure, or composition internals.
- When files, documents, memories, or parallel investigations disagree, prefer current runtime evidence and Context Map manifests, then canonical `docs/`; treat Serena memories and copied upstream skills as navigation aids that must be corrected rather than authoritative sources.
- After verified changes to canonical docs, manifests, runtime status, ownership, contracts, paths, or evidence, proactively update, organize, distill, or edit affected Serena navigation memories. Routine maintenance does not require a separate prompt; deletion, renaming, or broad hierarchy reorganization still requires explicit user direction. Never promote proposed semantics to Current memory before approval.
- Read `docs/README.md` and `docs/ai-index.md` before changing documentation topology or adding a module, ADR,
  contract, canonical concern, or production runbook.
- `docs/architecture/ddd-hexagonal-standard.md` is the canonical runtime and governance standard. The 30 required architecture concerns are registered in `docs/architecture/architecture-governance.json`; runtime or boundary changes must keep that registry, its canonical documents, Fumadocs statements, manifests and tests aligned.
- Product Contexts live only at `apps/web/src/modules/<context>`. Internal subdomains require `context.json.internalSubdomains` and `src/subdomains/<name>`. Root `modules/` and horizontal `packages/{application,contracts,domain,foundation,infrastructure}` are forbidden.
- Keep repository-specific agent skills in `.agents/skills/` and Codex rules in `.codex/rules/`.
- Run `pnpm check`, `pnpm build`, and `pnpm semgrep` for changes that affect runtime or boundaries.
