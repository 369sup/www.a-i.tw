# GitHub non-Code 37-Context prototype completion

狀態：Approved / implementation in progress

## Outcome and completion rule

Make every Context in the closed six-Group, twelve-Area, 37-Context portfolio usable through at least one verified
in-memory vertical slice and one Web flow. This initiative does not claim complete GitHub product parity or durable
persistence.

A Context is complete only when its official evidence, owner, first use case, source of truth, invariants, Domain,
Application Ports, Adapters, composition, Web flow, focused tests, Playwright acceptance, Serena diagnostics and dated
evidence are verified. Runtime truth remains owned by each `context.json`, `docs/domains/context-map.json`, source,
tests and dated evidence.

## Current state

- Manifest authority: 37 descriptors = 18 approved/current + 3 prototype/in-memory-prototype + 16 planned/none.
- Runtime Context Map: 21 Contexts.
- Wave 0: baseline audit complete; Store-Port and Domain-test gaps repaired; 11/20 original runtime Contexts have a
  direct Playwright spec.
- Wave 1: Network & Domain Governance passed G4-G7 on 2026-07-16. Enterprise Identity Management is the next
  independent slice; Enterprise Participation follows.
- Waves 2-5: G1-G3 decisions and implementation remain pending.

## Delivery waves

| Wave | Contexts                                                                              | Gate                                          |
| ---: | ------------------------------------------------------------------------------------- | --------------------------------------------- |
|    0 | Original 20-runtime ADR 0014 baseline                                                 | Audit complete; direct acceptance gaps remain |
|    1 | Enterprise Identity Management, Enterprise Participation, Network & Domain Governance | Network & Domain complete; other two pending  |
|    2 | Plan & Entitlement, Billing & Payments, Usage & Cost, Sponsorship                     | G1-G3 approval before promotion               |
|    3 | Webhook Delivery, Marketplace, Support Management                                     | G1-G3 approval before promotion               |
|    4 | Education Eligibility, Campus Program, Campus Experts                                 | G1-G3 approval before promotion               |
|    5 | Community Exchange, Classroom Management, Certification, Developer Program            | G1-G3 approval before promotion               |

Load only the artifact required by the current task:

- [`completion-matrix.md`](completion-matrix.md) — current 37-row delivery ledger; use only for portfolio audit or
  status updates.
- [`wave-1-enterprise-governance.md`](wave-1-enterprise-governance.md) — approved G1-G3 interfaces, relationships,
  routes, failures and exclusions for Wave 1.
- [`gap-audit.md`](gap-audit.md) — historical Wave 0 baseline and dated validation evidence.

## Low-context execution protocol

1. Work on one Context per implementation task and permit only one writer in the shared worktree.
2. Read this short entry, the target wave section, the target Context owner files and `context.json`; do not load the
   37-row matrix unless performing a portfolio audit.
3. Query the centralized evidence ledger by evidence ID; do not reload the complete GitHub semantic inventory unless
   the target evidence is missing or contradictory.
4. Limit semantic discovery to the target use cases, their 3-6 core symbols, actual consumers and declared
   relationships. Do not preload complete composition bodies, test inventories or directory trees.
5. Run changed-file diagnostics and focused tests per Context. Run architecture, docs, typecheck, build, Semgrep and
   selected E2E once per wave unless a change crosses those boundaries earlier.
6. Stop a no-progress test after 60 seconds, allow one low-concurrency retry, then record an environment blocker.
7. Complete the production build before Playwright evidence runs; use a fresh, serial evidence server until
   in-memory stores are isolated.
8. Checkpoint after each completed Context with one exact next action.

## Control-plane and blockers

- `pnpm generate:context -- --promote true` supports prototype promotion with staging, rollback and regression tests.
- Complete GitHub parity and the 3,152-URL inventory remain a separate research gate.
- Code, Git, Pull Request, Actions, autograding, Repository contents, Certification training content and submitted
  Developer integration implementation remain excluded.
- `pnpm arch:topology` remains blocked by missing required governance-root `README.md` files. This baseline must be
  repaired before final `pnpm task:verify:all` acceptance.
- The configured Serena, Context7, shadcn, Filesystem and Git MCP servers were not exposed in the review task. A new
  implementation task must perform the required capability handshake before semantic code work.
