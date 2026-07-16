# Domain Groups, Domain Areas and Bounded Contexts

`modules/` is the product semantic-ownership portfolio and runtime-placement map. `AGENTS.md` owns normative execution
rules; this README is navigation and current-state guidance. The canonical navigation shape is:

```text
apps/web/src/modules/
└── <domain-group>/
    ├── AGENTS.md
    ├── README.md
    ├── group.json
    │
    └── <domain-area>/
        ├── AGENTS.md
        ├── README.md
        ├── area.json
        │
        └── <bounded-context>/
            ├── AGENTS.md
            ├── README.md
            ├── context.json
            ├── public-api.ts
            │
            ├── domain/
            │   └── <domain-capability>/
            │       ├── aggregates/
            │       │   └── <aggregate-root>.ts
            │       ├── entities/
            │       │   └── <entity>.ts
            │       ├── value-objects/
            │       │   └── <value-object>.ts
            │       ├── domain-services/
            │       │   └── <domain-service>.ts
            │       ├── policies/
            │       │   └── <domain-policy>.ts
            │       ├── specifications/
            │       │   └── <specification>.ts
            │       ├── events/
            │       │   └── <domain-event>.ts
            │       └── errors/
            │           └── <domain-error>.ts
            │
            ├── application/
            │   ├── commands/
            │   │   └── <command>/
            │   │       ├── command.ts
            │   │       └── handler.ts
            │   ├── queries/
            │   │   └── <query>/
            │   │       ├── query.ts
            │   │       └── handler.ts
            │   ├── use-cases/
            │   │   └── <use-case>.ts
            │   ├── process-managers/
            │   │   └── <process-manager>.ts
            │   ├── dto/
            │   │   └── <application-dto>.ts
            │   └── ports/
            │       ├── inbound/
            │       │   └── <inbound-port>.ts
            │       └── outbound/
            │           └── <outbound-port>.ts
            │
            ├── contracts/
            │   └── <contract-version>/
            │       ├── public.ts
            │       ├── commands/
            │       │   └── <published-command>.ts
            │       ├── queries/
            │       │   └── <published-query>.ts
            │       ├── events/
            │       │   └── <integration-event>.ts
            │       ├── dto/
            │       │   └── <contract-dto>.ts
            │       └── errors/
            │           └── <contract-error>.ts
            │
            ├── adapters/
            │   ├── inbound/
            │   │   ├── http/
            │   │   │   └── <http-adapter>.ts
            │   │   ├── server-actions/
            │   │   │   └── <server-action>.ts
            │   │   ├── events/
            │   │   │   └── <event-consumer>.ts
            │   │   ├── jobs/
            │   │   │   └── <job-adapter>.ts
            │   │   └── ui/
            │   │       └── <ui-adapter>.tsx
            │   │
            │   └── outbound/
            │       ├── persistence/
            │       │   ├── <repository-adapter>.ts
            │       │   └── <persistence-mapper>.ts
            │       ├── integrations/
            │       │   └── <external-context-adapter>.ts
            │       ├── messaging/
            │       │   └── <message-publisher>.ts
            │       ├── cache/
            │       │   └── <cache-adapter>.ts
            │       └── telemetry/
            │           └── <telemetry-adapter>.ts
            │
            ├── composition/
            │   ├── index.ts
            │   └── <composition-module>.ts
            │
            └── tests/
                ├── domain/
                │   └── <domain-test>.test.ts
                ├── application/
                │   └── <application-test>.test.ts
                ├── adapters/
                │   └── <adapter-test>.test.ts
                ├── contracts/
                │   └── <contract-test>.test.ts
                └── architecture/
                    └── <boundary-test>.test.ts
```

A `planned` Context contains exactly `AGENTS.md`, `README.md`, `context.json`, and `public-api.ts`; it contains no runtime directories.
A non-`planned` Context contains those four files plus the six fixed directories `domain`, `application`, `contracts`, `adapters`, `composition`, and `tests`.

The planned `public-api.ts` publishes only `export {}`. Non-planned Contexts retain empty fixed structural directories
with `.gitkeep`; neither shape proves complete Domain semantics, use cases, Ports, Adapters, contracts or tests.

A Domain Group and its Domain Areas are closed organizational/governance navigation layers and own no runtime. Each
declared Bounded Context is a semantic ownership boundary; only a non-`planned` Context owns implemented runtime, data,
consistency and contracts. Scope and account type remain manifest metadata, not additional directory levels. There is
no `sub-area` or additional `hexagonal-layer` directory.

The matching agent constraints are in [`AGENTS.md`](AGENTS.md). The canonical architecture decision is
[`docs/architecture/context-internal-topology.md`](../../../../docs/architecture/context-internal-topology.md), and
`pnpm arch:check` enforces this topology.

## Boundary guardrails summary

This README remains a navigation and topology summary. Normative execution rules stay in `AGENTS.md`. The following
summary prevents drift and ambiguity:

- Ownership: Domain owns invariants and pure semantics; Application owns use cases, messages, DTOs, process managers
  and Ports; adapters own transport/persistence/integration mapping; contracts own standalone Published Language.
- Dependency direction: inbound adapters -> Application -> Domain, and outbound adapters implement Application-owned
  outbound Ports. Cross-Context calls use consumer-owned Ports and ACL adapters, and may import only provider
  `contracts/vN/public.ts`.
- Entrypoints: `public-api.ts` is app-facing only; peer Contexts must not import it. Peer entrypoint is provider
  `contracts/vN/public.ts`; final cross-Context assembly stays in `apps/web/src/composition`.
- Forbidden escapes: no alternative layer names, no ownership-free shared/common/core/utils/helpers folders, no
  source files in structural parents, no hand-created Contexts, no peer internal imports.
- Anti-placeholder rule: do not create Value Objects, commands, queries, services, adapters, contracts, or tests only
  to populate template categories.

For implementation and review decisions, treat `AGENTS.md` as the authoritative contract and this section as its
high-signal checklist.

## Canonical taxonomy and current runtime placement

| Domain Group          | Domain Area               | Current runtime Contexts                                                              |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `platform-governance` | `accounts-profile`        | `user-account`, `organization-account`, `enterprise-account`, `profile-presence`      |
| `platform-governance` | `authentication-identity` | `authentication-security`                                                             |
| `platform-governance` | `participation-teams`     | `organization-participation`                                                          |
| `platform-governance` | `access-policy`           | `administrative-access-control`, `policy-governance`                                  |
| `collaboration`       | `repository-work`         | `repository-governance`, `work-tracking`, `work-planning`                             |
| `collaboration`       | `community-knowledge`     | `community-safety`, `discussions`, `repository-wiki`                                  |
| `engagement`          | `social-discovery`        | `activity-feed`, `subscriptions-notifications`, `search-discovery`, `social-curation` |
| `ecosystem`           | `apps-marketplace`        | `app-management`                                                                      |
| `business-operations` | `commercial`              | none                                                                                  |
| `business-operations` | `assurance-support`       | `audit-compliance`                                                                    |
| `programs`            | `education`               | none                                                                                  |
| `programs`            | `professional-programs`   | none                                                                                  |

The remaining 17 Contexts are planned descriptors only. A planned directory contains the four governance files, is not
registered in the runtime Context Map, and does not become runtime until explicit G1-G4 approval and promotion.

| Domain Area               | Planned Contexts                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `authentication-identity` | `enterprise-identity-management`                                                                                                   |
| `participation-teams`     | `enterprise-participation`                                                                                                         |
| `access-policy`           | `network-domain-governance`                                                                                                        |
| `apps-marketplace`        | `webhook-delivery`, `marketplace`                                                                                                  |
| `commercial`              | `plan-entitlement-licensing`, `billing-payments`, `usage-cost-management`, `sponsorship`                                           |
| `assurance-support`       | `support-management`                                                                                                               |
| `education`               | `education-eligibility`, `campus-program`, `campus-experts`, `community-exchange`, `classroom-management`                           |
| `professional-programs`   | `certification`, `developer-program`                                                                                               |

## Next-work workflow

The portfolio taxonomy is not an implementation queue. For each subsequent slice:

1. select one concrete product problem and refresh its evidence in the centralized GitHub non-Code evidence ledger;
2. approve the semantic owner, source of truth, first use case, invariants and exclusions;
3. declare only the required provider contract, consumer-owned Port, ACL and Context Map relationship;
4. promote a planned descriptor atomically through G1-G4, or extend one existing runtime Context;
5. implement the smallest vertical Domain → Application → Adapter → Composition slice and verify its blast radius.

Do not derive runtime dependencies from Group/Area placement and do not implement Contexts in directory order.

Each `group.json` declares child Areas; each `area.json` declares actual child Contexts and `ownsRuntime: false`; each
child `context.json` declares `group`, `area`, `boundaryType: bounded-context`, the
fixed template version, semantics, and runtime status. Directory names alone do not establish a Bounded Context or
change its lifecycle.
