# Request Context resolution

狀態：Current / verified 2026-07-14

## Purpose

Resolve the minimum server-trusted envelope needed by one capability, then let a capability-owned resolver add its
typed resource fragment and call the resource owner's authorization Port. There is deliberately no universal
`RequestContextService`. These are Experience orchestration read models, not Domain Aggregates, Shared Kernel,
ambient globals, generic policy engines or client-authored payloads.

The envelope represents the Actor／Scope side of the platform world model. A capability fragment adds only its
typed Resource, canonical Action and resource-owner Decision. Relationship facts remain behind owner contracts and
consumer ACLs; the resolver does not expose or persist a universal relationship graph.

```text
RequestEnvelope
├── viewer                  authenticated observer
├── actor                   action attribution Principal
├── credential              safe authentication metadata, never token/secret
├── correlation             request-local trace reference
└── activeScope             explicit scope reference, not a loaded Domain object

RepositoryCapabilityContext
├── envelope                RequestEnvelope
├── owner                   resolved Account owning this Repository
├── organization            owner only when it is an Organization
├── repository              resolved Repository
├── capability              registered product capability descriptor
├── requestedAction         canonical action requested by the capability
└── authorizationDecision   decision returned by the owning resource Context
```

## Ownership and flow

```text
HTTP cookie adapter
  → Identity AuthenticatedPrincipalV1
  → Experience RequestEnvelope
  → RepositoryCapabilityContextResolver
      → repository capability descriptor resolves key/action
      → Repository contract resolves resource
      → Account contract resolves owner/scope
      → Repository participation policy decides allow/deny
  → purpose-specific RepositoryCapabilityContextV1 read model
```

Each capability family owns its resolver and typed fragment. Discussion, Notification or Enterprise Administration
must not add optional fields to a universal DTO; they define their own context type over the same minimal envelope.
A resolver may orchestrate calls and translate published contracts. It must not infer Membership, duplicate resource
role rules, load another Context's Domain type, expose raw credentials, or cache a decision beyond one request.

Experience owns consumer-shaped view types and does not import provider contracts directly. Only the server
composition adapter sees provider contracts/facades and translates them into these local Ports.

The browser request-envelope mapper and focused test live under
`apps/web/src/presentation/request-context/browser-request-envelope.ts`; Next.js routes consume this app-local
presentation type without making `app/` a cross-route ownership bucket.

## Minimum-context rule

A field is included only when the current capability needs it, its source owner is approved, and unavailable/stale
behavior is defined. Otherwise it is omitted rather than represented by a speculative optional field. The envelope
never contains resource graphs, Membership collections, roles, permissions, policies, entitlements, raw credentials
or cached decisions. Capability fragments add only the facts needed for that capability's current decision/rendering.

## Current capability registry

| Capability key        | Resource   | Requested action | Decision owner |
| --------------------- | ---------- | ---------------- | -------------- |
| `repository.overview` | Repository | `read`           | Repository     |
| `issue.read`          | Repository | `read`           | Repository     |
| `issue.create`        | Repository | `triage`         | Repository     |
| `issue.manage`        | Repository | `manage`         | Repository     |

Capability registration is local to the Repository capability resolver and describes integration requirements; it
does not grant permissions. Unknown capability, missing Repository, missing owner or unauthenticated viewer fails
closed with an explicit resolution error. Enterprise is intentionally absent from this fragment until Account or a
future Enterprise Governance Context publishes the required fact.

## Research evidence

GitHub's public documentation uses stable IDs for Organization, Enterprise and Repository resources and GraphQL
Node IDs/edges for object relationships. This supports stable reference contracts, but GitHub's internal request
context implementation is not public. Sources indexed through Context7:

- <https://github.com/github/docs/blob/main/content/graphql/guides/migrating-graphql-global-node-ids.md>
- <https://github.com/github/docs/blob/main/data/reusables/enterprise-migration-tool/migration-destination-query.md>
- <https://github.com/github/docs/blob/main/content/migrations/using-github-enterprise-importer/migrating-between-github-products/migrating-organizations-from-githubcom-to-github-enterprise-cloud.md>
