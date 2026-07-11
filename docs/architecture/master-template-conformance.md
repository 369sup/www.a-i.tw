# Master Template conformance

狀態：Current

`master-template` 是 `apps/web/src/modules/master-template` 的 app-local、受 Context Map
約束的 Bounded Context；它不是跨 Context package。`sub-template` 是它的 supporting
subdomain，不是第二個 Context 或 workspace package。

## Required structure

```text
apps/web/src/
├── app/architecture/master-template/      # Next.js inbound route adapters
├── app/@modal/(...)architecture/          # intercepted-modal inbound adapter
├── master-template/ux/                    # form and UI adapters
├── server/composition/master-template.ts   # server-only adapter wiring
└── modules/master-template/                # application core
    ├── src/domain/                         # no framework or infrastructure imports
    ├── src/application/                    # inbound use cases and outbound ports
    ├── src/infrastructure/                 # outbound port adapters; no re-exports
    └── src/sub-template/                   # supporting-subdomain internals
```

## Enforced responsibilities

- Domain owns invariants and imports only its own Domain code.
- Application exposes inbound use cases and defines outbound capability ports;
  it does not import concrete adapters or Next.js.
- Infrastructure implements outbound ports. Only app-local server composition
  imports concrete adapters and wires them to the module factory; it is marked
  `server-only`. The composition factory never re-exports Infrastructure.
- Route files, Server Actions, and Parallel Route slots are inbound adapters:
  they parse transport data, call an inbound use case, and map the stable result
  to UI/HTTP behavior. They do not contain domain decisions.
- The module core is independently testable with fake or in-memory outbound adapters;
  browser, Next.js route, and production-database availability are not preconditions
  for Application or Domain tests.
- The package root public entrypoint is intentionally empty. A future cross-context
  API must be a versioned published-language contract, not a re-export of internals.

## Next.js adapter requirements

The resource slice uses standard routes plus an intercepted `@modal` slot. Its
default and catch-all fallbacks return `null`, so hard navigation is safe. Client
Components may not import composition or infrastructure code.

## Sources

- [Next.js Parallel Routes and slots](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes)
- [Next.js `default.js` hard-navigation fallback](https://nextjs.org/docs/app/api-reference/file-conventions/default)
- [Next.js server-only data access guidance](https://nextjs.org/docs/app/guides/data-security)
- [Cockburn: Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture)
- [Fowler: Bounded Context](https://martinfowler.com/bliki/BoundedContext.html)
