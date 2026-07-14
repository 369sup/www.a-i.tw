# www.a-i.tw

## Purpose and scope

Enterprise product platform built as a Domain-Driven Modular Monolith with Hexagonal Architecture and Ports and Adapters.
The only deployable app is `apps/web`; `packages/*` contains context-neutral technology, not product runtime.

## Prerequisites and quick start

Requirements: Windows 11, Node.js 22, Corepack, and pnpm 10.34.5.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

For Next.js behavior, use the matching guide under `node_modules/next/dist/docs/`.

## Technology baseline

| Layer                       | Current technology                    |
| --------------------------- | ------------------------------------- |
| Runtime and workspace       | Node.js 22, pnpm 10.34.5, Turborepo 2 |
| Web application             | Next.js 16.2.10, React 19.2.4         |
| Documentation               | Fumadocs                              |
| Unit and architecture tests | Vitest 4.1.10                         |
| End-to-end tests            | Playwright 1.61.1                     |
| Static policy               | ESLint, TypeScript, Prettier, Semgrep |

## Common commands

| Need                      | Command           |
| ------------------------- | ----------------- |
| Development               | `pnpm dev`        |
| Unit tests                | `pnpm test`       |
| Type/lint/format checks   | `pnpm check`      |
| Build                     | `pnpm build`      |
| Documentation             | `pnpm docs:check` |
| Architecture and topology | `pnpm arch:check` |
| Static security policy    | `pnpm semgrep`    |
| End-to-end                | `pnpm test:e2e`   |

Use the narrowest command that covers the change, then expand according to blast radius.

## Development workflow

1. Select the owner and read the nearest `AGENTS.md`.
2. Inspect only the relevant source, contract, manifest, consumer, and test.
3. Make the smallest cohesive change.
4. Run the narrowest affected command, then expand according to the root verification matrix.
5. Review the focused Git diff before handoff.

## Architecture and ownership

```text
www.a-i.tw/
├── apps/web/              # deployable app
│   ├── content/docs/      # public Fumadocs content
│   └── src/
│       ├── app/           # Next.js delivery
│       ├── modules/       # Domain Groups and Bounded Contexts
│       ├── presentation/  # cross-Context inbound experiences
│       └── server/composition/ # concrete server-only wiring
├── packages/              # context-neutral technical packages
├── docs/                  # canonical internal knowledge
├── tests/                 # architecture and end-to-end verification
├── scripts/               # deterministic gates and generators
├── .github/               # GitHub/Copilot/CI control plane
├── .agents/               # repository-owned plugin marketplace and skills
├── .codex/                # Codex execution policy
├── .semgrep/              # static policy rules
└── .serena/               # semantic navigation configuration/memories
```

Directory presence does not prove that a capability is approved or runtime-active. Check the owning `context.json`,
Context Map, canonical document, code, tests, and dated evidence.

## Runtime structure

```text
apps/web/src/modules/<domain-group>/<bounded-context>/
├── domain/{aggregate,entity,value-object,policy,event,repository}/
├── application/{port/{in,out},command,query,service}/
├── adapter/{in/{http,graphql,event},out/{persistence,messaging,external}}/
├── contracts/v1/public.ts
├── public-api.ts
└── composition/index.ts
```

Domain Groups organize placement only. Bounded Contexts own language, model, runtime, and Published Language. The exact
tree and dependency rules are documented in [`apps/web/src/modules/README.md`](apps/web/src/modules/README.md) and are
machine-enforced by `pnpm arch:check`.

## Further documentation

| Question                   | Start here                                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| Documentation index        | [`docs/ai-index.md`](docs/ai-index.md)                                                                   |
| Documentation topology     | [`docs/README.md`](docs/README.md)                                                                       |
| Architecture standard      | [`docs/architecture/ddd-hexagonal-standard.md`](docs/architecture/ddd-hexagonal-standard.md)             |
| Context relationships      | [`docs/domains/context-map.md`](docs/domains/context-map.md)                                             |
| Semantic development gates | [`docs/engineering/semantic-development-workflow.md`](docs/engineering/semantic-development-workflow.md) |
