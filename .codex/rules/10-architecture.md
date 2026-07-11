# Architecture rules

- Domain must remain framework-agnostic and own business invariants.
- Application owns use cases, commands, queries, ports, and application contracts.
- Infrastructure owns persistence, external APIs, Next.js integration, and adapters.
- UI composes application contracts and maps view models; it does not implement core business rules.
- A module may depend inward only. Cross-module calls require an explicit published language or application port.
