# Public content source

## Purpose and scope

`content/` stores source that the Web app publishes. The current collection is `docs/`, configured by
`apps/web/source.config.ts` and rendered below `/docs`.

This is not the repository's internal canonical knowledge base. Product, architecture, operational, and decision owners
remain under the root [`docs/`](../../../docs/).

## Structure

```text
content/
└── docs/   Fumadocs MDX pages and navigation metadata
```

## Editing workflow

1. Confirm the claim against its canonical owner or current runtime.
2. Edit the smallest public page; update `meta.json` only for navigation changes.
3. Run `pnpm docs:check` from the repository root.

See [`docs/README.md`](docs/README.md) for the public collection map and [`AGENTS.md`](AGENTS.md) for publication rules.
