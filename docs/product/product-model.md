# Product model

狀態：Accepted GitHub non-code semantic baseline / runtime scope annotated

本產品直接採用 GitHub 的非 Code Published Language；只排除 Git、Commit、Branch、Diff、
Pull Request、Merge、Actions、Code Search、Codespaces、程式碼安全、部署及其他程式碼實作
能力。GitHub 文件導覽與本文件的 capability families 都不是 Bounded Context 清單。

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

| Type                  | GitHub language                                                                                                                           | Architecture meaning                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Product Context       | Identity & Access, Account, Enterprise Governance, Repository, Issues, Projects, Discussions, Notifications, Search, Activity Feed, Audit | Approved or prototype app-local owners                    |
| Context candidate     | Apps, Billing, Sponsors, Support                                                                                                          | Proposed until G1-G3 approves owner and first use case    |
| Relationship family   | Membership, Team membership, Follow, Star, Watch, Subscribe, Mention, Assignment                                                          | Owner-published directed facts                            |
| Control plane         | Authentication, Authorization, Policy, Entitlement, Audit, Integration                                                                    | Cross-cutting responsibility, not automatically a Context |
| Governance boundary   | User/Organization/Enterprise account, Team, Repository, Project, Cost center, App installation                                            | Scope classification, not one aggregate type              |
| Experience surface    | Profile, Dashboard, Feed, Inbox, Explore, Command Palette, Web, Mobile                                                                    | Consumer-facing route or read model                       |
| Architecture language | Port, Adapter, ACL, query result, view model, projection, composition root                                                                | Never promoted into GitHub product language               |

## Current runtime

| Context               | Current ownership                                                                       |
| --------------------- | --------------------------------------------------------------------------------------- |
| Identity & Access     | Principal, authentication identity, credential verification and in-memory Session       |
| Account               | Personal/Organization Account, Profile, Membership, Invitation and Organization Team    |
| Enterprise Governance | Enterprise, Organization affiliation, owner assignment and Repository visibility policy |
| Repository            | Repository identity, ownership, visibility, role, grant, lifecycle and access decision  |
| Issues                | Issue, Issue Number, open/closed state, Label, Assignment and Assignee                  |
| Projects              | Project and Project Item references                                                     |
| Discussions           | Prototype Discussion record                                                             |
| Notifications         | Prototype Notification and Inbox state                                                  |
| Search                | Prototype non-code Search Document and Result Set                                       |
| Activity Feed         | Prototype recipient-scoped Feed Item                                                    |
| Audit                 | Prototype administrative observation                                                    |

Everything else in the non-code catalog is Research or Proposed. Presence in GitHub does not make local
runtime Current.

## Complete target Context inventory

The GitHub non-code target contains 19 logical Contexts. This is a migration target, not a claim that all are runtime:

1. Account & Profile
2. Authentication & Federation
3. Enterprise Governance
4. Organization Directory
5. Authorization & Policy
6. Repository Workspace
7. Issue Management
8. Project Planning
9. Discussions
10. Knowledge
11. Community Safety
12. Social Graph
13. Search & Discovery
14. Subscription & Notification
15. Integration Ecosystem
16. Entitlement & Licensing
17. Billing & Cost
18. Sponsorship
19. Audit & Compliance

Existing `identity-access` and `account` modules currently contain the approved first slices of targets 1, 2 and 4.
Extraction into additional Contexts requires independent lifecycle, invariants and integration evidence.

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
