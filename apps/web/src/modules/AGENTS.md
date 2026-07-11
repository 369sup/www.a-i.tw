# App-local Bounded Context rules

- Read the context's `context.json`, its Context Map entry, and this directory's
  closest `AGENTS.md` before changing business behavior.
- This is a Domain-Driven Modular Monolith with Hexagonal Architecture and Ports
  and Adapters. Maintain `UI / Infrastructure -> Application -> Domain`.
- Domain imports only its own Domain code. It must not import Next.js, React,
  database clients, SDKs, Application, Contracts, Infrastructure, or composition.
- Application owns use cases and defines inbound and outbound Ports. It must not
  import concrete adapters.
- Infrastructure implements outbound Ports. Only the server-side composition
  root wires it; routes and UI are inbound adapters and cannot bypass a use case.
- Cross-context interaction requires an approved published contract, Port, event,
  or anti-corruption adapter. Never import another context's internals.
