# Sub-template

This is a **template**, not a bounded context and not a pnpm workspace. Copy it
only after a product owner has approved the Domain, subdomain, actor, first use
case, data classification, and Context Map relationships.

Use it for a child capability inside an approved bounded context. It deliberately
does not contain `context.json`, package exports, or a public contract: those
belong to the owning bounded context, never to a speculative sub-template.

## Required shape

```text
<capability>/
├── domain/          # value objects, aggregate behavior, invariants
├── application/     # one named use case and its inbound/outbound ports
├── infrastructure/  # adapters implementing those ports
├── contracts/       # only if the owning context publishes a versioned language
└── tests/            # domain and application evidence
```

Keep dependencies directed `Infrastructure/UI → Application → Domain`. A child
capability may not create a second bounded-context package or cross-context
shortcut; use the owning context's published contract and composition root.
