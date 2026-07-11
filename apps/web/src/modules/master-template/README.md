# master-template

This is a formal, app-local **template bounded context**, not an unowned example
or a cross-context package. It owns Master Template lifecycle and its
`sub-template` supporting subdomain. The executable Next.js slice uses a
server-only app composition root; UI routes and Server Actions remain inbound
adapters.

- Domain: Template Management
- Subdomain: sub-template (supporting)
- Owner: www.a-i.tw Architecture Team

The current vertical slice is intentionally in-memory. The module composition
factory accepts only port implementations; `apps/web/src/server/composition/` is
the only place that imports or wires concrete outbound adapters. Domain and
Application remain framework-free, and the root public entrypoint stays empty
until an approved versioned published-language contract exists.
