# ADR 0008: Subdomain-oriented Bounded Context internals

狀態：Accepted

## Context

The existing app-local Bounded Contexts are correctly isolated but their internal `src/domain`, `src/application`
and `src/infrastructure` folders are too flat for sustained semantic expansion.

## Decision

Keep `apps/web/src/modules/<bounded-context>` as the business boundary and single-deployable module location. Inside
each Context, organize by layer, then declared subdomain, then tactical pattern or use case:

```text
<context>/
  domain/<subdomain>/{aggregates,entities,value-objects,domain-services,domain-events,policies,specifications,errors}
  application/<subdomain>/{commands,queries,use-cases,handlers,ports/{inbound,outbound}}
  contracts/<subdomain>/{commands,queries,events,dto,errors}
  infrastructure/<subdomain>/{persistence,repositories,external-services,messaging,mappers}
  presentation/<subdomain>/{route-handlers,server-actions,components,forms,schemas,views,presenters}
  composition/
  public-api.ts
```

`shared/` is forbidden by default and requires an explicit Shared Kernel decision. Application owns normal inbound
and outbound Ports. Domain-facing Ports are exceptional and must express a genuine Domain abstraction. External
consumers use only `public-api.ts` or standalone published contracts.

## Migration

Existing `src/*` Context internals are transitional coupling. New scaffolds use the target tree immediately. Runtime
movement occurs only after canonical docs, generators, validators, rules, skills and commands support both states.

## Consequences

- Semantic expansion is grouped by subdomain without splitting a Context into horizontal workspace packages.
- Architecture checks need transitional and target modes.
- Existing runtime imports remain stable until a separately verified migration gate.
