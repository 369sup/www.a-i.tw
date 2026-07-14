# Repository product-language normalization evidence

狀態：Implemented 2026-07-14

## Decision

GitHub product and Domain language has `Repository` but no local `Workspace` resource. The web application therefore
uses `/repositories` as its authenticated Repository-management route, `repository-console` for presentation adapters,
and `product-composition` for the application wiring root. The route remains an Experience adapter and does not own a
new Domain concept.

`Workspace` is prohibited in `apps/web/src` TypeScript paths, identifiers, URLs, UI copy, and accessibility labels.
The term remains valid only when it explicitly means a package-manager/build workspace, a CodeQL workspace, or a
potential independently deployed engineering unit.

## Changed surfaces

- App Router segment: `(console)/workspace` → `(console)/repositories`, exposed as `/repositories`.
- Presentation adapter: `presentation/workspace` → `presentation/repository-console`.
- Composition root: `product-workspace.ts` / `getProductWorkspace` →
  `product-composition.ts` / `getProductComposition`.
- Browser acceptance suite: `tests/e2e/product-workspace` → `tests/e2e/repository-management`.
- Architecture policy: `arch:source` rejects the prohibited product term in web TypeScript source and has positive and
  negative coverage.

No compatibility `/workspace` route or redirect is retained, because retaining that product URL would preserve the
ambiguous model this change removes.

## Canonical owners

- Product route and presentation terminology: `docs/experience/information-architecture.md`.
- Repository Domain meaning: `docs/domains/repository.md` and `docs/domains/ubiquitous-language.md`.
- Migration state: `docs/roadmap/context-migration-roadmap.md`.

## Verification

Verification results are recorded in the implementation handoff after focused architecture, tests, docs, typecheck,
lint, build, and browser acceptance checks run.
