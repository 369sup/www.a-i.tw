# Login, Session, Profile and Dashboard 30-concern closure

日期：2026-07-12  
狀態：Verified current in-memory baseline

## Scope

This slice connects Login, Session and Profile through Principal and Account, and formalizes the path from an
Unauthenticated Visitor to the Personal Dashboard. Profile remains a representation surface, not a login step.

## 30 concerns

1. Domain Vision — aligned with authenticated collaboration.
2. Business Capability Map — Login/Profile/Dashboard clarified.
3. Subdomain Classification — Identity supporting; Account core unchanged.
4. Bounded Context Catalog — no new Context.
5. Ubiquitous Language — Login, Session, Profile and Personal Dashboard clarified.
6. Context Map — Identity upstream of Account remains valid.
7. Integration Contracts — `LoginSessionV1` Identity-owned; Profile Account-owned.
8. Dependency Policy — adapters depend inward only.
9. Upstream/Downstream Matrix — relationship unchanged.
10. Module Catalog — Identity and Account extended.
11. Module Boundary Policy — no cross-context internal import.
12. Module Dependency Graph — no new Context edge.
13. Shared Kernel — none.
14. Ports/Adapters — CredentialVerifier, SessionStore and ProfileStore.
15. Adapter Ownership — mock verifier belongs to Identity Infrastructure.
16. Composition Root — product workspace wires concrete adapters.
17. Aggregate Catalog — Session and Account Profile.
18. Invariants — active Principal and safe Profile fields.
19. Domain Events — none approved for this in-memory slice.
20. Use Cases — Login, Logout, resolve Session/Profile.
21. Data Ownership — session and Profile separated.
22. Transaction Boundary — one Session or Profile per command.
23. Read Model — Dashboard composes purpose-specific models.
24. ADR — ADR 0006.
25. Context Boundary Audit — `pnpm arch:check` passed (161 modules, 259 dependencies; 11 tests).
26. Context Boundary Alignment — Identity/Account ownership and Actor/Scope split verified.
27. Ownership Matrix — team ownership unchanged.
28. Fitness Functions — `pnpm check`, docs/arch, build, Semgrep and four Login-aware E2E passed.
29. Technical Debt — mock auth blocks production.
30. Migration Roadmap — production security and personalization follow.

## Verification

- Serena diagnostics: no warnings/errors in changed TypeScript files.
- `pnpm check`: 25/25 tasks; 18 web tests passed, 1 todo.
- `pnpm docs:check`: passed; all 30 concerns have canonical owners.
- `pnpm arch:check`: passed after sandbox-external retry; initial sandbox run was blocked by `spawnSync EPERM`.
- `pnpm build`: Next.js 16.2.10 production build passed outside sandbox after sandbox Turbopack worker stalled.
- `pnpm semgrep`: 0 findings across 114 targets.
- Playwright: 4/4 Chromium flows passed, including invalid Login, Login/Profile/Logout and console gate.
