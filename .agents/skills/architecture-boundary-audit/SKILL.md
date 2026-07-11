---
name: architecture-boundary-audit
description: Audit DDD modular-monolith and Hexagonal Architecture boundaries.
---

Check imports, public types, adapters, Ports, and composition roots. Confirm `UI / Infrastructure -> Application -> Domain`, identify violations, and prefer a guard, Port, adapter, anti-corruption layer, or published contract before moving code. Treat route handlers and Server Actions as inbound adapters, and require a server-side composition root for concrete outbound adapters.
