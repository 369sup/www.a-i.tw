# Hexagonal Architecture

狀態：Accepted baseline

Inbound adapters translate delivery protocols to application use cases. Application coordinates transactions and ports.
Domain owns business rules and has no Next.js, React, database or external SDK dependency. Infrastructure implements
outbound ports and translates external models. Composition roots bind adapters without leaking them into Domain.

The application core must be executable with test or in-memory adapters and without a browser or production database.
Routes, Server Actions, modal slots, jobs, and test harnesses are inbound adapters, not places for domain decisions.
Each bounded context keeps its model internally consistent; cross-context collaboration uses an explicit contract, Port,
event, or anti-corruption adapter rather than an internal import.

Dependency direction: `UI / Infrastructure → Application → Domain`.

Source: [Cockburn: Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture).
