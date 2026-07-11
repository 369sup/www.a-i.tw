# Composition root strategy

狀態：Accepted / current app composition

`apps/web` is the current deployable composition boundary. Each approved module exposes a composition factory; the app
wires infrastructure adapters to application ports there. Routes and UI are inbound adapters and must consume the
application facade or published contracts, never construct Domain objects with infrastructure dependencies.
