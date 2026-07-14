# Authenticated console routes

## Purpose and scope

`(console)` groups product routes that require an authenticated user principal. The route-group name is organizational
and does not appear in URLs.

## Current route map

```text
(console)/
├── account/     account-scoped creation flows
├── settings/    organization and enterprise settings
└── repositories/ authenticated Repository management and parallel panels
```

The `/repositories` segment is a presentation route, not a separate product resource or Domain concept. The root layout
enforces authentication. Individual routes map delivery concerns to the owning Bounded Context through
Application capabilities; route files do not own authorization or business invariants.

For route-wide rules read the parent [`AGENTS.md`](../AGENTS.md), then this directory's [`AGENTS.md`](AGENTS.md).
