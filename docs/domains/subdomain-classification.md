# Subdomain classification

狀態：Baseline / reviewed 2026-07-12

| Subdomain                | Context           | Class               | Change driver             | Build / buy / integrate |
| ------------------------ | ----------------- | ------------------- | ------------------------- | ----------------------- |
| Authentication mechanism | Identity & Access | Generic             | provider and assurance    | Integrate behind Ports  |
| Identity policy          | Identity & Access | Supporting          | attribution/session rules | Build                   |
| Account ownership        | Account           | Supporting          | ownership and namespace   | Build                   |
| Repository governance    | Repository        | Core                | product differentiation   | Build                   |
| Template management      | Master Template   | Supporting          | architecture reference    | Build                   |
| Sub Template             | Master Template   | Supporting internal | catalog/content rules     | Build internally        |

`Sub Template` is declared by `master-template.context.json.internalSubdomains`;
it is not a second Bounded Context. Enterprise governance、Membership、Team 與
Repository transfer remain unclassified extensions until product evidence exists.
Reclassification requires Product owner review and an ADR when boundaries change.
