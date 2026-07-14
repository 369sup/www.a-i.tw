---
name: repo-docs-maintenance
description: Maintain canonical project documentation from design through production.
---

## Ownership and routing

Route documentation changes through `docs/ai-index.md`, then read only the canonical owner and the nearest
scoped `AGENTS.md`. Keep the distinction explicit:

- `README.md` explains stable knowledge and navigation;
- `AGENTS.md` defines scoped working constraints;
- `context.json`, `context-map.json`, manifests, and contracts describe machine or integration facts;
- ADRs record decisions and trade-offs;
- status and evidence documents record dated verification, not desired state;
- runbooks contain executable operational procedures.

Do not create a parallel source of truth, move product semantics into Codex configuration, or use docs to
compensate for missing code, tests, manifests, or contracts.

## Evidence discipline

Before editing, identify the claim being changed, its canonical owner, affected links or consumers, and the
smallest validation. Label facts as Current, Proposed, or historical. Do not promote Proposed semantics to
Current without approval plus runtime, test, manifest, or dated evidence. Do not claim a command, deployment,
integration, or runtime behavior passed unless it was executed and its result is available.

For architecture or cross-Context changes, check ownership, context map, public contract version, and links.
For operational docs, verify commands against `package.json`, local configuration, platform constraints, and
secret handling. Keep examples free of credentials, tokens, cookies, private URLs, and personal data.

## Change and verification workflow

1. Read the route and owner before drafting.
2. Make the smallest cohesive documentation change; update links, indexes, metadata, and generated references
   only when the owned fact changed.
3. Run formatting, `pnpm docs:check`, and any affected focused check. Expand to `pnpm arch:check`, `pnpm check`,
   or build only when the changed fact crosses those boundaries.
4. Inspect `git diff --check`, `git diff --stat`, and the focused diff. Report unexecuted checks and remaining
   evidence gaps.

Do not stage, commit, push, deploy, or rewrite unrelated documentation unless explicitly authorized.
