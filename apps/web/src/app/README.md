# Next.js delivery

`app/` maps HTTP and UI entrypoints into the product. Routes are classified by audience:

This audience topology is closed and machine-enforced by `pnpm arch:topology`; every route must remain under exactly one of the two groups below.

```text
app/
├── (public)/   # public site, docs, and public endpoints
└── (console)/  # authenticated product routes
```

Business rules belong to the owning Bounded Context, not to pages, layouts, route handlers, or Server Actions.
Product UI, browser-session delivery, and capability-specific request mapping live in owning Context inbound/Application
boundaries. Non-JSX route-local wiring uses responsibility-named `*-composition.ts`; JSX under `app/**` stays in an
approved Next.js file convention.

Route directories may use `folder/`, `@slot/`, `(group)/`, `[param]/`, `[...param]/`, `[[...param]]/`, `(.)segment/`,
`(..)segment/`, `(..)(..)segment/`, or `(...)segment/`. The prohibition is recursive: do not add any underscore-prefixed
private folder (`_folder/`) or `actions.ts` anywhere below `app/**`.
Allowed TSX entrypoints below `app/**` are the Next.js conventions `page.tsx`, `layout.tsx`, `template.tsx`,
`loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`, `global-not-found.tsx`, `default.tsx`,
`unauthorized.tsx`, `forbidden.tsx`, `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, and `twitter-image.tsx`.
`default.tsx` remains limited to parallel routes; global and experimental conventions must follow the installed Next.js
version's placement and configuration requirements. Metadata image conventions generate route metadata and do not own
general-purpose UI components.
