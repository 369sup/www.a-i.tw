# Web application rules

- Next.js App Router and Fumadocs own routing and rendering only.
- Product business rules belong in `src/modules/<bounded-context>`, not route files or UI components.
- Route handlers, Server Actions, layouts, pages, and Client Components are inbound adapters: they validate or map transport data, invoke an Application use case, and render a result. They do not make domain decisions or import Infrastructure.
- Application reaches persistence or external systems only through Ports. Concrete adapters are wired in `src/composition/`, which is server-only and must not be imported by Client Components.
- A context may interact with another context only through an approved published contract, Port, event, or anti-corruption adapter.
- Public docs live in `content/docs`; internal governance docs live in repository root `docs/`.
- Use shadcn primitives from `@a-i/shadcn` before creating app-local UI primitives.
- Classify every route under `src/app/(public)` or `src/app/(console)`. Route groups describe audience and access surface, never a Domain or template origin.
- Keep shared delivery-only code in App Router private folders. Fumadocs helpers and its source loader live in `src/app/(public)/docs/_lib`; product-wide navigation lives in `src/app/_components`.
- Keep server-only integrations out of Client Components and initialize external clients lazily.
