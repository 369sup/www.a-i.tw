# Bounded Context internal topology

狀態：Accepted target / migration controlled

The Context is the primary business boundary. Layer is second, declared subdomain is third, and tactical pattern or
use case is fourth. See ADR 0008.

## Target tree

```text
apps/web/src/modules/<bounded-context>/
├── AGENTS.md
├── README.md
├── context.json
├── domain/<subdomain>/
├── application/<subdomain>/
├── contracts/<subdomain>/
├── infrastructure/<subdomain>/
├── presentation/<subdomain>/
├── composition/
├── public-api.ts
└── tests/<subdomain>/
```

Detailed leaf directories are created on demand. Empty tactical folders are not required. `shared/`, `common`,
`core`, `utils` and `helpers` are forbidden unless a specific governance decision grants ownership.

## Dependency direction

```text
Presentation / Infrastructure -> Application -> Domain
Application -> provider Published Contract through consumer-owned Port / ACL
Server composition -> Context composition -> concrete outbound adapters
```

## Contract boundaries

- `contracts/<subdomain>` contains standalone, versioned Published Language.
- Application commands and queries remain Application-owned and are not automatically public contracts.
- `public-api.ts` exports the Context facade and approved Published Language only.
- UI view models, forms and delivery schemas remain under Presentation and are never provider contracts.

## Transitional state

`docs/architecture/context-topology-migration.json` controls enforcement. `transitional` permits registered legacy
`src/*` Contexts while requiring every newly generated Context to use the target topology. `target` rejects all legacy
paths.
