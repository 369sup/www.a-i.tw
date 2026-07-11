# Web application rules

- Next.js App Router and Fumadocs own routing and rendering only.
- Product business rules belong in `src/modules/<bounded-context>`, not route files or UI components.
- Public docs live in `content/docs`; internal governance docs live in repository root `docs/`.
- Use shadcn primitives from `@a-i/ui` before creating app-local UI primitives.
- Keep server-only integrations out of Client Components and initialize external clients lazily.
