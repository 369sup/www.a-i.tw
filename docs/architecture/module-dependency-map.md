# Module dependency map

狀態：Current / verified app-local graph

```text
Identity & Access contracts ──> Account application
Identity & Access contracts ──> Repository application
Account contracts ────────────> Repository application
Identity & Access contracts ──> Work Management application
Repository contracts ─────────> Work Management application (consumer ACL)

apps/web/src/server/composition
  ├── identity-access composition
  ├── account composition
  ├── repository composition
  └── master-template composition
         └── sub-template internal subdomain composition
```

All cross-context arrows consume provider `src/contracts/public.ts`. No Context
imports another Context's Domain、Application、Infrastructure or Composition.
Experience reaches application facades only through the app composition root.
