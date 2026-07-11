# www.a-i.tw

Next.js 16 + shadcn UI monorepo using a Domain-Driven Modular Monolith with Hexagonal Architecture.

## Development

```bash
npm install
npm run dev
```

Quality gates: `npm run check`, `npm run build`, `npm run docs:check`, and `npm run semgrep`.

## Workspace map

- `apps/web`: the deployable Next.js product and `/docs` Fumadocs surface
- `packages/ui`: shared shadcn primitives and presentation utilities
- `packages/eslint-config`: shared Next.js lint configuration
- `packages/typescript-config`: shared TypeScript bases
- `docs/`: internal governance, ADRs, contracts, runbooks, and production evidence
- `scripts/`: repository checks and release gates

## Architecture

The intended dependency direction is `UI / Infrastructure -> Application -> Domain`.
Each bounded context owns its domain language and exposes cross-context behavior through application contracts, ports, adapters, or published language. See [`docs/README.md`](docs/README.md) for the design-to-production documentation map.

## Repository setup

- `.agents/skills/`: project-local workflow skills
- `.codex/rules/`: repository rules for agents and contributors
- `.github/`: CI, ownership, issue, and pull request conventions
- `.semgrep/`: security scanning rules
- `components.json` and `lib/utils.ts`: shadcn component configuration
