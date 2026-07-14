# Public documentation collection

## Purpose and reading order

This Fumadocs collection explains the product and selected architecture publicly at `/docs`. Begin with `index.mdx`,
then use `getting-started/` before the topic collections.

Only `.mdx` files are compiled as public pages. This `README.md` and the adjacent `AGENTS.md` remain repository
governance files and are excluded by `source.config.ts`.

## Collection map

| Path               | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `getting-started/` | Scope, reading guidance, and terminology    |
| `product/`         | Public product concepts and resource models |
| `architecture/`    | Selected boundaries and system concepts     |
| `reference/`       | Glossary and compact reference material     |
| `meta.json`        | Top-level navigation order                  |

## Authoring and preview

1. Verify the statement against current runtime or its canonical owner under the repository root `docs/`.
2. Add or edit one focused `.mdx` page with accurate `title` and `description` frontmatter.
3. Update the nearest `meta.json` only when the page should appear in navigation.
4. Run `pnpm docs:check`; use `pnpm --filter @a-i/web dev` for a visual preview when needed.

Internal ADRs, runbooks, evidence, and governance documents remain in the root [`docs/`](../../../../docs/) tree and
must not be copied here wholesale.
