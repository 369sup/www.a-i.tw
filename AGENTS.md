<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project architecture

- This project is a Next.js + shadcn UI application organized as a Domain-Driven Modular Monolith with Hexagonal Architecture.
- Dependency direction is `UI / Infrastructure -> Application -> Domain`; domain code must not depend on Next.js, React, database clients, or external SDKs.
- Read `docs/README.md` and `docs/ai-index.md` before adding a module, ADR, contract, or production runbook.
- Keep repository-specific agent skills in `.agents/skills/` and Codex rules in `.codex/rules/`.
- Run `pnpm check`, `pnpm build`, and `pnpm semgrep` for changes that affect runtime or boundaries.
