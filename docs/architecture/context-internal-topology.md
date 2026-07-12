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
Application -> consumer-owned Port
Consumer Infrastructure integration -> provider Published Language
Server composition -> Context composition -> concrete outbound adapters
```

## Contract boundaries

- `contracts/<subdomain>` contains standalone, versioned Published Language.
- Application commands and queries remain Application-owned and are not automatically public contracts.
- `contracts/<subdomain>/public.ts` is the only peer-Context semantic entrypoint.
- `public-api.ts` exports the app-facing Application facade and is importable only by app server composition.
- `composition/index.ts` exposes concrete assembly only to app server composition; it is never a peer-Context API.
- UI view models, forms and delivery schemas remain under Presentation and are never provider contracts.

## Cross-context interaction

Synchronous Query, Command or Capability Decision uses a consumer-owned Application Port implemented by a consumer
Infrastructure ACL adapter. Integration Events enter through consumer Infrastructure, map to a local Command, and
must not leak provider event types into Application. Events are not correctness barriers for immediate invariants.
Multi-step workflows with retry, timeout, compensation or correlation require an explicitly owned Process Manager.
Read-only Dashboard or BFF composition may aggregate queries but cannot decide provider-owned business rules.

## Enforcement state

`context-topology-migration.json` is in `target` mode and rejects all legacy paths. Cross-context exceptions are
separately registered as removal debt and do not authorize new dependencies.
