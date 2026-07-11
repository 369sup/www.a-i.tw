<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project architecture

- This project is a Next.js + shadcn UI application organized as a Domain-Driven Modular Monolith with Hexagonal Architecture.
- Dependency direction is `UI / Infrastructure -> Application -> Domain`; domain code must not depend on Next.js, React, database clients, or external SDKs.
- Treat Ports and Adapters as mandatory: UI, route handlers, Server Actions, and infrastructure are adapters; Application owns use cases and Ports; Domain owns business invariants. Only a server-side composition root may wire concrete adapters.
- Before changing business behavior, identify the owning Domain, Bounded Context, use case, Port, Adapter, Context Map entry, and public contract. Do not invent missing ownership or use `shared`, `common`, `core`, `utils`, or `helpers` to bypass a boundary.
- Cross-context interaction must use an approved published contract, Port, event, or anti-corruption adapter. Never import another context's Domain, Application, Infrastructure, or composition internals.
- When files, documents, memories, or parallel investigations disagree, prefer current runtime evidence and Context Map manifests, then canonical `docs/`; treat Serena memories and copied upstream skills as navigation aids that must be corrected rather than authoritative sources.
- Read `docs/README.md` and `docs/ai-index.md` before adding a module, ADR, contract, or production runbook.
- Keep repository-specific agent skills in `.agents/skills/` and Codex rules in `.codex/rules/`.
- Run `pnpm check`, `pnpm build`, and `pnpm semgrep` for changes that affect runtime or boundaries.
