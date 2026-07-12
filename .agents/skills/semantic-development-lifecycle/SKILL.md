---
name: semantic-development-lifecycle
description: Enforce the repository workflow from approved product semantics through docs, ownership, scaffold, inside-out implementation, composition, and verification.
---

Read `docs/engineering/semantic-development-workflow.md` completely and execute its
G0-G7 gates in order for every product behavior or architecture-boundary change.
Do not scaffold before semantics, canonical documents, owner and path are approved.
Do not implement Infrastructure or UI before Domain invariants and Application Ports.
Use the existing `repo-explore-first`, `repo-docs-maintenance`,
`serena-semantic-workflow`, `scaffold-bounded-context`,
`architecture-boundary-audit`, and `verification` skills only at the gate where
their responsibility applies. Report evidence for every completed gate and mark
unmet gates as blocked instead of skipping them.

For ADR 0008 migrations, finish the architecture control plane first. Read
`docs/architecture/context-topology-migration.json`; do not move runtime while generators, validators, import rules,
Semgrep, skills or commands still describe the legacy tree. New work uses layer/subdomain topology and `public-api.ts`.

At G3-G6, a cross-context requirement must identify the consumer Port, provider Published Language, consumer
Infrastructure ACL mapper and app server-composition wiring. Reject direct provider imports from Domain, Application,
Contracts or Presentation even when the target is a public contract.
