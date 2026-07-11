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

The generator creates a workspace under `modules/`, registers the exact same
manifest in `docs/maps/context-map.json`, and provides empty public entrypoints.
It intentionally does not invent aggregates, entities, repositories, events, or
use cases. After generation, define the first public contract and run
`pnpm arch:check` before adding runtime behavior.
