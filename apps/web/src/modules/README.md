# Domain Groups, Domain Areas and Bounded Contexts

`modules/` is the product runtime ownership map. The following tree completely describes the canonical placement
topology; it is not an inventory of implemented artifacts and does not claim that any Bounded Context is complete:

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

The tree is normative for placement. Literal names are required at the shown location. Angle-bracket names are patterns
that MUST NOT be created literally: they identify the permitted location of an artifact when approved semantics require
it, not a source file that must exist. Fixed structural directories remain present with `.gitkeep` when empty. Empty
directories, `templateVersion` conformance and a passing topology check prove structural placement only; they do not
prove complete Domain semantics, use cases, Ports, Adapters, contracts or tests. Artifacts must never be created merely
to make a Context look complete.

A Domain Group and its Domain Areas are closed organizational/governance navigation layers and own no runtime; each
declared Bounded Context owns its language, consistency, runtime, data, and contracts. Scope and account type remain
manifest metadata, not additional directory levels. There is no `sub-area` or additional `hexagonal-layer` directory.

The matching agent constraints are in [`AGENTS.md`](AGENTS.md). The canonical architecture decision is
[`docs/architecture/context-internal-topology.md`](../../../../docs/architecture/context-internal-topology.md), and
`pnpm arch:check` enforces this topology.

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

Each `group.json` declares child Areas; each `area.json` declares actual child Contexts and `ownsRuntime: false`; each
child `context.json` declares `group`, `area`, `boundaryType: bounded-context`, the
fixed template version, semantics, and runtime status. Directory names alone do not establish a Bounded Context or
change its lifecycle.
