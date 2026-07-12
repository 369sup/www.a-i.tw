# ADR 0007: Distributed capability context resolvers over a minimal request envelope

狀態：Accepted

## Context

Capabilities need request-scoped facts without pairwise coupling. A universal RequestContextService with every
possible resource, relation and policy would become a central Context Service and de facto Shared Kernel.

## Decision

- Experience owns only a minimal `RequestEnvelopeV1` protocol.
- Each capability family owns a typed resolver and fragment, beginning with `RepositoryCapabilityContextV1`.
- There is no universal context DTO, global resolver, central relationship graph or central policy engine.
- Repository capability resolution depends only on minimal Ports shaped from provider published contracts.
- Experience owns consumer-shaped ACL view types; it does not import provider module contracts directly.
- Server composition wires the Repository resolver to Identity, Account and Repository application facades.
- Repository remains the authorization-decision owner for Repository actions.
- `credential` contains authentication metadata only; cookie/session token remains in the inbound adapter.
- `owner`, `organization` and `repository` are server-resolved. Enterprise is not an optional placeholder in the
  Repository fragment; it is added only by a future approved governance contract/resolver.
- Envelope and fragments are immutable and request-scoped; they are not persisted as authoritative records.

## Consequences

New capability families implement the same small protocol but keep their own typed fragment, Ports and owner. Local
capability descriptors cannot grant access. Resolution fails closed when a reference or owner decision is unavailable.
