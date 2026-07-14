# ADR 0013: Domain Area Context placement

Status: Superseded by ADR 0014 — 2026-07-14

## Decision

Product Contexts use the fixed physical path:

```text
apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>/
```

The closed navigation taxonomy contains four Domain Groups and nine Domain Areas, as declared by
`docs/architecture/context-topology-migration.json`. A Domain Group owns only its governance files and Areas. A Domain
Area owns only its governance files and child Context placement. Neither is a runtime, model, transaction, contract,
data, composition, deployment or dependency boundary.

Bounded Context IDs remain globally unique and continue to own the ADR 0011 `templateVersion: 2` internal structure.
Context Map relationships use stable Context IDs; they are never inferred from Group or Area placement.

Account type, resource scope, installation scope and policy target are manifest or Published Language dimensions. They
must not create `sub-area`, `account-type`, `resource-scope` or other directory levels.

## Migration

The declarative owner is `docs/architecture/context-relocation-map.json`. It relocates the fourteen existing Contexts
without renaming, splitting, merging or changing their Domain model, contracts or behavior. The remaining candidate
boundaries stay Proposed or Research in the product model and do not receive empty runtime directories.

## Consequences

- Adding, removing or renaming a Group or Area requires a superseding ADR.
- New Context generation requires a registered `--group` and `--area` pair.
- `group.json` declares `areas`; `area.json` declares `ownsRuntime: false` and current child `contexts`.
- `context.json` declares both `group` and `area`.
- Guards permanently reject the former two-level topology and any extra fourth classification level.

This ADR supersedes only the physical path and closed Group registry portions of ADR 0011. ADR 0011 remains canonical
for Bounded Context internals and Hexagonal Architecture.
