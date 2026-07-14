---
applyTo: "apps/web/src/modules/**"
---

# Bounded Context constraint

Use only the templateVersion 2 `modules/<domain-group>/<bounded-context>/{domain,application,contracts,adapters,composition,tests}` structure. Domain Groups own placement,
not runtime. Domain has no outward dependency; Application depends on Domain and owned Ports; adapters implement transport
and outbound capabilities; peer Context imports target only `contracts/vN/public.ts`. Follow `apps/web/src/modules/AGENTS.md` and
block changes that fail `pnpm arch:check`.
