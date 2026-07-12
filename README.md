# www.a-i.tw

Next.js 16 + shadcn UI monorepo using a Domain-Driven Modular Monolith with Hexagonal Architecture.

## Quick Start

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Main verification commands:

```bash
pnpm check
pnpm arch:check
pnpm docs:check
pnpm semgrep
pnpm build
pnpm test:e2e
```

For changed work, prefer the scoped task gates:

```bash
pnpm task:verify:docs
pnpm task:verify:runtime
pnpm task:verify:all
```

## Project Shape

`apps/web` is the only deployable product application. Product Bounded Contexts live inside that application at `apps/web/src/modules/<context>`.

```text
apps/web/
├── content/docs/                  # Public Fumadocs content
└── src/
    ├── app/                       # Next.js routes
    ├── presentation/              # Cross-context inbound adapters
    ├── server/composition/        # Concrete adapter wiring root
    └── modules/<bounded-context>/ # Product contexts
```

Repository-level directories:

```text
apps/       Deployable applications and app-local contexts
packages/   Context-neutral technical packages
tests/      Architecture and end-to-end tests
docs/       Internal canonical product, domain, architecture, and operations docs
scripts/    Architecture, validation, migration, and release gates
.agents/    Repository-owned Codex skills and scaffolding
.codex/     Codex rules, prompts, profiles, and command policy
```

`packages/*` must stay context-neutral. Domain, Application, Contracts, Infrastructure, and product semantics belong in the owning Bounded Context.

## Architecture

The core dependency rule is:

```text
UI / Infrastructure -> Application -> Domain
```

- Domain owns business invariants and must not depend on Next.js, React, database clients, or external SDKs.
- Application owns use cases, commands, queries, and ports.
- UI, route handlers, Server Actions, and Infrastructure are adapters.
- Only the server-side composition root wires concrete adapters.
- Cross-context interaction must use an approved published contract, port, event, or anti-corruption adapter.

Canonical architecture and documentation routing:

- [docs/ai-index.md](docs/ai-index.md): start here for AI/document routing.
- [docs/README.md](docs/README.md): documentation topology.
- [docs/architecture/ddd-hexagonal-standard.md](docs/architecture/ddd-hexagonal-standard.md): runtime and governance standard.
- [docs/domains/context-map.md](docs/domains/context-map.md): context relationships.

## Current Bounded Contexts

| Context                 | Domain                | Type       | Responsibility                                                       |
| ----------------------- | --------------------- | ---------- | -------------------------------------------------------------------- |
| `identity-access`       | Identity and Access   | Supporting | Principal identity and foundational identity contracts               |
| `account`               | Account Management    | Core       | Accounts, memberships, invitations, and teams                        |
| `repository`            | Repository Governance | Core       | Repository scope, roles, grants, and access decisions                |
| `issues`                | Issues                | Core       | Issues inside repository collaboration scope                         |
| `projects`              | Projects              | Core       | Account-owned planning of typed Issue references and Draft Items     |
| `enterprise-governance` | Enterprise Governance | Core       | Cross-Organization affiliation and Repository visibility constraints |

`master-template` is an engineering reference template, not a product Bounded Context, product
capability or world-model node.

`discussions`, `notifications`, `search`, `activity-feed`, and `audit` remain explicitly marked
prototypes in their manifests. Directory presence does not imply semantic or runtime approval.

## Creating a Bounded Context

After owner, domain, subdomain, and type are approved:

```bash
pnpm generate:context \
  --context <kebab-case-name> \
  --domain <domain-name> \
  --subdomain <subdomain-name> \
  --type <core|supporting|generic> \
  --owner <owner> \
  --problem <approved-problem> \
  --first-use-case <approved-use-case> \
  --source-of-truth <comma-separated-models>
```

Then define the first use case and run:

```bash
pnpm arch:check
```

## Technology Baseline

- TypeScript 5
- Node.js 22 in CI
- Next.js App Router 16.2.10
- React 19.2.4
- shadcn 4.13.0
- Tailwind CSS 4
- pnpm 10.34.5
- Turborepo 2.10.4
- Vitest, Playwright, Dependency Cruiser, Semgrep

Next.js in this repository may differ from common public examples. Before writing Next.js code, read the relevant local guide under `node_modules/next/dist/docs/`.

## AI-Assisted Engineering

Codex behavior is governed by [AGENTS.md](AGENTS.md) and [.codex/AGENTS.md](.codex/AGENTS.md). Repository-specific skills live in `.agents/skills/`.

Serena, Codex, Context7, OpenAI Developers, and Vercel tooling are engineering workflow tools, not product runtime dependencies unless an owning document and runtime adapter explicitly say otherwise.
