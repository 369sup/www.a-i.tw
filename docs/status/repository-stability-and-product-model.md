# Repository stability and product-model assessment

日期：2026-07-11  
狀態：Current / product discovery required

## Evidence

- GitHub default branch is `main`. A connector-backed inspection on 2026-07-11
  found no open issues or pull requests reachable for `369sup/www.a-i.tw`.
  Re-run GitHub triage before a release; remote state is intentionally not
  inferred from this dated document.
- The local `main` checkout was aligned with `origin/main` when assessed. The
  reusable `make status` / `pnpm task:status` command reports branch, upstream,
  ahead/behind counts, and origin so unpublished commits cannot be mistaken for
  a clean worktree.
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
.codex/                   Codex guidance, prompt, profile, and MCP templates
scripts/architecture/     boundary and dependency enforcement
scripts/generators/       deterministic project scaffolding
scripts/migration/        reviewable one-off migrations
scripts/validation/       repeatable local status, diagnostics, and validation
```

Create `modules/<bounded-context>` only via `pnpm generate:context` after the
product-model decision is approved. Keep routes and UI free of business rules;
they consume the context's application facade or published contracts.

## Follow-through order

1. Run `make doctor` and `make status` before starting work; resolve any
   ahead/behind divergence before using a release gate.
2. Use GitHub triage to confirm open PRs, reviews, issues, and workflow status;
   treat dated status documents only as historical evidence.
3. The proposed Identity & Access, Account, and Repository research lives in
   `docs/initiatives/identity-access-v1/` and `docs/domains/`. It is not a runtime context or an
   approved product decision until an owner, first use case, acceptance criteria,
   ADR, contract, and context manifest are recorded.
4. Validate changed documentation with `make verify-docs`; validate runtime or
   boundary changes with `make verify-runtime`; use `make release` before
   publishing a release candidate.
