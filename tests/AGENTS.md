# Test rules

## Closed topology and non-waiver

```text
tests/
├── architecture/ # cross-cutting topology/dependency fixtures and rules
├── e2e/          # accepted user-visible flows
├── AGENTS.md
└── README.md
```

- Root entries MUST match this tree exactly; unit and Context-local tests MUST remain with their runtime owner.
- MUST NOT adopt an alternative structure, simplify suites, add a generic test bucket, or move implementation-private
  tests away from their owner.
- MUST NOT bypass failures through skip/only, deleted assertions, weaker fixtures, excessive mocks, changed production
  behavior, or removal from aggregate gates/CI.
- Flaky, temporary, prototype, migration, environment-only, and test-only status never waives deterministic evidence;
  isolate or report the cause instead of weakening the invariant.

## Scope and hard rules

- Test observable contracts and invariants, not private implementation structure.
- Use `*.test.ts` for unit/architecture tests and `<flow>.spec.ts` for Playwright flows; fixture names describe the boundary being accepted or rejected.
- A defect fix requires a regression case when the behavior is reproducible.
- Mocks, stubs, and fakes isolate unstable I/O only; prefer real value objects, policies, and use cases for business behavior.

## Prohibited actions

- Do not delete, skip, weaken, over-mock, or rewrite production logic merely to make a test pass.
- Do not encode a second product model in fixtures or depend on uncontrolled external services.
- Do not assert incidental call order or private fields when a public outcome is available.

## Required workflow

1. Identify the observable behavior and owning test level.
2. Add the smallest positive case and the nearest high-value negative/boundary case.
3. For architecture rules, add deterministic valid and invalid fixtures with actionable failure text.
4. Run the focused test before broader verification.

## Validation and Definition of Done

- Expand from the owning test to `pnpm test`, `pnpm arch:check`, or `pnpm test:e2e` according to scope.
- Done means the regression or invariant is demonstrated, test data is deterministic, and no unrelated suite was weakened.
