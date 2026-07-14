# Published Language policy

狀態：Target baseline

Contracts expose the smallest stable facts needed by another Context. Account contracts distinguish personal, organization and enterprise governance facts; consumer Contexts must not infer unexposed hierarchy or roles. They have one owner, semantic version, error and compatibility rules, data classification and verification. They never export Domain entities, persistence types, credentials, secrets or provider-specific payloads. Consumers tolerate unknown additive values and own translation.

The only peer entrypoint is `contracts/<subdomain>/public.ts`. Message input, result DTO, callable Public API and
Integration Event are distinct contract types. Wire boundaries require runtime schemas; TypeScript-only contracts are
acceptable only for same-process, same-version deployment and must not be described as external wire guarantees.
