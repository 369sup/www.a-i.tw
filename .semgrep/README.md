# Static policy rules

## Purpose and scope

`.semgrep/` contains deterministic security and architecture rules. Rules inspect source; they do not own product semantics or replace tests, type checking, or architecture gates.

Its root file set is closed and machine-enforced by `pnpm arch:topology`; new policy files require an explicit owner and coordinated checker coverage.

## Rule sets

| File               | Current coverage                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `ci.yml`           | credential-like literal rejection                                                             |
| `architecture.yml` | Domain framework isolation, forbidden ownership-free folders, and cross-Context import policy |

## Commands

```text
Focused: semgrep scan --config .semgrep/architecture.yml apps packages scripts
Project: pnpm semgrep
CI:      .github/workflows/security.yml
```

Each rule uses a precise ID, actionable message, explicit severity, and the narrowest viable pattern. Add positive and negative fixtures where practical; test the focused target before the project scan.
