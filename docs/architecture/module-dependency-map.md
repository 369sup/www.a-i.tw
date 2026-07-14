# Module dependency map

狀態：Current / verified app-local graph

```text
Account Application -> local AccountPrincipal

Repository Application -> AccountDirectory Port
Repository Infrastructure integration -> Account contracts/public

Issues Application -> RepositoryParticipation Port
Issues Infrastructure integration -> Repository contracts/public

apps/web/src/composition
  -> Context contracts/vN/public.ts
  -> provider facade injection into consumer ACL adapters
```

No Domain, Application, Contracts or Presentation layer imports a peer Context. The exception registry is empty.
Experience reaches Application facades only through app server composition.
