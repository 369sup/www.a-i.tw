# Repository stability and product-model assessment

日期：2026-07-11  
狀態：Current / product discovery required

## Evidence

- GitHub default branch is `main`; no open issues were present during this
  assessment.
- Three independent Dependabot pull requests remain open: React, React DOM, and
  `@types/node`. They are mergeable, but require their own CI evidence before
  merge.
- The deployable app currently exposes the stock Next.js landing page and an
  internal Fumadocs surface. No product PRD, approved user problem, bounded
  context, application contract, persistence model, or production integration
  has been declared.

## Product-model decision

The repository is a platform-ready foundation, not yet a product runtime. The
first product slice must not be inferred from the landing page or GitHub
metadata. Before implementing business behaviour, record the user problem,
success measure, owner, bounded context, ubiquitous language, use case,
acceptance criteria, and public contract in the product and architecture docs.

## Stability actions

- CI now runs the release metadata gate as well as code, documentation,
  architecture, build, and Semgrep gates.
- The web typecheck explicitly generates Next typed routes before TypeScript
  validation.
- `SECURITY.md` and `CONTRIBUTING.md` define the release and disclosure paths
  enforced by the release gate.
- `.codex/config.toml` is ignored because it is machine-local connection
  configuration, not product source.

## Folder-tree plan

```text
apps/web/                 deployable presentation and composition root
modules/<bounded-context>/ domain, application, contracts, infrastructure
packages/                 shared UI, configuration, and deterministic test kits
tests/                    architecture and end-to-end product evidence
docs/                     product decisions, contracts, runbooks, and status
scripts/                  machine-enforced repository gates
```

Create `modules/<bounded-context>` only via `pnpm generate:context` after the
product-model decision is approved. Keep routes and UI free of business rules;
they consume the context's application facade or published contracts.
