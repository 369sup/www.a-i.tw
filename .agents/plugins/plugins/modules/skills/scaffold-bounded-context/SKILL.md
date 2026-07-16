---
name: scaffold-bounded-context
description: Execute the G4 scaffold step for a new www.a-i.tw Bounded Context after semantic-development-lifecycle G1-G3 approvals. Use when a user asks to create, add, scaffold, generate, or initialize a Bounded Context or module.
---

Use only after owner, Domain, strategic Subdomain, classification, problem, first use case and source-of-truth models
are approved. If any value is missing, stop before filesystem changes and request it. Do not infer product ownership.

Run from the repository root:

```bash
pnpm generate:context \
  --context <kebab-case-bounded-context> \
  --group <declared-domain-group> \
  --area <declared-domain-area> \
  --domain <domain-name> \
  --subdomain <kebab-case-strategic-subdomain> \
  --type <core|supporting|generic> \
  --owner <owner> \
  --problem <approved-problem> \
  --first-use-case <approved-use-case> \
  --source-of-truth <comma-separated-models> \
  --lifecycle prototype
```

To promote an existing planned descriptor after G1-G3 approval, add `--promote true`. Promotion is allowed only when
the directory contains exactly the four planned governance files and has no runtime evidence. The generator preserves
the approved governance/evidence documents, stages all six runtime roots, deduplicates Area and Context Map membership,
and rolls back the descriptor and registries when promotion fails.

The generator is the only authorized creation path. It creates the complete canonical tree in
`apps/web/src/modules/AGENTS.md` under `apps/web/src/modules/<domain-group>/<domain-area>/<bounded-context>`, writes the manifest and
registers it in `docs/domains/context-map.json`. Never hand-create a partial Context.

`<domain-group>` and `<domain-area>` must be a registered pair in the closed six-group, twelve-area taxonomy declared by
`docs/architecture/context-topology-migration.json`. Never add another group, nest a group, or use a strategic
Subdomain name as another physical parent.

After generation run `pnpm arch:check`. Do not add aggregates, contracts, adapters or composition that were not
approved. The primary `subdomain.name` creates the first `domain/<domain-capability>` directory. Cross-Context consumers
may import only `contracts/<version>/public.ts` from `adapters/outbound/integrations` or messaging.

The fixed `domain`, `application`, `contracts`, `adapters`, `composition`, and `tests` tree is the Hexagonal Architecture
structure itself; never create a literal placeholder directory. A generated manifest must declare
`boundaryType: bounded-context` and the current `templateVersion`.
