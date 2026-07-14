# Public content rules

## Scope and hard rules

- This subtree contains publishable source consumed by the Web app; it does not own internal repository governance.
- Keep content compatible with `source.config.ts` and the format expected by its renderer.
- Treat repository `docs/` and the relevant runtime owner as evidence; mark Proposed behavior explicitly.

## Prohibited actions

- Do not publish secrets, private operational details, internal incident data, or unverified runtime claims.
- Do not duplicate an internal canonical document when a concise public explanation or link is sufficient.
- Do not change product semantics solely to make public documentation easier to write.

## Required workflow

1. Read `docs/AGENTS.md` for MDX-specific rules and identify the canonical source for each claim.
2. Update the smallest page and its `meta.json` navigation only when ordering or membership changes.
3. Verify generated content and links with `pnpm docs:check`.

## Definition of Done

Public content is accurate, publishable, navigable, free of sensitive data, and passes the relevant documentation check.
