# www.a-i.tw

Next.js 16 + shadcn UI monorepo using a Domain-Driven Modular Monolith with Hexagonal Architecture.

## Development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

主要驗證命令：

```bash
pnpm check
pnpm arch:check
pnpm docs:check
pnpm semgrep
pnpm build
pnpm test:e2e
```

## 架構

**Domain-Driven Modular Monolith with App-Local Bounded Contexts and Hexagonal Architecture（Ports and Adapters）**

本專案採用以 Strategic DDD 為核心的模組化單體架構。所有正式產品 Bounded Context 均位於同一個可部署的 Next.js 應用程式內，透過明確的語言、所有權、契約與依賴規則維持模組邊界。

### 核心架構原則

- **Domain-Driven Design**: Domain Vision、Business Capability Map、Subdomain Classification、Bounded Context Catalog、Ubiquitous Language、Context Map、Published Language。
- **Modular Monolith**: `apps/web` 是目前唯一的產品部署單元；Bounded Context 是模組化、語言、一致性與 ownership boundary；Context 不拆成獨立服務，但禁止透過內部實作直接耦合。
- **Hexagonal Architecture / Ports and Adapters**: Domain 不依賴框架、SDK、Application 或 Infrastructure；Application 擁有 use case、command、query 與 ports；Infrastructure 實作 outbound ports；Presentation 負責 transport、validation、view mapping 與 use-case invocation；Composition Root 負責具體 adapter wiring。
- **Cross-context Integration**: 跨 Context 只能依賴發布方的 versioned contracts、Published Language、Open Host Service、Customer/Supplier 或 Anti-Corruption Layer 等 approved Context Map patterns；Consumer 端自行擁有 ACL、port 與業務決策。

Dependency direction:

```text
Presentation / Infrastructure
              ↓
         Application
              ↓
           Domain
```

Canonical architecture and documentation routing live in [`docs/README.md`](docs/README.md) and [`docs/ai-index.md`](docs/ai-index.md).

## Runtime Topology

```text
apps/web/
├── content/docs/                         # 公開 Fumadocs 文件
└── src/
    ├── app/
    │   ├── (public)/                     # 公開網站、文件與公開 endpoints
    │   └── (console)/                    # 產品工作區與操作介面
    ├── presentation/                     # 跨 Context inbound adapters
    ├── server/
    │   └── composition/                  # 唯一 concrete adapter wiring root
    └── modules/
        └── <bounded-context>/
            ├── context.json              # Context ownership 與 dependency manifest
            ├── src/
            │   ├── domain/
            │   ├── application/
            │   ├── contracts/
            │   ├── infrastructure/
            │   ├── presentation/
            │   ├── public.ts
            │   └── composition.ts
            └── tests/
```

## Repository Topology

```text
apps/              # 可部署應用、app-local Context、composition、experience
packages/          # Context-neutral technical packages
tests/             # Architecture 與 end-to-end tests
docs/              # 內部 canonical product、domain、architecture、operations 文件
scripts/           # Architecture、validation、migration 與 release gates
.agents/           # Repository-owned agent skills 與 scaffolding
.codex/            # Codex rules、prompts、profiles 與 plugin policy
.serena/           # Semantic navigation 與非 canonical memories
.semgrep/          # Static analysis 與 architecture rules
.github/           # CI、CODEOWNERS、PR 與 security workflows
```

Workspace packages:

- `apps/web`: 唯一 deployable Next.js product 與 `/docs` Fumadocs surface。
- `packages/ui`: shared shadcn primitives and presentation utilities。
- `packages/eslint-config`: shared Next.js lint configuration。
- `packages/typescript-config`: shared TypeScript bases。
- `packages/testing-kit`: deterministic Clock and ID-generator test doubles。
- `tests/e2e`: Playwright product-flow tests。

`packages/*` 只承載 context-neutral technical capabilities。Domain、Application、Contracts、Infrastructure 與產品語意必須保留在 owning Bounded Context 中。

## 現有 Bounded Contexts

| Bounded Context | Domain | Subdomain 類型 | 主要責任 |
| --- | --- | ---: | --- |
| `master-template` | Template Management | Supporting | Bounded Context 與 internal subdomain 的架構範本 |
| `identity-access` | Identity and Access | Supporting | Principal identity 與基礎身分契約 |
| `account` | Account Management | Core | Account、Membership、Invitation 與 Team |
| `repository` | Repository Governance | Core | Repository scope、角色、grant 與存取決策 |
| `work-management` | Work Management | Core | Repository collaboration scope 內的工作管理 |

## Creating a Bounded Context

The repository does not keep a live example context. Once the context owner, domain, subdomain, and type are approved, generate the empty but verified workspace:

```bash
pnpm generate:context \
  --context <kebab-case-name> \
  --domain <domain-name> \
  --subdomain <subdomain-name> \
  --type <core|supporting|generic> \
  --owner <owner>
```

Then define the first use case and run `pnpm arch:check` before exposing it to the web application.

## 技術棧

### Application Runtime

| 類別 | 技術 | 版本／狀態 | 用途 |
| --- | --- | ---: | --- |
| Language | TypeScript | `^5` | Domain、Application、Infrastructure 與 UI 實作 |
| Runtime | Node.js | `22` in CI | Next.js、build、tests 與 validation scripts |
| Web Framework | Next.js App Router | `16.2.10` | Routing、React Server Components、Server Actions 與應用部署 |
| UI Runtime | React | `19.2.4` | Component 與 server/client rendering |
| UI Runtime | React DOM | `19.2.4` | Web rendering |
| Schema Validation | Zod | `4.4.3` | Input、contract 與 schema validation |

### UI 與 Design System

| 技術 | 版本／狀態 | 用途 |
| --- | ---: | --- |
| shadcn | `^4.13.0` | UI component distribution 與 configuration |
| Base UI React | `^1.6.0` | Headless accessible UI primitives |
| Tailwind CSS | `^4` | Utility-first styling |
| `@tailwindcss/postcss` | `^4` | Tailwind PostCSS integration |
| Class Variance Authority | `^0.7.1` | Component variants |
| `tailwind-merge` | `^3.6.0` | Tailwind class conflict resolution |
| `clsx` | `^2.1.1` | Conditional class composition |
| `tw-animate-css` | `^1.4.0` | CSS animations |
| Lucide React | `^1.24.0` | Icon system |

共享 UI primitives 位於 `packages/ui`，屬於 context-neutral presentation capability，不承載產品 Domain semantics。

### 文件與內容

| 技術 | 版本／狀態 | 用途 |
| --- | ---: | --- |
| Fumadocs Core | `latest` | Documentation data、navigation 與 headless capabilities |
| Fumadocs MDX | `latest` | MDX compilation 與 Next.js integration |
| Fumadocs UI | `latest` | Documentation presentation components |
| MDX | - | 公開產品與架構文件內容格式 |

公開文件位於 `apps/web/content/docs/`；內部 canonical governance 文件位於 `docs/`，兩者具有不同 ownership。

> `fumadocs-*` 目前使用 `latest`，會降低 dependency reproducibility。正式 release 建議改為明確版本。

### Monorepo 與 Build System

| 技術 | 版本 | 用途 |
| --- | ---: | --- |
| pnpm | `10.34.5` | Package manager 與 workspace management |
| Turborepo | `^2.10.4` | Dependency-aware task graph、build orchestration 與 caching |
| pnpm Workspaces | - | 管理 `apps/*`、`packages/*`、`tests/*` |
| Corepack | - | Package-manager version activation |

Turborepo 管理 build dependency graph、Next.js build outputs、lint/typecheck、unit/architecture tests、coverage artifacts 與 persistent uncached development server。

### 程式品質與格式

| 技術 | 版本 | 用途 |
| --- | ---: | --- |
| ESLint | `^9` | Static linting |
| eslint-config-next | `16.2.10` | Next.js 與 React lint rules |
| `@a-i/eslint-config` | Workspace package | 共用 base 與 Next.js lint configuration |
| Prettier | `3.9.5` | Code formatting |
| eslint-config-prettier | `10.1.8` | 避免 ESLint 與 Prettier 規則衝突 |
| `@a-i/typescript-config` | Workspace package | 共用 TypeScript、Next.js 與 React library configuration |

### 測試

| 技術 | 版本 | 用途 |
| --- | ---: | --- |
| Vitest | `4.1.10` | Unit、integration 與 architecture tests |
| V8 Coverage | `4.1.10` | Test coverage |
| Playwright | `1.61.1` | End-to-end product-flow tests |
| Testing Library React | `16.3.2` | React component behavior tests |
| Testing Library DOM | `10.4.1` | DOM assertions 與 interactions |
| Testing Library User Event | `14.6.1` | User interaction simulation |
| Jest DOM | `6.9.1` | DOM matchers |
| jsdom | `28.1.0` | Browser-like test environment |
| `@a-i/testing-kit` | Workspace package | Deterministic Clock 與 ID-generator test doubles |

### 架構與安全治理

| 技術 | 版本／狀態 | 用途 |
| --- | ---: | --- |
| Dependency Cruiser | `18.0.0` | Import graph 與 dependency-boundary enforcement |
| Semgrep | CI-installed | Security、architecture 與 repository-specific static analysis |
| Custom Node.js validators | Repository scripts | Context manifest、topology、exports、workspace 與 documentation checks |
| Architecture Tests | Vitest workspace | Executable architecture policies |
| GitHub Actions | CI | Pull request 與 `main` branch validation |

CI 使用 Node.js 22、Python 3.12、pnpm 10.34.5、Playwright Chromium 與 Semgrep。

## Architecture Governance

架構邊界由下列機制強制執行：

- Context manifest validation
- Repository topology validation
- Package export validation
- Workspace dependency validation
- Cross-context import validation
- Dependency Cruiser import graph rules
- Vitest architecture tests
- Semgrep architecture and security rules
- Documentation consistency checks
- Release verification gates

## AI-assisted Engineering

| 工具 | 定位 |
| --- | --- |
| Serena | Semantic code navigation、project memories 與 refactoring context |
| Codex repository rules | Agent behavior、architecture rules 與 implementation workflow |
| Repository-local Agent Skills | Scaffolding、verification、Next.js、Vercel 與 semantic workflows |
| OpenAI Developers | 開發與研究輔助工具；目前不是產品 runtime dependency |
| Context7 | 查詢 framework、library 與 SDK 官方文件；目前不是 repository dependency |

## Deployment

| 技術 | 定位 |
| --- | --- |
| Vercel | Next.js 預定部署平台 |
| Next.js Build Output | 唯一 deployable application 為 `apps/web` |
| GitHub Actions | CI validation 與 release readiness gates |

Vercel、Serena、Codex、Context7 與 OpenAI Developers 應歸類為部署或工程工作流程工具，不應與產品 runtime dependencies 混列。
