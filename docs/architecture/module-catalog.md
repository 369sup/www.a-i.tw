# Module catalog

狀態：Current / no workspace module; one app-local reference Context

No runtime `modules/<context>` workspace exists. `master-template` is the one
app-local reference Context at `apps/web/src/modules/master-template`; it has no
published application API and its concrete adapters are composed only by
`apps/web/src/server/composition/master-template.ts`. The candidate Context
catalog is [`../domains/bounded-context-catalog.md`](../domains/bounded-context-catalog.md); it is not a module catalog.

When a module is approved, add package name, Context, owner, public exports, runtime location, persistence owner,
composition root and verification evidence here.
