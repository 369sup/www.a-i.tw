# Next.js delivery

`app/` maps HTTP and UI entrypoints into the product. Routes are classified by audience:

This audience topology is closed and machine-enforced by `pnpm arch:topology`; every route must remain under exactly one of the two groups below.

```text
app/
├── (public)/   # public site, docs, and public endpoints
└── (console)/  # authenticated product routes
```

Business rules belong to the owning Bounded Context, not to pages, layouts, route handlers, or Server Actions.
Cross-route UI, browser-session delivery and request-envelope mapping live in `src/presentation/<experience>`.
