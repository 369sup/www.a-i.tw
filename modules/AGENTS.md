# Bounded Context rules

- Read this context's `context.json` and its Context Map entry before changing it.
- Domain may import only its own Domain files. It cannot import frameworks, SDKs,
  React, Next.js, persistence, application, contracts, or infrastructure.
- Application coordinates Domain through inbound and outbound Ports. It cannot
  import a concrete adapter.
- Infrastructure implements outbound Ports and is wired only by an app-local
  composition root.
- Another context may import only `@a-i/<context>/contracts`; direct imports of
  another context's public API, composition root, Domain, Application, or
  Infrastructure are forbidden.
- Add a Context Map relationship before adding a cross-context contract
  dependency. Run `pnpm arch:check` after any dependency or import change.
