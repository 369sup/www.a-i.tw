# Technical package rules

## Closed topology and non-waiver

```text
packages/
├── eslint-config/
├── shadcn/
├── testing-kit/
├── typescript-config/
├── AGENTS.md
└── README.md
```

- Root entries MUST match this tree exactly; every package directory MUST contain `package.json` and remain flat.
- MUST NOT adopt an alternative structure, simplify package ownership, add a category/umbrella package, or move
  product Domain, Application, contract, Adapter, persistence, or orchestration into a technical package.
- MUST NOT bypass declared exports, workspace dependency direction, package-local checks, architecture gates, or CI.
- Temporary sharing, migration convenience, prototype reuse, and test-only reuse never waive product ownership.

## Scope and hard rules

- Each package owns one context-neutral technical capability with an explicit consumer, public export, and verification surface.
- Packages remain flat and use precise capability names such as `shadcn`, `testing-kit`, `eslint-config`, or `typescript-config`.
- Consumers import through declared package exports; packages must not depend on `apps/` or Context internals.

## Prohibited actions

- Do not create product-layer packages named `application`, `contracts`, `domain`, `foundation`, or `infrastructure`.
- Do not create umbrella `tooling`, `shared`, `common`, `core`, `utils`, or `helpers` packages.
- Do not introduce package cycles, deep imports, UI/database/framework dependencies into business models, or duplicate product logic.

## Required workflow

1. Confirm the capability cannot be owned by one Bounded Context.
2. Define or update the minimal `package.json` export surface.
3. Update only explicit consumers and add package-local tests.
4. Check workspace direction and exports before handoff.

## Validation and Definition of Done

- Run `pnpm --filter <workspace-package> test` and `pnpm --filter <workspace-package> check`.
- Dependency or export changes also require `pnpm arch:workspaces`, `pnpm arch:exports`, and `pnpm arch:check` when architecture scope changes.
- Done means ownership is explicit, no cycle or deep import exists, exports are minimal, and product behavior remains app-local.
