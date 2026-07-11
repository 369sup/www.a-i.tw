---
name: scaffold-bounded-context
description: Generate a verified bounded-context workspace after its owner, subdomain, and Context Map relationship are approved.
---

Use this skill only when a new bounded context has an approved owner, domain,
subdomain name and type, and public-language decision. Do not create placeholder
contexts for speculative product ideas.

Run:

```bash
pnpm generate:context \
  --context <kebab-case-name> \
  --domain <domain-name> \
  --subdomain <subdomain-name> \
  --type <core|supporting|generic> \
  --owner <owner>
```

The generator creates an app-local Context under `apps/web/src/modules/`,
registers the exact same manifest in `docs/domains/context-map.json`, and
provides empty public entrypoints. All Contexts belong to the single
`@a-i/web` deployable package; boundaries are enforced by manifests, imports,
contracts and architecture tests rather than workspace packages.
It intentionally does not invent aggregates, entities, repositories, events, or
use cases. After generation, define the first public contract and run
`pnpm arch:check` before adding runtime behavior.
