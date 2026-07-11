# Technical package rules

- `packages/*` owns only context-neutral technical capabilities with an explicit consumer and verification surface.
- Product Domain, Application, Contracts, Infrastructure, persistence adapters, policies and use cases belong to `apps/web/src/modules/<context>`.
- Do not create `application`, `contracts`, `domain`, `foundation` or `infrastructure` packages. These names hide ownership and recreate horizontal layers across Bounded Contexts.
- Keep packages flat. Use a precise capability name such as `ui`, `testing-kit`, `eslint-config` or `typescript-config`; do not add umbrella `tooling`, `shared`, `common`, `core`, `utils` or `helpers` folders.
- A package must not depend on app or Context internals.
