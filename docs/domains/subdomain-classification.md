# Subdomain classification

狀態：Baseline / reviewed 2026-07-12

| Subdomain                  | Context               | Class               | Change driver                      | Build / buy / integrate |
| -------------------------- | --------------------- | ------------------- | ---------------------------------- | ----------------------- |
| Authentication mechanism   | Identity & Access     | Generic             | provider and assurance             | Integrate behind Ports  |
| Identity policy            | Identity & Access     | Supporting          | attribution/session rules          | Build                   |
| Account ownership          | Account               | Supporting          | ownership and namespace            | Build                   |
| Organization relationships | Account               | Core extension      | Membership and Team lifecycle      | Build                   |
| Enterprise governance      | Enterprise Governance | Core                | cross-Organization policy boundary | Build                   |
| Repository governance      | Repository            | Core                | product differentiation            | Build                   |
| Work tracking candidate    | Issues candidate      | Core extension      | Issue lifecycle and responsibility | Build after approval    |
| Template management        | Master Template       | Supporting          | architecture reference             | Build                   |
| Sub Template               | Master Template       | Supporting internal | catalog/content rules              | Build internally        |

`Sub Template` is declared by `master-template.context.json.internalSubdomains`;
it is not a second Bounded Context. Membership and Team are classified runtime extensions. Enterprise governance is
an approved Core subdomain; Identity Governance, Billing, Entitlement, Audit and Repository transfer remain separate
deferred boundaries.
Reclassification requires Product owner review and an ADR when boundaries change.
