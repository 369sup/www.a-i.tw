# Minimal Context Routing

## Purpose

Reduce startup context and repeated broad documentation reads.

## Rules

- Start every repository task with Serena handshake, then read root AGENTS.md and .codex/AGENTS.md.
- Use the Minimal-context routing table in root AGENTS.md; choose one initial path.
- Do not preload docs/README.md, docs/ai-index.md or docs/architecture-document-catalog.md.
- Read docs/ai-index.md for docs-only, product semantics or ambiguous ownership.
- Read docs/README.md only for documentation topology.
- Read architecture-document-catalog.md only when adding, moving, auditing or reassigning one of the 30 canonical concerns.
- A known single-Context runtime task starts at the closest module AGENTS.md, README.md, context.json and narrow symbols/tests.
- Stop exploring when owner, dependency direction, use case, Ports/Adapters, composition impact and required verification are known.
- Serena memories are scoped navigation hints and never override runtime, manifests or canonical docs.

## Source Locations

- `AGENTS.md`
- `.codex/AGENTS.md`
- `.agents/skills/repo-explore-first/SKILL.md`
- `docs/ai-index.md`
- `docs/architecture-document-catalog.md`

## Last Verified

- Date: 2026-07-12
- Evidence: formatting, documentation checks, Fumadocs type generation and full pnpm check passed.
