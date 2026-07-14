# Bounded Context module template

Canonical owner: `context-internal-topology.md` and ADR 0011.

```text
<domain-group>/<domain-area>/<bounded-context>/
├── domain/<capability>/{aggregates,entities,value-objects,domain-services,policies,specifications,events,errors}/
├── application/{commands,queries,use-cases,process-managers,dto,ports/{inbound,outbound}}/
├── contracts/<version>/{public.ts,commands,queries,events,dto,errors}/
├── adapters/{inbound,outbound}/
├── composition/index.ts
├── tests/{domain,application,adapters,contracts,architecture}/
├── public-api.ts
├── AGENTS.md
├── README.md
└── context.json
```

`pnpm generate:context` creates every fixed directory and the primary Domain capability from the approved strategic
Subdomain. Commands and queries add named `{message,handler}` pairs only when their use case is approved. Peer Contexts
consume only versioned contracts; app server composition consumes Context composition/public APIs.
