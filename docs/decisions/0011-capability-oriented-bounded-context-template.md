# ADR 0011: Capability-oriented Bounded Context template

狀態：Accepted for Context internals, public entrypoints and template enforcement; physical placement and the closed
Group registry is superseded by ADR 0014

## Context

ADR 0010 made tactical categories fixed leaves directly below each Hexagonal layer. That kept topology deterministic but
made a Context with several capabilities accumulate unrelated Aggregates, use cases, adapters and tests in broad flat
folders. It also used one `module-api` entrypoint for app composition and peer Published Language.

## Decision

Keep `apps/web/src/modules/<domain-group>/<bounded-context>` and the closed nine Domain Groups. Replace the Context
internals with templateVersion 2 defined by `docs/architecture/context-internal-topology.md`: Domain is grouped by owned
capability; Application separates commands, queries, use cases, process managers, DTOs and Ports; Published Language is
versioned under `contracts/vN`; Adapters are explicitly inbound/outbound; each Context has composition and boundary-
organized tests.

`contracts/vN/public.ts` is the only peer-Context entrypoint. `public-api.ts` is app-facing. Context composition may
expose Context-owned factories and adapters, while final concrete and cross-Context wiring remains in
`apps/web/src/composition`.

The primary Domain capability is the manifest `subdomain.name`. Additional capability directories require explicit
ownership and semantics; folder names do not create a new Bounded Context or strategic Subdomain.

## Consequences

- `context.json`, Context Map schema and topology registry use `templateVersion: 2`.
- Generator, architecture guards, Dependency Cruiser, Semgrep, tests, skills, plugins and agent instructions must use the
  same paths.
- Existing runtime files move without changing product behavior; imports and cross-Context contracts migrate atomically.
- Empty fixed directories remain intentional and are retained with `.gitkeep`.
- Commands and queries gain one named directory per operation; versioned contracts separate Published Language from the
  app-facing API.

## Migration and rollback

All current Contexts migrate in one coordinated control-plane change because mixed `module-api` and versioned-contract
entrypoints would create ambiguous dependency rules. Rollback is the inverse path migration plus restoration of ADR 0010
guards and manifest version 1; no data migration is involved.
