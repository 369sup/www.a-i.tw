# Automation rules

## Closed topology and non-waiver

```text
scripts/
├── architecture/ # deterministic architecture/topology gates
├── validation/   # docs, environment, release, status, task orchestration
├── AGENTS.md
└── README.md
```

- Root entries MUST match this tree exactly; every script MUST belong to architecture enforcement or validation.
- MUST NOT adopt an alternative structure, simplify a required gate, add a generic script bucket, or encode product
  semantics as automation policy.
- MUST NOT bypass non-zero failures, positive/negative fixtures, canonical package entrypoints, aggregate gates, or CI.
- Temporary, local-only, migration, emergency, and environment-specific scripts never justify silent failure,
  destructive defaults, broad exclusions, or weakened validation.

## Scope and hard rules

- Scripts enforce repository policy; they do not define product semantics or silently mutate canonical truth.
- Inputs, expected working directory, dependencies, outputs, and side effects must be explicit.
- Checks are deterministic, idempotent, fail closed with non-zero status, and emit the first actionable root cause.
- New rejection rules require focused positive and negative fixtures where practical.

## Prohibited actions

- Do not embed passwords, tokens, credentials, private connector state, or production data.
- Do not ignore failures, weaken a gate for host convenience, or use broad exclusions to hide one false positive.
- Do not add destructive or external-state behavior without explicit confirmation, dry-run/rollback semantics, and authorization.

## Required workflow

1. Confirm the script owner and canonical package entry point.
2. Validate working directory and required tools before performing work.
3. Add focused fixtures and actionable error text.
4. Run the direct script before the aggregate gate.

## Validation and Definition of Done

- Architecture checker changes require focused tests and `pnpm arch:check`.
- Validation changes require their direct command and `pnpm docs:check` when documentation is affected.
- Done means repeated execution is safe, failures remain visible, Windows limitations are documented, and no canonical fact is silently rewritten.
