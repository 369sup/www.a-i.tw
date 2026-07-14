# Verification suites

## Purpose and placement

`tests/` owns cross-cutting verification that does not belong beside one implementation unit. Unit and Bounded Context tests remain colocated with their owner.

The root test categories below are closed and machine-enforced by `pnpm arch:topology`; new test kinds must first establish ownership rather than creating another top-level bucket.

```text
tests/
├── architecture/
│   ├── fixtures/ # valid and invalid dependency/topology examples
│   └── src/      # architecture rule tests
└── e2e/
    └── <bounded-context>/<flow>.spec.ts
```

## Test types and commands

| Type               | Purpose                                            | Command                                |
| ------------------ | -------------------------------------------------- | -------------------------------------- |
| Unit/Context-local | observable behavior and invariants                 | `pnpm test` or the owning package test |
| Architecture       | dependencies, topology, exports, manifests         | `pnpm arch:check`                      |
| End-to-end         | accepted user-visible flows                        | `pnpm test:e2e`                        |
| Coverage           | coverage diagnostics, not a correctness substitute | `pnpm test:coverage`                   |

Architecture fixtures use a `valid` case plus narrowly named rejection cases. E2E flows are added only after acceptance criteria and a runtime owner exist; see [`e2e/README.md`](e2e/README.md).

## Working sequence

1. Place the test beside its owner unless it verifies a cross-cutting boundary or end-to-end flow.
2. Reproduce a defect with a failing regression test.
3. Run the narrowest suite, then expand according to blast radius.
