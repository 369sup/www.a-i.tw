# Domain Context Map

狀態：Current runtime summary; machine authority is `context-map.json`

The physical portfolio contains 37 accepted Context descriptors under six Domain Groups and twelve Domain Areas. Only
the 20 non-planned manifests mirrored in `context-map.json` are runtime Contexts; 18 are Current and Activity Feed plus
Audit & Compliance remain in-memory prototypes. Placement is not runtime completeness.

## Ownership spine

```text
Authentication Security
  -> User Account / Organization Account / Enterprise Account
  -> Organization Participation / Administrative Access Control / Policy Governance
  -> Repository Governance
  -> Work Tracking / Work Planning / Discussions / Repository Wiki / Community Safety
  -> Social Curation / Subscriptions & Notifications / Search / Activity Feed
  -> App Management / Audit & Compliance
```

The diagram is a reading order, not directory nesting or a universal synchronous dependency chain. Every executable edge
is declared independently in `context-map.json` with provider, consumer, pattern, contract, consumer Port, consumer ACL,
consistency and failure mode.

## Account and governance distinctions

- `user-account` owns Personal／Managed User Account identity and lifecycle; only User Accounts can represent actors.
- `organization-account` owns Organization Account identity and lifecycle, not Profile、Membership or Team.
- `enterprise-account` owns Enterprise identity and Organization affiliation, not policy or administrative roles.
- `profile-presence` alone owns Account presentation. Account directory contracts do not publish `displayName`.
- `organization-participation` owns Membership、Invitation and Organization Team facts.
- `administrative-access-control` owns administrative role assignment; `policy-governance` owns enforceable constraints.
- Resource Contexts retain resource actions, grants, state preconditions and final decisions; no central God authorization Context exists.

## Runtime collaboration rules

```text
Consumer Application -> consumer-owned outbound Port
Consumer adapters/outbound/integrations -> Provider contracts/vN/public.ts
apps/web/src/composition -> Context composition/public-api
```

- Peer internals, provider persistence, shared mutable entities, cross-Context foreign-key navigation and cross-Context
  transactions are prohibited.
- Synchronous relationships fail according to their declared failure mode and must not form an undeclared dependency cycle.
- Search、Feed、Notification and Audit read models never become upstream transaction truth.
- Domain Events、Integration Events、Audit records and Notifications remain different types and lifecycles.
- A planned descriptor has no runtime directories, relationships, composition or imports and never enters the runtime map.

## Change gate

Update the provider manifest, consumer manifest and `context-map.json` together. A new relationship also requires the
provider Published Language, consumer-owned Port, consumer ACL adapter, focused compatibility tests and architecture
verification. Official GitHub evidence establishes product semantics; it does not by itself promote a candidate to Current.
