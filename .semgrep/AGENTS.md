# Semgrep rules

## Closed topology and non-waiver

```text
.semgrep/
├── architecture.yml # deterministic architecture violations
├── ci.yml           # deterministic security violations
├── AGENTS.md
└── README.md
```

- Root entries MUST match this tree exactly; Semgrep rules MUST remain in the owning rule set.
- MUST NOT adopt an alternative structure, simplify required rule sets, add an unregistered rules directory, or use
  Semgrep as a second product/architecture specification.
- MUST NOT bypass findings with broad exclusions, disabled rules, severity downgrades, or missing positive/negative
  validation.
- Temporary, prototype, generated, migration, and test-only code receives no security or architecture waiver.

## Scope and hard rules

- Add or change a rule only for a precise, reproducible security or architecture violation.
- Use a stable ID, actionable message, explicit severity, narrow scope, and positive/negative fixtures where practical.
- Architecture rules enforce documented dependency and ownership boundaries; product semantics remain in Domain and canonical docs.

## Prohibited actions

- Do not suppress findings globally, ignore an entire directory for one false positive, or weaken a rule to make unrelated code pass.
- Do not encode secrets or production samples in fixtures.
- Do not create broad ambiguous patterns without measuring false positives against the intended target.

## Required workflow

1. Reproduce the violation and identify its canonical policy owner.
2. Add the narrowest rule plus valid and invalid examples.
3. Run the focused rule against the smallest target and inspect every finding.
4. Expand to the project command only after the focused result is stable.

## Validation and Definition of Done

- Run a focused Semgrep invocation, then `pnpm semgrep` when the environment supports it; documentation changes also require `pnpm docs:check`.
- Done means the intended violation is rejected, nearby valid code passes, suppression is justified and local, and environment-only failures are reported rather than hidden.
