# www.a-i.tw

Next.js 16 + shadcn UI application using a Domain-Driven Modular Monolith with Hexagonal Architecture.

## Development

```bash
npm install
npm run dev
```

Quality gates: `npm run check`, `npm run build`, and `npm run semgrep`.

## Architecture

The intended dependency direction is `UI / Infrastructure -> Application -> Domain`.
Each bounded context owns its domain language and exposes cross-context behavior through application contracts, ports, adapters, or published language. See [`docs/README.md`](docs/README.md) for the design-to-production documentation map.

## Repository setup

- `.agents/skills/`: project-local workflow skills
- `.codex/rules/`: repository rules for agents and contributors
- `.github/`: CI, ownership, issue, and pull request conventions
- `.semgrep/`: security scanning rules
- `components.json` and `lib/utils.ts`: shadcn component configuration
