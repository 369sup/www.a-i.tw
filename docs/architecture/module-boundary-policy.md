# Module boundary policy

狀態：Accepted / machine enforced baseline

- A module maps to one approved Bounded Context, not a UI route or data table.
- Peer Contexts consume only `contracts/vN/public.ts`, and only from consumer
  `adapters/outbound/integrations`.
- `public-api.ts` and `composition/index.ts` are app-composition entrypoints, never peer-Context entrypoints.
- Cross-context imports of Domain, Application, Infrastructure, Presentation or composition internals are forbidden.
- A Context may share only an explicitly approved Shared Kernel; generic utilities cannot hide Domain ownership.

The generated layout is specified by [`module-template.md`](module-template.md).
