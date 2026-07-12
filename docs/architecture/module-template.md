# Standard Bounded Context tree

狀態：Accepted target / migration controlled

```text
apps/web/src/modules/<bounded-context>/
├── AGENTS.md
├── README.md
├── context.json
├── domain/<subdomain>/
│   ├── aggregates/
│   ├── entities/
│   ├── value-objects/
│   ├── domain-services/
│   ├── domain-events/
│   ├── policies/
│   ├── specifications/
│   └── errors/
├── application/<subdomain>/
│   ├── commands/
│   ├── queries/
│   ├── use-cases/
│   ├── handlers/
│   └── ports/{inbound,outbound}/
├── contracts/<subdomain>/{commands,queries,events,dto,errors}/
├── infrastructure/<subdomain>/{persistence,repositories,external-services,messaging,mappers}/
├── presentation/<subdomain>/{route-handlers,server-actions,components,forms,schemas,views,presenters}/
├── composition/
│   └── index.ts
├── public-api.ts
└── tests/<subdomain>/{domain,application,infrastructure,acceptance}/
```

Leaf directories are created only when the first approved semantic requires them. Application owns normal inbound
and outbound Ports. `contracts` contains standalone Published Language, not aliases of internal Domain entities.
`public-api.ts` is the only general Context entrypoint. `shared/`, `common`, `core`, `utils` and `helpers` are forbidden
unless explicitly governed.

All registered Contexts use this target tree. `context-topology-migration.json` is in `target` mode with no legacy
`src/*` exception; new Context generation must preserve that state.
