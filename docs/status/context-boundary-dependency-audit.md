# Context boundary dependency audit

狀態：Current / verified 2026-07-17

All runtime Contexts use template v2. Peer semantic imports originate only from consumer
`adapters/outbound/integrations/**`, target provider `contracts/vN/public.ts`, and require a declared Context Map
relationship. `public-api.ts` and `composition/index.ts` are app-composition entrypoints and are not peer entrypoints.

The exception registry is empty. Consumer Application owns each outbound Port; the consumer ACL maps provider
Published Language into consumer-local facts and failure semantics. Domain and Application do not import peer
Contexts, provider persistence or framework adapters.

Dependency Cruiser verifies layer direction and cycles. The cross-context checker verifies importer layer, provider
entrypoint, consumer Port/ACL declarations and manifest relationships. On 2026-07-17, `pnpm arch:cross-context`,
`pnpm arch:source` and `pnpm arch:imports` passed against the 21-runtime / 16-planned manifest snapshot.
