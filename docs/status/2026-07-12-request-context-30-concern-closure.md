# Request Context 30-concern closure

日期：2026-07-12  
狀態：Verified current Repository capability-context baseline

1. Domain Vision — supports authenticated modular collaboration.
2. Business Capability Map — Request/Capability resolution is an Experience capability.
3. Subdomain Classification — orchestration only; no new product subdomain.
4. Bounded Context Catalog — no new Context.
5. Ubiquitous Language — Request Envelope, Capability Context and Authorization Decision added.
6. Context Map — existing Identity → Account/Repository edges unchanged.
7. Integration Contracts — provider contracts remain authoritative.
8. Dependency Policy — Experience depends inward on minimal Ports/contracts.
9. Upstream/Downstream Matrix — Experience is downstream.
10. Module Catalog — no module added; presentation orchestration extended.
11. Module Boundary Policy — no provider internals imported.
12. Module Dependency Graph — no new Context edge.
13. Shared Kernel — universal Context Service and giant DTO explicitly rejected.
14. Ports/Adapters — AccountContextPort and RepositoryContextPort.
15. Adapter Ownership — server composition owns facade adapters.
16. Composition Root — dedicated Repository capability-context wiring.
17. Aggregate Catalog — none; immutable read model only.
18. Invariants — server-resolved references, safe metadata, fail closed.
19. Domain Events — none.
20. Use Case Catalog — resolve RepositoryCapabilityContext.
21. Data Ownership — no new authoritative data owner.
22. Transaction Boundary — query only, no cross-context transaction.
23. Read Model — RequestEnvelopeV1 plus RepositoryCapabilityContextV1 registered.
24. ADR — ADR 0007.
25. Context Boundary Audit — 164 app modules and 266 dependencies passed; initial direct imports were removed.
26. Context Boundary Alignment — Experience uses consumer-owned ACL views; Repository remains decision owner.
27. Ownership Matrix — Product Team / Experience orchestration.
28. Fitness Functions — unit, architecture, build, Semgrep and browser evidence passed.
29. Technical Debt — enterprise governance fact and broader capability registry remain planned.
30. Migration Roadmap — capability-by-capability expansion after verification.

## Verification

- Serena diagnostics: no warnings/errors in four changed TypeScript files.
- `pnpm check`: 25/25 tasks; 20 web tests passed, 1 todo.
- `pnpm docs:check`: passed; all 30 concerns retain canonical owners.
- `pnpm arch:check`: 164 app modules, 266 dependencies and 11/11 fixture tests passed. The sandbox run's
  `spawnSync EPERM` was environment-only; the permitted retry passed.
- `pnpm build`: Next.js 16.2.10 production build passed.
- `pnpm semgrep`: 117 targets, zero findings.
- Playwright: 4/4 Chromium flows passed; Inspector rendered the Repository capability context.
