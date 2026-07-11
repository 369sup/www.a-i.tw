# www.a-i.tw

Next.js 16 + shadcn UI monorepo using a Domain-Driven Modular Monolith with Hexagonal Architecture.

## Development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Quality gates: `pnpm check`, `pnpm arch:check`, `pnpm build`, `pnpm docs:check`, and `pnpm semgrep`.

## Workspace map

- `apps/web`: the deployable Next.js product and `/docs` Fumadocs surface
- `packages/ui`: shared shadcn primitives and presentation utilities
- `packages/eslint-config`: shared Next.js lint configuration
- `packages/typescript-config`: shared TypeScript bases
- `packages/testing-kit`: deterministic Clock and ID-generator test doubles
- `modules/`: bounded-context workspace packages, created only through the approved scaffold
- `tests/e2e`: Playwright product-flow tests
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

## Creating a bounded context

The repository does not keep a live example context. Once the context owner,
domain, subdomain, and type are approved, generate the empty but verified
workspace:

```bash
pnpm generate:context \
  --context <kebab-case-name> \
  --domain <domain-name> \
  --subdomain <subdomain-name> \
  --type <core|supporting|generic> \
  --owner <owner>
```

Then define the first use case and run `pnpm arch:check` before exposing it to
the web application.
