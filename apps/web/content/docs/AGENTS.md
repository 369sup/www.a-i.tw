# Public documentation rules

## Scope and hard rules

- This directory is the Fumadocs collection served at `/docs`; pages use MDX and navigation uses `meta.json`.
- `source.config.ts` includes only `**/*.mdx`; `README.md` and `AGENTS.md` are governance files, never public pages.
- Every page must have accurate frontmatter, one clear topic, and links that resolve within the published collection.
- Public explanations may summarize canonical repository documents but must preserve status, ownership, and important
  exceptions.

## Prohibited actions

- Do not present Proposed, Transitional, Deprecated, or Historical material as Current.
- Do not expose private paths, credentials, connector identifiers, internal-only procedures, or personal data.
- Do not copy large canonical documents or create a second source of truth.

## Required workflow

1. Locate the canonical owner through the repository `docs/ai-index.md` or verify current runtime behavior.
2. Edit the relevant MDX page; change the nearest `meta.json` only when navigation changes.
3. Check headings, frontmatter, internal links, and terminology; run `pnpm docs:check`.

## Definition of Done

The page is concise, publicly safe, correctly classified, reachable through navigation when intended, and verified by
the documentation check.
