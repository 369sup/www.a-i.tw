# Module boundary contract

This file applies to `apps/web/src/modules/**`. Domain Groups and Domain Areas are governance-only; each declared child
Bounded Context is a semantic ownership boundary, while only a non-`planned` Context owns implemented runtime and data.
The closed six-Group, twelve-Area registry and exact template are defined by
`docs/architecture/context-internal-topology.md`, ADR 0011 and ADR 0014.

## Mandatory module topology

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

These are the only two legal Context shapes. They are normative placement and ownership contracts, not claims that a
Context implementation is complete. Interpret them as follows:

- Names without angle brackets are required structural directories or fixed files at the shown location.
- Angle-bracket names are patterns and MUST NOT be created literally. They show the only permitted placement for an
  artifact when approved semantics require that artifact; they do not require a placeholder source file.
- A Domain Group contains only `AGENTS.md`, `README.md`, `group.json`, and child Areas declared by `group.json`.
- A Domain Area contains only `AGENTS.md`, `README.md`, `area.json`, and child Contexts declared by `area.json`.
- Domain Groups and Domain Areas own no runtime layer, Aggregate, Contract, table, transaction, composition or source.
- In a non-`planned` Context, every fixed structural directory exists even when it has no approved artifacts; retain an
  empty fixed directory with `.gitkeep`.
- Empty fixed directories, `.gitkeep`, `templateVersion` conformance and a passing topology check prove placement only.
  They do not prove that the Context has complete Domain semantics, use cases, Ports, Adapters, contracts or tests.
- Do not create a Value Object, command, query, service, adapter or test merely to populate the template. Each artifact
  requires approved semantics and evidence from an owned use case. Derive the slice in the Use Case-first order owned
  by `docs/architecture/ddd-hexagonal-standard.md`; there is no fixed Value Object-first, Entity-first or Contract-first
  implementation sequence.

The accepted portfolio migration may materialize a `planned` descriptor only after its candidate problem, owner,
strategic Subdomain, classification and candidate source of truth are approved. It has no first use case or runtime
relationship. A new runtime Context is created through `pnpm generate:context`; promotion of an existing planned
descriptor requires explicit G1-G4 approval, a concrete first use case and atomic materialization of the non-planned
template. The primary Domain capability equals `context.json.subdomain.name`.

## Ownership

| Path                                            | Owns                                                          | Must not own                       |
| ----------------------------------------------- | ------------------------------------------------------------- | ---------------------------------- |
| `domain/<capability>/aggregates`                | Aggregate roots and invariants                                | orchestration, I/O, transport DTOs |
| `entities`, `value-objects`                     | identity and value semantics                                  | ORM/vendor models                  |
| `domain-services`, `policies`, `specifications` | pure cross-object decisions and predicates                    | authorization adapters, workflows  |
| `events`, `errors`                              | internal Domain facts and failures                            | broker envelopes, HTTP errors      |
| `application/commands`, `queries`               | named messages plus handlers                                  | transport requests, SQL/ORM        |
| `use-cases`, `process-managers`                 | orchestration and long-running coordination                   | concrete adapter construction      |
| `application/dto`                               | Application-owned input/results                               | provider or vendor types           |
| `ports/inbound`, `ports/outbound`               | use-case interfaces and required capabilities                 | concrete implementations           |
| `contracts/vN`                                  | standalone Published Language                                 | Domain/Application/Adapter types   |
| `adapters/inbound`                              | transport/view/job/event mapping                              | business invariants                |
| `adapters/outbound`                             | persistence, ACL, messaging, cache, telemetry implementations | business policy                    |
| `composition`                                   | Context-owned factories and adapter exports                   | app-wide or peer wiring            |
| `tests`                                         | tests organized by boundary                                   | production runtime                 |

Category directories are fixed leaves. Only `commands/` and `queries/` accept named child directories, and those contain
exactly `command.ts` or `query.ts` plus `handler.ts`. Contract versions use `v<number>`. `composition/` contains
`index.ts` and optional TypeScript composition modules only.

## Dependency direction

```text
adapters/inbound -> application/ports/inbound -> application/use-cases -> domain
application/use-cases -> application/ports/outbound <- adapters/outbound
consumer adapters/outbound/integrations -> provider contracts/vN/public.ts
apps/web/src/composition -> Context composition/public-api
```

- Domain has no framework, SDK, I/O, Application, Contract, Adapter, UI or Composition dependency.
- Application owns Ports and never imports concrete adapters or peer Contexts.
- Contracts are standalone and use explicit exports; no wildcard or internal type leakage.
- Peer Context imports target only provider `contracts/vN/public.ts` and require a Context Map relationship.
- `public-api.ts` is app-facing only. Final concrete and cross-Context wiring stays in `apps/web/src/composition`.

## Forbidden escapes and change protocol

No alternative layer names, sub-Areas, scope/account-type directories, peer internals, parent re-exports, hidden aliases,
ownership-free shared folders, source files in structural parents, literal placeholders, hand-created Contexts or weakened guards. Temporary,
prototype, test and migration status grant no exception.

Every module change also complies with `AR-001` through `AR-018` in
`docs/architecture/ddd-hexagonal-standard.md`. A review must identify the affected closed impact scopes; a candidate
capability, raw persistence record, internal VO, framework convenience or undocumented upstream behavior cannot waive
those anti-rules.

Before editing, read the Domain Group and Context owner files plus `context.json`; confirm owner, capability/use case,
layer, Ports, Adapters, contract and consumers. Run focused tests, `pnpm arch:check`, runtime checks proportional to the
change, `git diff --check`, and a focused diff.

Before creating or moving a source artifact, classify it in this order: owning Context, approved capability or use case,
architectural layer, tactical category, artifact role, consumers, and required contract. Derive the filename from the
matching angle-bracket pattern above; existing nearby filenames and a passing checker do not override this contract.
Transport-neutral view data belongs in `application/dto`, not `adapters/inbound/ui`. The inbound `ui` leaf contains only
kebab-case `.tsx` UI adapters, and `server-actions` contains only kebab-case `.ts` transport adapters named for one
explicit action. Do not create grouped catch-all files such as `form-adapter`, `actions`, `helpers`, or `utils`.

Architecture checks prove only the rules they implement. When a normative rule is not mechanically enforced, review it
directly against this file and either add the narrowest non-breaking guard with a regression test or record the
unenforced legacy debt explicitly; never treat a green check as evidence that an unchecked naming rule was followed.
