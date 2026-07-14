# Context migration roadmap

狀態：Current / baseline established

1. **Completed**: app-local topology, owners, Context Map and architecture gates.
2. **Completed**: in-memory Principal, Account and non-code Repository slice.
3. **Engineering-only**: master/sub template validation exists but is excluded from product sequencing.
4. **Completed**: organization Membership invitation, acceptance, removal and `MembershipFactV1` application slice.
5. **Completed**: Team aggregate, membership management, `TeamMembershipFactV1` and Team-based Repository grants.
6. **Completed in-memory slice**: Issue → Label → Assignment in Issues with Repository participation ACL.
7. **Completed in-memory baseline**: Password mock Login, browser Session, Identity Resolution, Account Profile, Actor/Scope distinction and Personal Dashboard gate.
8. **Completed baseline**: minimal Request Envelope plus distributed Repository Capability Context resolver and owner decision.
9. **Completed first slice**: Projects with typed Issue/Draft Items, Account owner and Issue directory ACLs.
10. **Completed first slice**: Enterprise Governance affiliation and Repository visibility constraints.
11. **Completed — semantic reconstruction foundation**: Account & Profile now starts with `AccountId`, `AccountHandle`,
    `AccountKind` and `AccountStatus`; Create Account is a verified Domain → Application → Adapter slice.
12. **Completed — Account Profile foundation**: `ProfileDisplayName`, `ProfileBio` and `ProfileWebsite` now own their
    construction invariants; Update Profile is a Domain → Application → Adapter slice.
13. **Completed — Account Membership and Team foundation**: Membership/Invitation identity and lifecycle values,
    seven-day invitation expiry, Team identity/name and typed Membership references now protect the existing approved
    runtime; outbound stores are Application Ports and persistence seeds reconstruct through Domain factories.
14. **Completed — Authentication foundation**: Principal identity/kind/status, authentication
    method/assurance and Session identity/status/eight-hour expiry now protect Login, resolution and Logout. Browser
    tokens remain Adapter concerns. Federation, production providers, durable persistence, 2FA, passkey, device and IdP
    verification remain Research until separately approved.
15. **Completed — Repository core Create slice**: Repository identity, Account owner reference, Name With Owner,
    description, optional HTTP(S) homepage, visibility and lifecycle values now protect creation and persistence
    reconstruction. `Workspace` is not a product resource or presentation name. Feature configuration and unresolved lifecycle
    transitions remain separate Repository core follow-ups.
16. **Completed — Authorization & Policy Repository access slice**: predefined Repository Role, eligible Principal/Team
    Access Grant and fail-closed non-Code decisions now belong to `collaboration/repository-work/repository-governance`; Repository consumes
    `AuthorizationPolicyApiV1` through its own Port/ACL and keeps only the Issues participation compatibility facade.
17. **Completed — Repository product-language normalization**: the authenticated route is `/repositories`, presentation
    lives under `repository-console`, the wiring root is `product-composition`, and `arch:source` rejects `Workspace`
    product language in web runtime source. Package-manager and deployment-unit uses remain technical terminology.
18. **Completed — Discussions Q&A slice**: Context-owned Category, Discussion and Comment values now protect
    Repository-scoped creation, commenting and accepted Answer selection. Discussion author or Repository `triage+`
    may mark an active Comment; the Context consumes Repository participation through its own Port/ACL and fails closed.
19. **Research before implementation**: Knowledge, Community Safety, Social Graph, Notifications, Search,
    Apps, Billing, Sponsors, Audit and Support must each pass G1-G3; no capability family automatically
    becomes a Context and no universal Context Service is allowed.
20. **Target Context sequence**: Knowledge → Community Safety → Social Graph → Subscription &
    Notification → Search & Discovery → Integration Ecosystem → Identity Governance → Entitlement & Licensing →
    Billing & Cost → Sponsorship → Audit & Compliance. Order may change only with documented product evidence.
21. **Extraction gate**: only independent deployment, scaling, compliance,
    ownership or release-cadence evidence permits service/workspace extraction.

Each step requires entry evidence, rollback, compatibility impact and exit verification.

## Next Bounded Context development: Knowledge

狀態：Current in-memory first slice / G1-G7 completed 2026-07-14

Knowledge remains the first research target because Repository-scoped Wiki has an independently evidenced page/access
lifecycle and does not require source-code semantics. The first vertical slice is:

> In an enabled Repository Wiki, an authorized actor creates the first uniquely titled non-empty Wiki Page and reads it
> through a Knowledge-owned query without exposing Git-backed storage details.

| Gate | Required decision/evidence                                                                                                                       | Exit condition                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| G0   | Re-read Repository, Authorization & Policy and Discussions manifests/contracts plus Wiki official evidence                                       | Current owners, consumers and compatibility surface are recorded             |
| G1   | Approve `Wiki`, `WikiPage`, normalized `WikiPageTitle`, content, publication state and Repository scope; keep Git history/storage excluded       | Completed in `docs/product/repository-wiki.md`                               |
| G2   | Update Knowledge rows, Ubiquitous Language, context catalog/map and application authorization responsibility                                     | Completed; Repository participation facade remains the access decision owner |
| G3   | Approve `collaboration/community-knowledge/repository-wiki`, Supporting classification, source of truth and first use case                       | Completed; generator inputs accepted                                         |
| G4   | Run `pnpm generate:context` only after G1-G3                                                                                                     | Completed; template v2 Context and manifest registered                       |
| G5   | Implement Domain values/Aggregate/errors/tests, then Application command/query and outbound Ports                                                | Completed; focused Domain/Application tests passed                           |
| G6   | Add consumer-owned Repository/Authorization ACL adapters and app composition; add only the thin inbound surface needed by the use case           | Completed; Repository ACL and server composition wired                       |
| G7   | Run diagnostics, focused tests, typecheck, `pnpm docs:check`, `pnpm arch:check`, build, available security/E2E checks and publish dated evidence | Completed; results recorded in the dated implementation evidence             |

### Ownership and dependency proposal

```text
Knowledge application
├── RepositoryWikiParticipationPort
│   └── Knowledge-owned outbound integration adapter
│       └── Repository contracts/v1/public.ts
└── WikiPageStore
    └── Knowledge-owned persistence adapter
```

- Knowledge owns Wiki/Page identity, title/content invariants and publication lifecycle.
- Repository owns Repository existence, lifecycle and Wiki feature availability.
- Authorization & Policy owns grants/role decisions; Repository publishes the compatibility participation facade;
  Knowledge owns the final Wiki command preconditions.
- Repository, Discussions and Search do not write Knowledge state. Search may later consume a versioned Knowledge
  publication event after an independently approved producer/consumer edge.
- Rollback before G4 is documentation-only. After G4, rollback removes only the uncomposed Knowledge slice and its
  declared Context Map edges; it must not alter Repository or Authorization contracts without compatibility review.

## Next Bounded Context development: Community Safety

狀態：Completed 2026-07-14 / G0-G7 passed

The next proposed vertical slice avoids a synchronous Discussions ↔ Moderation cycle by starting with a
Repository-scoped interaction rule rather than Conversation locking:

> A Repository admin activates a one-day `collaborators_only` Interaction Limit for a public Repository; Issue and
> Discussion comment commands can obtain a fail-closed decision that permits Repository collaborators and rejects other
> actors until the limit expires or is removed.

Official GitHub semantics support Repository and Organization interaction limits, owner/admin control, temporary expiry,
and owner-level override. The first slice deliberately excludes `contributors_only`, Pull Requests and source-code
contribution history.

| Gate  | Required decision/evidence                                                                                                  | Exit condition                                               |
| ----- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| G0    | Re-read Repository, Authorization, Issues and Discussions contracts plus official interaction-limit evidence                | Current compatibility surface and cycle risk recorded        |
| G1    | Approve `InteractionLimit`, scope, `collaborators_only`, one-day expiry/removal and decision semantics                      | Completed in `docs/product/community-safety.md`              |
| G2    | Assign Community Safety as rule owner; keep Repository access facts upstream and content state in source Contexts           | Completed; ownership and exclusions accepted                 |
| G3    | Approve `collaboration/community-knowledge/community-safety`, Supporting classification, source of truth and first use case | Completed; generator inputs and fail-closed edges accepted   |
| G4-G7 | Scaffold, implement inside-out, compose consumers and verify                                                                | Completed; 16-Context architecture and runtime checks passed |

## Next Bounded Context development: Social Curation

狀態：Current / G0-G7 completed

The next proposed vertical slice keeps Star separate from Watch and Follow:

> An authenticated active User stars or unstars a Repository that the User can read, then lists the User's own starred
> Repository references ordered by `starredAt`.

GitHub defines Star as a bookmark and interest/appreciation signal. Official REST documentation explicitly states that
Stars do not affect notifications or the activity feed. Private Repositories may participate only when the viewer has
read access; public Star Lists are a later lifecycle and must filter private entries by Repository read access.

| Gate  | Required decision/evidence                                                                                               | Exit condition                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| G0    | Re-read Identity, Repository, Subscription, Activity Feed and Search contracts plus official Star evidence               | Completed; current access surface and overlap risks recorded                      |
| G1    | Approve `RepositoryStar`, `starredAt`, idempotent star/unstar and authenticated-owner list semantics                     | Completed in `docs/product/social-graph.md`                                       |
| G2    | Assign Social Curation as Star owner; keep Repository visibility/access upstream and Watch/Notification outside          | Completed; no duplicate Repository or Subscription ownership                      |
| G3    | Approve `engagement/engagement-discovery/social-curation`, Supporting classification, source of truth and first use case | Completed; generator inputs and fail-closed edge accepted                         |
| G4-G7 | Scaffold, implement inside-out, compose Repository access, add UI and verify                                             | Completed; 17-Context architecture, runtime and Chromium acceptance checks passed |

## Subscription and Notification boundary slice

Approved first cross-Context use case:

> An authenticated Notification recipient unsubscribes from the Notification. Notifications validates ownership, asks
> Subscriptions to deactivate the Notification subject's Conversation Subscription, and then marks the Notification done.

Official GitHub semantics distinguish ongoing subscriptions from individual notifications. Inbox `Read/Unread`, `Done`
and `Saved` are separate triage dimensions; Done does not unsubscribe, while the explicit Unsubscribe action both removes
the current Notification from the active Inbox and stops future conversation updates.

| Gate  | Required decision/evidence                                                                                | Exit condition                                                                                              |
| ----- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| G0    | Read official notification, subscription, watching, Inbox triage and retention documentation              | Completed; current route/runtime mismatch and canonical stale claim recorded                                |
| G1    | Approve separate Subscription and Notification owners plus explicit Inbox Unsubscribe process             | Completed in `docs/product/notification.md`                                                                 |
| G2    | Model `readState`, `inboxState` and `saved` independently; Done must not alter Subscription               | Completed; invariants and retention semantics approved                                                      |
| G3    | Approve Notifications consumer Port/ACL to Subscriptions `SubscriptionManagementApiV1` Published Language | Completed; fail-closed synchronous dependency accepted                                                      |
| G4-G7 | Update runtime/contracts/composition/UI, add focused and acceptance coverage, then publish dated evidence | Completed 2026-07-14; 17-Context architecture, 117 Web tests, build, Semgrep and Chromium acceptance passed |

## Search & Discovery first slice

狀態：Current / G0-G7 completed 2026-07-14

> An authenticated viewer searches a replacement snapshot containing only product-resource projections already
> visible to that viewer and navigates to matching Account、Repository、Issue、Project or Discussion resources.

| Gate  | Required decision/evidence                                                                                         | Exit condition                                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| G0-G1 | Re-read official integrated Search、scope、suggestion、index and visibility behavior; exclude Code Search          | Completed in `docs/product/search.md`                                                                                      |
| G2-G3 | Assign Search Document Projection and Query ownership; keep source truth/authorization upstream and Result derived | Completed; manifest source truth is only `SearchDocumentProjection`                                                        |
| G4-G6 | Harden Domain values, viewer-scoped replacement index Port/adapter and authenticated command-palette composition   | Completed; source Context internals remain outside Search                                                                  |
| G7    | Run focused Domain/Application tests, diagnostics, typecheck, docs, architecture, build, security and E2E checks   | Completed; Search-relevant gates passed, while aggregate topology is blocked only by an unrelated missing local skill file |

## Complete portfolio follow-up

The 6-Group／12-Area／35-candidate taxonomy in Accepted ADR 0014 is a portfolio-classification decision, not the next
runtime wave. Its Programs candidates remain behind Knowledge、Community Safety and the approved core dependency sequence.
The `programs` Group and Areas are governance-only reservations; no Programs Context is created until one use case
independently passes G1-G3.

## Integration Ecosystem: App Registry first slice

狀態：Current first slice / G1-G7 completed 2026-07-14

> An authenticated Personal Account owner creates a private GitHub App registration with a unique name, required
> homepage URL and optional callback URL, then lists registrations owned by that account from `/settings/apps`.

| Gate  | Decision / evidence                                                                                                       | Result                                                                        |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| G0-G1 | Re-read App Registry／Installation owners and official registration/using-apps behavior; exclude Code and token mechanics | App Registration confirmed as separate lifecycle and owner                    |
| G2    | Assign `GitHubAppRegistration` to App Management; consume Personal Account owner facts through Published Language         | Approved; Installation、Authorization、Webhook and Marketplace excluded       |
| G3    | Approve `ecosystem/integrations-marketplace/app-management`, Supporting classification and first use case                 | Approved; generator inputs fixed                                              |
| G4-G7 | Generate Context, implement inside-out, compose settings UX and verify                                                    | Completed; runtime, architecture, build, security and focused Chromium passed |

Rollback before G4 removes only this documentation approval. After G4, rollback removes the uncomposed App Management
slice and its Context Map edge; Account contracts require a compatibility review before removal.

## ADR 0008 internal-topology migration

狀態：Completed 2026-07-12

1. **Completed**: canonical documents, generators, validators, Dependency Cruiser, Semgrep, skills and commands.
2. **Completed**: all eleven Contexts migrated by declared subdomain and Hexagonal layer.
3. **Completed**: Context entrypoints, Published Language imports, composition roots and focused tests updated.
4. **Completed**: `legacyContexts` is empty and migration mode is `target`.
