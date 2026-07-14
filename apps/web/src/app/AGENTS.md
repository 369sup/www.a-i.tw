# Route rules

## Closed topology and non-waiver

```text
app/
├── (public)/   # anonymous or optionally authenticated delivery
├── (console)/  # authenticated product delivery
├── AGENTS.md
├── README.md
├── favicon.ico
├── globals.css
└── layout.tsx
```

- Root entries MUST match this tree exactly. Routable segments MUST live below exactly one of `(public)` or `(console)`; nested
  route groups and a third audience group are forbidden.
- Cross-route presentation, browser-session delivery and request-envelope mapping live under `src/presentation/<experience>`,
  not in private root folders inside `app`.
- Next.js route segments may evolve inside those groups, but a segment MUST NOT contain both `page.tsx` and `route.ts`.
- MUST NOT adopt an alternative route structure, simplify the two-audience boundary, add an architecture/business
  layer under `app`, or use route colocation to move Domain/Application/Adapter-out ownership into delivery code.
- MUST NOT bypass authentication, visibility, Application Ports, server composition, dependency checks, build, or CI.
- Temporary pages, prototypes, migration routes, experiments, loading/error fallbacks, and test-only handlers receive no
  ownership, authorization, or dependency-direction waiver.

## Scope and hard rules

- Scope: Next.js pages, layouts, route handlers, Server Actions, metadata, and audience-specific delivery concerns.
- Pages, layouts, route handlers, and Server Actions are inbound adapters: validate/map input and invoke an Application use case.
- Do not access persistence, external SDKs, Context internals, or concrete outbound adapters from routes.
- Before changing Next.js behavior, read the relevant installed guide under `node_modules/next/dist/docs/`.

## Prohibited actions

- Do not create a third audience group, nested route group, parallel product architecture, or root `page.tsx`/`route.ts`.
- Do not implement business invariants, authorization truth, persistence, integration orchestration, or peer-Context access in delivery files.

## Required workflow

1. Identify the audience, owning Bounded Context, Application use case, authorization boundary, and route contract.
2. Read the relevant installed Next.js guide and inspect the nearest route/test patterns.
3. Keep route code limited to transport/view mapping and invoke only the approved Application boundary.
4. Run the focused route test before expanding verification.

## Validation and Definition of Done

- Route documentation/topology changes require `pnpm docs:check` and `pnpm arch:check`.
- Runtime behavior changes require focused tests, `pnpm check`, and `pnpm build`.
- Done means the route remains in one legal audience group, uses the owning use case, preserves authorization and dependency direction, and passes the relevant checks.
