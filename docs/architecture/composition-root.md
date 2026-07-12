# Composition root strategy

狀態：Accepted / current app composition

`apps/web` is the deployable composition boundary. Routes and UI are inbound adapters and consume an Application facade
through server composition; they never construct Domain objects with Infrastructure dependencies.

Peer Contexts never assemble each other. `apps/web/src/server/composition` alone may import Context `public-api.ts` and
`composition/index.ts`, instantiate provider facades, construct consumer ACL adapters and inject them into consumer
Application Ports. A Context composition root may assemble only its own internals.
