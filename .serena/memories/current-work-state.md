# Current Work State
## Objective
Correct the Enterprise settings slice so it follows the repository's Domain-Driven Modular Monolith, Hexagonal Architecture, public-boundary rules, and the normative tactical naming contract in apps/web/src/modules/AGENTS.md.
## Scope
Enterprise Account, Administrative Access Control, Policy Governance, final App Router composition, Context Map metadata, canonical architecture documentation, tactical naming enforcement, focused tests, and Serena checkpoint only. Unrelated dirty work remains untouched.
## Confirmed Decisions
`public-api.ts` is the application-internal app-facing public boundary. `contracts/vN/public.ts` is the formal versioned language published to peer Contexts. Peer calls use a consumer-owned Application Port plus `adapters/outbound/integrations` ACL importing only the provider contract. The module topology and angle-bracket artifact names in `apps/web/src/modules/AGENTS.md` are normative; nearby legacy filenames and a green checker never override them. Before creating an artifact, classify owner, approved capability/use case, layer, tactical category, role, consumers, and contract.
## Completed
Reduced the Enterprise route page to final composition; moved Context-owned UI and form mapping into inbound adapters; moved transport-neutral view models to `application/dto`; split server-action mapping into one explicitly named action per file; changed the task slice to kebab-case filenames without legacy `.port.ts` or `.adapter.ts` suffixes. Replaced direct Enterprise Application-service injection with consumer-owned Administrative and Policy ACL adapters over `EnterpriseAccountDirectoryApiV1`. Documented the two public surfaces. Added topology guards that require kebab-case `.tsx` files in inbound UI and kebab-case `.ts` files in server-actions, plus regression tests. Added an artifact-classification and green-check limitation rule to the module AGENTS contract.
## In Progress
Final reporting only.
## Pending
The repository still has legacy dotted tactical filenames outside this task slice. Do not mass-rename them incidentally; enforce additional leaf categories only through a scoped migration with regression tests. No change to closed templateVersion 2 is approved.
## Modified Files
Task-owned changes are under `apps/web/src/app/(console)/settings/enterprises`; Enterprise Account inbound UI, server-actions, DTO, Port, integration adapter, public API and tests; Administrative Access Control Port/ACL/service/composition/tests/manifest; Policy Governance inbound UI/server-action, Ports/ACL/composition/public API/tests/manifest; `apps/web/src/composition/product-composition.ts`; `apps/web/src/modules/AGENTS.md`; `scripts/architecture/check-context-target-topology.mjs`; `tests/architecture/src/dependency-rules.test.ts`; `docs/architecture/context-internal-topology.md`; and `docs/domains/context-map.json`. Other dirty files pre-existed and remain unrelated.
## Git Anchor
Branch: main. HEAD: 1f1fe2e7684de486e9221fa8e5f1854b674960bb. Working tree remains dirty with both this slice and unrelated pre-existing App Router, authentication, search, architecture, E2E, Playwright artifact, and Repository semantic changes.
## Validation
Serena diagnostics reported no errors for 22 changed Enterprise, Policy, Administrative ACL, composition, route, and architecture-test files. Web tests passed: 56 files, 129 tests. Typecheck passed. Next.js 16.2.10 production build passed with 28 routes. Full architecture check passed, including 85 architecture tests and the new naming regressions. docs:check passed. Earlier Semgrep completed with 0 findings across 490 targets. git diff --check passed and the focused diff was inspected.
## Known Risks
The working tree contains substantial unrelated changes, so broad diff statistics are not task-isolated. The naming guard intentionally covers only the two exact leaf categories implicated by this deviation; broader legacy naming debt remains explicit rather than being silently rewritten.
## Next Action
For every new module artifact, read the nearest AGENTS contract first, classify it against the exact placeholder before editing, and distinguish unchecked natural-language rules from mechanically enforced rules.