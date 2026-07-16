---
name: semantic-development-lifecycle
description: Enforce the repository workflow from approved product semantics through docs, ownership, scaffold, inside-out implementation, composition, and verification.
---

Read `docs/engineering/semantic-development-workflow.md` completely and execute its
G0-G7 gates in order for every product behavior or architecture-boundary change.
Do not scaffold before semantics, canonical documents, owner and path are approved.
Do not implement Infrastructure or UI before Domain invariants and Application Ports.
Use the existing `repo-explore-first`, `repo-docs-maintenance`, configured
Serena semantic tools, `scaffold-bounded-context`,
`architecture-boundary-audit`, and the official Vercel plugin's `verification` skill only at the gate where
their responsibility applies. Report evidence for every completed gate and mark
unmet gates as blocked instead of skipping them.

Activation and short-circuit:

- Trigger this workflow only when behavior semantics, ownership, or architecture boundaries are being changed.
- For narrow fixes with no semantic or boundary change, keep `repo-explore-first` routing and focused verification only.
- When a required gate input is missing, stop at that gate and report blocked status instead of forcing downstream gates.

For ADR 0011 migrations, finish the architecture control plane first. Read
`docs/architecture/context-topology-migration.json`; every Context uses templateVersion 2 with capability-oriented
Domain structure and `contracts/vN/public.ts` Published Language.

At G3-G6, a cross-context requirement must identify the consumer Port, provider Published Language, consumer
outbound Adapter integration mapper and app server-composition wiring. Reject direct provider imports from Domain or
Application even when the target is a public contract.
