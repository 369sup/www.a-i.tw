# Bounded Context internal topology

狀態：Accepted canonical / templateVersion 2 / ADR 0014 6 Groups、12 Areas、37 physical Contexts

Domain Group 與 Domain Area 是 organizational navigation boundaries；Bounded Context 才是 language、ownership、
runtime 與 consistency boundary。每個 Context 保留 ADR 0011 的 capability-oriented fixed template；ADR 0014
接替 physical placement registry。六個 Groups 與十二個 Areas 是 closed taxonomy，不得加入 sub-Area、account type 或
resource scope 目錄層。

## Canonical tree

```text
apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>/
├── AGENTS.md
├── README.md
├── context.json
├── public-api.ts
├── domain/<domain-capability>/
│   ├── aggregates/
│   ├── entities/
│   ├── value-objects/
│   ├── domain-services/
│   ├── policies/
│   ├── specifications/
│   ├── events/
│   └── errors/
├── application/
│   ├── commands/<command>/{command.ts,handler.ts}
│   ├── queries/<query>/{query.ts,handler.ts}
│   ├── use-cases/
│   ├── process-managers/
│   ├── dto/
│   └── ports/{inbound,outbound}/
├── contracts/<contract-version>/
│   ├── public.ts
│   ├── commands/
│   ├── queries/
│   ├── events/
│   ├── dto/
│   └── errors/
├── adapters/
│   ├── inbound/{http,server-actions,events,jobs,ui}/
│   └── outbound/{persistence,integrations,messaging,cache,telemetry}/
├── composition/
│   ├── index.ts
│   └── <composition-module>.ts
└── tests/{domain,application,adapters,contracts,architecture}/
```

Angle-bracket names are patterns, never literal directories. The generator creates the primary
`domain/<domain-capability>` from `context.json.subdomain.name`; additional capabilities require owned semantics and
kebab-case names. Category directories are fixed leaves. `commands/` and `queries/` are the only tactical parents that
accept named child directories, each with exactly its message and `handler.ts`. Contract versions use `v<number>`.

Every fixed directory is created atomically and retained with `.gitkeep` when empty. A Domain Group contains only
`AGENTS.md`, `README.md`, `group.json`, and declared Areas. A Domain Area contains only `AGENTS.md`, `README.md`,
`area.json`, and declared Contexts; both governance layers own no runtime. A Context root contains only the six fixed
directories and its four owner/public files. Ownership-free `shared`, `common`, `core`, `utils`, and `helpers` remain
forbidden.

## Dependency and entrypoints

```text
Inbound Adapter -> Application -> Domain
Application -> owned inbound/outbound Port
Outbound Adapter -> owned outbound Port
Consumer adapters/outbound/integrations -> Provider contracts/vN/public.ts
Context composition -> Context-owned factories and adapters
App server composition -> Context composition/public-api
```

- Domain code is framework-, SDK-, I/O-, Application-, Contract-, Adapter-, and Composition-free.
- Application owns use cases, messages, DTOs, process managers and Ports; it never constructs concrete adapters.
- `contracts/vN/public.ts` is standalone versioned Published Language and the only peer-Context entrypoint.
- `public-api.ts` is the explicit app-facing Application facade; peer Contexts must not import it.
- `composition/` may expose Context-owned factories/adapters, but final cross-Context and app assembly remains in
  `apps/web/src/composition`.
- Domain Events stay internal; only versioned contract events are integration events.

## Enforcement

`context-topology-migration.json` is in target mode with `boundedContextTemplateVersion: 2` and no legacy Contexts.
`pnpm arch:context-template` validates root entries, primary capability, fixed categories, command/query pairs, contract
versions, composition, tests, manifests and the closed six-Group/twelve-Area registry. `pnpm arch:cross-context`,
`pnpm arch:exports`, Dependency Cruiser, Semgrep and architecture tests enforce dependency and Published Language rules.
No lifecycle label, hand edit, prototype or temporary implementation waives these gates.

The canonical portfolio currently contains 20 runtime Contexts and 17 planned descriptors. Planned Contexts contain no
runtime tree and never enter `docs/domains/context-map.json`.
