# Web application rules

- Next.js App Router and Fumadocs own routing and rendering only.
- Product business rules belong in `src/modules/<bounded-context>`, not route files or UI components.
- Route handlers, Server Actions, layouts, pages, and Client Components are inbound adapters: they validate or map transport data, invoke an Application use case, and render a result. They do not make domain decisions or import Infrastructure.
- Application reaches persistence or external systems only through Ports. Concrete adapters are wired in `src/composition/`, which is server-only and must not be imported by Client Components.
- A context may interact with another context only through an approved published contract, Port, event, or anti-corruption adapter.
- Public docs live in `content/docs`; internal governance docs live in repository root `docs/`.
- Use shadcn primitives from `@a-i/shadcn` before creating app-local UI primitives.
- Classify every route under `src/app/(public)` or `src/app/(console)`. Route groups describe audience and access surface, never a Domain or template origin.
- App Router performs final delivery assembly only. Non-JSX route-local wiring must use a responsibility-named `*-composition.ts`; final JSX stays in `page.tsx` or `layout.tsx`.
- Recursively forbid every underscore-prefixed private folder (`_folder/`) and `actions.ts` anywhere under `src/app/**`. Product behavior and UI descend to the owning Bounded Context; context-neutral primitives belong in `@a-i/shadcn`.
- Under `src/app/**`, TSX is restricted to the approved Next.js App Router file conventions documented in `src/app/AGENTS.md`; all other React components descend to an owning Context or context-neutral shadcn custom component.
- Keep server-only integrations out of Client Components and initialize external clients lazily.
