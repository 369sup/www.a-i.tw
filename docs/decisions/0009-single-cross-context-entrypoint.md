# ADR 0009: Single cross-context semantic entrypoint

狀態：Superseded by ADR 0010

## Context

Allowing Application code to import provider contracts makes a dependency look explicit while still leaking provider
identity and vocabulary into the consumer core. Exporting composition beside contracts also creates a bootstrap
backdoor. Events cannot enforce immediate invariants, and shared database transactions bypass Context ownership.

## Decision

1. Consumer Application defines the Port and local decision vocabulary.
2. Consumer Infrastructure `integrations` implements the Port and may import only provider
   `contracts/<subdomain>/public.ts`.
3. Provider Published Language is standalone and versioned. Domain Events are not Integration Events.
4. Context `public-api.ts` and `composition/index.ts` are available only to `apps/web/src/composition`.
5. Immediate invariants use synchronous authoritative decisions. Event reactions are eventually consistent.
6. Multi-step compensated workflows require an explicitly owned Process Manager.
7. Existing Application-to-provider imports are registered debt; the checker rejects every unregistered addition.

## Consequences

Consumers own ACL mapping and can replace an in-process provider with HTTP, RPC or a test double without changing
Application. Contracts and assembly remain separate authority levels. Some additional adapters and local DTOs are
intentional boundary isolation rather than accidental duplication.

## Outcome

Applied on 2026-07-12. All seven transitional imports were replaced; the exception registry is empty and AD-009 is
closed.
