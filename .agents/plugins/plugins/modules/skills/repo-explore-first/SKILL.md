---
name: repo-explore-first
description: Inspect project rules and architecture before changing this repository.
---

## Entry and routing

Read the repository root `AGENTS.md`, then the nearest scoped `AGENTS.md` and any non-empty
`AGENTS.override.md` for the target path. Read `.codex/AGENTS.md` only when the task touches Codex,
skills, prompts, rules, environments, or plugins. Use the root `Context routing` table to select one
narrow route.

Do not preload `docs/README.md`, `docs/ai-index.md`, the architecture catalog, memories, or unrelated
skills. Read `docs/ai-index.md` for documentation-only, product-semantics, or ambiguous ownership tasks;
read `docs/README.md` only for documentation-topology changes; read the architecture catalog only for
canonical-concern governance.

## Precedence and short-circuit

- Run this skill first for repository tasks.
- If ownership and verification scope are clear after narrow routing, stop exploration and hand off to the execution skill.
- If the task is docs-only, route to docs ownership and skip runtime/source exploration.
- If the task is a tiny local edit with no boundary impact, do not trigger full lifecycle orchestration.

## Evidence sequence

1. Confirm Git root, current branch, `git status --short`, and the target path.
2. Inspect the narrowest relevant manifest, owner document, symbol/import consumer, and focused test.
3. Check the local package/framework version before relying on version-sensitive behavior.
4. Stop when owner, boundary, dependency direction, and required verification are known.

Before editing, report one compact note covering owner and allowed scope; dependency direction and, when
applicable, use case, Ports, Adapters, and composition root; public contracts or canonical documents affected;
and the smallest change with focused verification.

Treat runtime evidence, manifests, tests, and canonical owner documents as authoritative over copied skills,
navigation memories, and directory presence. Preserve unrelated worktree changes. Do not stage, commit, push,
deploy, or alter branches unless the user explicitly authorizes that exact action.
