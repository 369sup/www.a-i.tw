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

- Root entries MUST match this tree exactly. Routable segments MUST live below exactly one of `(public)` or `(console)`;
  nested organizational route groups are allowed, but a third root audience group is forbidden.
- Product presentation and browser-session delivery live in the owning Context inbound adapters. App Router may retain only
  final, responsibility-named composition files.
- Every underscore-prefixed private folder (`_folder/`) and `actions.ts` is recursively forbidden anywhere below `app/**`;
  directory depth, route locality, prototype status, and framework convention do not create an exception.
- Permitted route segment directory conventions are exactly:

  | Convention         | Meaning                    |
  | ------------------ | -------------------------- |
  | `folder/`          | static route segment       |
  | `@slot/`           | parallel route             |
  | `(group)/`         | route group                |
  | `[param]/`         | dynamic route              |
  | `[...param]/`      | catch-all dynamic route    |
  | `[[...param]]/`    | optional catch-all route   |
  | `(.)segment/`      | intercept same level       |
  | `(..)segment/`     | intercept one level above  |
  | `(..)(..)segment/` | intercept two levels above |
  | `(...)segment/`    | intercept from app root    |

- `_folder/` is intentionally not permitted even though Next.js recognizes it as a private-folder convention.
- Permitted `.tsx` filenames below `app/**` are exactly:

  ```text
  page.tsx
  layout.tsx
  template.tsx
  loading.tsx
  error.tsx
  global-error.tsx
  not-found.tsx
  global-not-found.tsx
  default.tsx
  unauthorized.tsx
  forbidden.tsx
  icon.tsx
  apple-icon.tsx
  opengraph-image.tsx
  twitter-image.tsx
  ```

- `default.tsx` is limited to a parallel-route slot or the segment that owns parallel-route slots.
- `global-error.tsx` and `global-not-found.tsx` follow their root-level Next.js placement rules. `global-not-found.tsx`,
  `unauthorized.tsx`, and `forbidden.tsx` must not be used without the corresponding supported Next.js configuration.
- Custom composition and component TSX filenames remain forbidden.
- `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, and `twitter-image.tsx` are metadata image conventions; they may
  generate images with JSX but must not become general-purpose UI component containers.
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

- Do not create a third root audience group, parallel product architecture, root `page.tsx`/`route.ts`, or any underscore-prefixed private-code folder.
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
