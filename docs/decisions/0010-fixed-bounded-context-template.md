# ADR 0010: Fixed Domain Group and Bounded Context template

狀態：Superseded by ADR 0011; historical templateVersion 1 decision

## Context

Repository policy requires one deterministic structure that humans and Codex can generate and review without
inventing tactical directories. The previous Context-first, layer-second topology conflicts with section 32 of
`apps/web/src/modules/AGENTS.md`.

## Decision

Use `apps/web/src/modules/<domain-group>/<bounded-context>` and create the complete fixed Domain, Application, Adapter
and `module-api` tree defined by section 32. The Domain Group parent is organizational only and cannot own layers,
runtime state, transactions or Published Language. The Context manifest retains `subdomain` as semantic problem-space
classification and records `group` separately as physical organization metadata.
`module-api/index.ts` is the only cross-Context entrypoint. Dependency direction remains Adapter -> Application ->
Domain; Application owns Ports and concrete adapters remain outside Application and Domain.

The Domain Group layer is exactly one level and is closed to these nine names: `identity`, `account-governance`,
`authority`, `collaboration`, `integration-ecosystem`, `engagement-discovery`, `commercial`, `assurance`, and
`service-operations`. Existing Contexts must live under one of these groups; groups cannot nest.

The fixed Domain, Application, Adapter, and `module-api` directories collectively implement the Hexagonal Architecture;
there is no literal `<hexagonal-layer>` directory. A child directory is a Bounded Context only when `group.json`,
`context.json` (`boundaryType: bounded-context` plus the current `templateVersion`) and the topology gate agree.

Only `pnpm generate:context` may create a Context. It must reject incomplete semantic input and update the runtime
Context Map atomically.

## Migration

The previous runtime topology is registered explicitly in `context-topology-migration.json`. Registration is removal
debt, not permission for new legacy paths. New Contexts use this ADR immediately; existing Contexts migrate in
separately verified slices so imports and product behavior remain stable.

## Consequences

- Empty fixed directories are intentional and retained with `.gitkeep`.
- Architecture checks distinguish registered transitional Contexts from canonical Contexts.
- Skills, prompts and plugins invoke the same repository generator and cannot bypass semantic approval.
