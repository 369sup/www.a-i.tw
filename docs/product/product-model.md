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

| Type                  | GitHub language                                                                                                                                                                   | Architecture meaning                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Product Context       | Identity & Access, Account, Authorization & Policy, Enterprise Governance, Repository, Issues, Projects, Discussions, Notifications, Search, App Management, Activity Feed, Audit | Approved or prototype app-local owners                    |
| Context candidate     | App Installation, Webhook Delivery, Marketplace, Billing, Sponsors, Support                                                                                                       | Proposed until G1-G3 approves owner and first use case    |
| Relationship family   | Membership, Team membership, Follow, Star, Watch, Subscribe, Mention, Assignment                                                                                                  | Owner-published directed facts                            |
| Control plane         | Authentication, Authorization, Policy, Entitlement, Audit, Integration                                                                                                            | Cross-cutting responsibility, not automatically a Context |
| Governance boundary   | User/Organization/Enterprise account, Team, Repository, Project, Cost center, App installation                                                                                    | Scope classification, not one aggregate type              |
| Experience surface    | Profile, Dashboard, Feed, Inbox, Explore, Command Palette, Web, Mobile                                                                                                            | Consumer-facing route or read model                       |
| Architecture language | Port, Adapter, ACL, query result, view model, projection, composition root                                                                                                        | Never promoted into GitHub product language               |

## Current runtime

| Context                | Current ownership                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| Identity & Access      | Principal, authentication identity, credential verification and in-memory Session                       |
| Account                | Personal/Organization Account, Profile, Membership, Invitation and Organization Team                    |
| Enterprise Governance  | Enterprise, Organization affiliation, owner assignment and Repository visibility policy                 |
| Authorization & Policy | Repository Role, Repository Access Grant and non-Code Authorization Decision                            |
| Repository             | Repository identity, Account ownership, profile, visibility, state, feature configuration and lifecycle |
| Issues                 | Issue, Issue Number, open/closed state, Label, Assignment and Assignee                                  |
| Projects               | Project and Project Item references                                                                     |
| Discussions            | Repository Q&A Category, Discussion, Comment and accepted Answer                                        |
| Notifications          | Prototype Notification and Inbox state                                                                  |
| Search                 | Prototype non-code Search Document and Result Set                                                       |
| App Management         | Personal Account-owned private GitHub App Registration                                                  |
| Activity Feed          | Prototype recipient-scoped Feed Item                                                                    |
| Audit                  | Prototype administrative observation                                                                    |

Everything else in the non-code catalog is Research or Proposed. Presence in GitHub does not make local
runtime Current.

## Target Context inventory

There is no fixed Context count. Earlier planning used a 19-Context convenience map, but official lifecycle and ownership
evidence requires distinctions that the count merged, including Authentication versus Identity Federation, Subscription
versus Notification, and App Registry versus App Installation／Authorization versus Webhook Delivery. The authoritative
logical owner inventory is maintained in
[GitHub non-Code semantic model](github-non-code-semantic-model.md#semantic-owner-registry).

This correction does not create runtime directories. Existing `authentication-security` and Account contexts contain only
their approved current slices; every additional Context still requires independent owner, lifecycle, invariant, first-use-case
and source-of-truth evidence.

### Complete product-suite scenario

The referenced product-model discussion also covers GitHub Education、Campus Program、Classroom、Certifications and
Developer Program. Official documentation supports independent application/verification、institution partnership、course
administration、exam/credential and program-membership lifecycles. The detailed canonical inventory therefore records an
**Accepted 6-Group／12-Area／35-candidate portfolio taxonomy**.

ADR 0014 supersedes ADR 0013's closed registry. The architecture control plane may migrate governance placement while
preserving the fourteen Current Context IDs, Published Language and behavior. Programs remains Research: its governance
parents may exist, but every Programs Context still requires independent G1-G3 approval.

## Semantic reconstruction order

The target is reconstructed from Ubiquitous Language and invariants, not from routes, adapters or empty template
directories. Within each approved slice the implementation order is fixed:

```text
official non-code behavior evidence
→ Ubiquitous Language and invariants
→ Context-owned Value Objects
→ Entity / Aggregate and Domain errors
→ Domain tests
→ named Command / Query and Application Ports
→ outbound and inbound Adapters
→ server composition and Presentation
```

Value Objects are immutable, compare by value, validate or canonicalize at construction, and belong to exactly one
Bounded Context. There is no global Account ID, Name, Status, Role, Scope or Reference type and no ownership-free
`shared/value-objects` layer. Provider-owned references cross a Context boundary only through versioned Published
Language; internal Domain Value Objects never cross that boundary directly.

The first implementation wave is the ownership and resource spine already backed by approved runtime evidence:

1. **Account & Profile**: `AccountId`, `AccountHandle`, `AccountKind`, `AccountStatus`, then Profile, Membership,
   Invitation and Team values. The first complete use case is Create Account.
2. **Authentication**: Principal identity/status, authentication method and Session identity/expiry; browser tokens and
   cookies remain Application/Adapter concerns. Identity Federation is a separate lifecycle and requires its own gate.
3. **Repository**: Repository identity/name-with-owner, Personal Account or Organization ownership, profile,
   visibility, state, feature configuration and lifecycle values. Repository-scoped roles, grants, permissions and
   decisions belong to the approved Authorization & Policy Context and are consumed through a Repository-owned Port.
4. **Issue Management**: repository-scoped Issue Number, state, title, Label name/color, Assignee, Milestone and
   dependency values.
5. **Project Planning and Enterprise Governance**: account-owned Project item/field values and Enterprise-owned policy
   constraints.

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
