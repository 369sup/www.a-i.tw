# Hexagonal Architecture

狀態：Accepted baseline

Inbound adapters translate delivery protocols to application use cases. Application coordinates transactions and ports.
Domain owns business rules and has no Next.js, React, database or external SDK dependency. Infrastructure implements
outbound ports and translates external models. Composition roots bind adapters without leaking them into Domain.

Dependency direction: `UI / Infrastructure → Application → Domain`.
