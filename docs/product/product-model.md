# Product model

狀態：Accepted GitHub non-code semantic baseline / runtime scope annotated

本產品直接採用 GitHub 的非 Code Published Language；只排除 Git、Commit、Branch、Diff、
Pull Request、Merge、Actions、Code Search、Codespaces、程式碼安全、部署及其他程式碼實作
能力。GitHub 文件導覽與本文件的 capability families 都不是 Bounded Context 清單。

逐概念的官方依據、定義、唯一 owner、tactical classification、允許／禁止關係與待驗證清冊由
[GitHub non-Code semantic model](github-non-code-semantic-model.md) 擁有；本文件只保留高階策略與 runtime annotation。

## World model

\`\`\`text
Authenticated Actor
performs Action
on Resource
inside Ownership / Governance Boundary
constrained by Relationships, Grants, Policy, Entitlement and Request Facts
→ owner-owned Authorization Decision
→ Domain Preconditions
→ State Transition
→ Domain Event
→ Notifications / Search / Dashboard / Audit / Integration
\`\`\`

## Semantic classification

| Type                  | GitHub language                                                                                                                   | Architecture meaning                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Product Context       | The 20 Current／Prototype Contexts listed below, including split Account, Profile, Participation, policy and collaboration owners | Approved or prototype app-local owners                    |
| Context candidate     | App Installation, Webhook Delivery, Marketplace, Billing, Sponsors, Support                                                       | Proposed until G1-G3 approves owner and first use case    |
| Relationship family   | Membership, Team membership, Follow, Star, Watch, Subscribe, Mention, Assignment                                                  | Owner-published directed facts                            |
| Control plane         | Authentication, Authorization, Policy, Entitlement, Audit, Integration                                                            | Cross-cutting responsibility, not automatically a Context |
| Governance boundary   | User/Organization/Enterprise account, Team, Repository, Project, Cost center, App installation                                    | Scope classification, not one aggregate type              |
| Experience surface    | Profile, Dashboard, Feed, Inbox, Explore, Command Palette, Web, Mobile                                                            | Consumer-facing route or read model                       |
| Architecture language | Port, Adapter, ACL, query result, view model, projection, composition root                                                        | Never promoted into GitHub product language               |

## Current runtime

| Context                       | Current ownership                                                             |
| ----------------------------- | ----------------------------------------------------------------------------- |
| Authentication Security       | Principal, authentication identity, credential verification and Session       |
| User Account                  | Personal Account identity and lifecycle; Managed User remains a later slice   |
| Organization Account          | Organization identity and lifecycle without Profile or participation          |
| Enterprise Account            | Enterprise identity, lifecycle and Organization affiliation                   |
| Profile & Presence            | Account presentation independently of Account identity                        |
| Organization Participation    | Membership, Invitation and Organization Team                                  |
| Administrative Access Control | administrative role assignment                                                |
| Policy Governance             | enforceable policy constraints and delegation                                 |
| Repository Governance         | Repository identity, ownership, visibility, state, features, roles and grants |
| Work Tracking                 | Issue, Issue Number, state, Label, Assignment and Assignee                    |
| Work Planning                 | Project and Project Item references                                           |
| Discussions                   | Repository Q&A Category, Discussion, Comment and accepted Answer              |
| Repository Wiki               | Wiki and Wiki Page state without exposing Git-backed storage                  |
| Community Safety              | Repository interaction limits and decisions                                   |
| Social Curation               | Repository Star state                                                         |
| Subscriptions & Notifications | separate subscription and Inbox lifecycles                                    |
| Search & Discovery            | non-Code Search Document Projection and query                                 |
| App Management                | Personal Account-owned private GitHub App Registration                        |
| Activity Feed                 | prototype recipient-scoped Feed Item                                          |
| Audit & Compliance            | prototype administrative observation                                          |

Everything else in the non-code catalog is Research or Proposed. Presence in GitHub does not make local
runtime Current.

## Target Context inventory

ADR 0014 fixes the current physical portfolio at 37 descriptors, while logical owners may still change only through new
official lifecycle and ownership evidence. Earlier convenience maps merged distinctions including Authentication versus
Identity Federation, Subscription versus Notification, and App Registry versus App Installation／Authorization versus
Webhook Delivery. The authoritative logical owner inventory is maintained in
[GitHub non-Code semantic model](github-non-code-semantic-model.md#semantic-owner-registry).

This correction does not create runtime directories. Existing `authentication-security` and Account contexts contain only
their approved current slices; every additional Context still requires independent owner, lifecycle, invariant, first-use-case
and source-of-truth evidence.

### Complete product-suite scenario

The referenced product-model discussion also covers GitHub Education、Campus Program、Classroom、Certifications and
Developer Program. Official documentation supports independent application/verification、institution partnership、course
administration、exam/credential and program-membership lifecycles. The detailed canonical inventory therefore records an
**Accepted 6-Group／12-Area／37-candidate portfolio taxonomy**.

ADR 0014 supersedes ADR 0013's closed registry. The architecture control plane may migrate governance placement while
preserving the fourteen Current Context IDs, Published Language and behavior. Programs remains Research: its governance
parents may exist, but every Programs Context still requires independent G1-G3 approval.

## Semantic reconstruction order

The target is reconstructed from Ubiquitous Language and invariants, not from routes, adapters or empty template
directories. Within each approved slice the implementation order is causal rather than a fixed tactical checklist:

```text
approved use case and official non-code behavior evidence
→ acceptance and failure cases
→ Ubiquitous Language and invariants
→ Aggregate and transaction boundary
→ only the necessary tactical Domain artifacts and tests
→ named Command / Query and Application Ports
→ peer contract only for an approved consumer relationship
→ outbound and inbound Adapters
→ Context and app composition, app-facing API, Presentation and runtime verification
```

Value Objects are immutable, compare by value, validate or canonicalize at construction, and belong to exactly one
Bounded Context. There is no global Account ID, Name, Status, Role, Scope or Reference type and no ownership-free
`shared/value-objects` layer. Provider-owned references cross a Context boundary only through versioned Published
Language; internal Domain Value Objects never cross that boundary directly.

The first implementation wave is the ownership and resource spine already backed by approved runtime evidence:

1. **Account & Profile**: User Account and Organization Account own identity, handle, kind and lifecycle. Profile &
   Presence owns presentation. Organization Participation separately owns Membership, Invitation and Team.
2. **Authentication**: Principal identity/status, authentication method and Session identity/expiry; browser tokens and
   cookies remain Application/Adapter concerns. Identity Federation is a separate lifecycle and requires its own gate.
3. **Repository**: Repository identity/name-with-owner, Personal Account or Organization ownership, profile,
   visibility, state, feature configuration and lifecycle values. Repository-scoped roles, grants, permissions and
   decisions belong to the approved Authorization & Policy Context and are consumed through a Repository-owned Port.
4. **Issue Management**: repository-scoped Issue Number, state, title, Label name/color, Assignee, Milestone and
   dependency values.
5. **Project Planning and Enterprise Account**: Work Planning owns Project item/field values; Enterprise Account owns
   Enterprise identity and Organization affiliation. Policy constraints remain in Policy Governance.

Only after those approved Contexts have real Domain/Application/Adapter slices does research proceed according to the
dependency order in the detailed inventory. Research sequence never merges owners and never makes a target Current; each
target still requires its own G1-G3 approval.

## Required distinctions

- Identity identifies and authenticates the Actor; Account owns resources or governance boundaries.
- Organization and Enterprise do not replace the authenticated User Actor.
- Enterprise governs Organizations; User or Organization owns Repository and Project.
- Repository links to Project; it does not own the Project aggregate.
- Issue state is open/closed; deletion is a separate lifecycle operation.
- Assignee is an eligible User Principal; Team mention and Team Repository access are separate relations.
- Profile, Dashboard, Feed, Inbox and Search results are product surfaces; projection is only an implementation term.
- Plan, License, Seat, Entitlement, Billing and Cost center are distinct commercial concepts.

Detailed owners are routed through [README.md](README.md), while the cross-context runtime model remains
canonical in [platform-world-model.md](platform-world-model.md).
