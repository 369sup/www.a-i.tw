# Platform World Model

## Purpose

Route only the shared Actor, Boundary, Resource, Relationship, Authority, Decision, Event and Projection semantics. Domain-specific control planes have separate canonical documents and separate memories.

## Core Flow

Identity and Credential establish a Principal that acts as an Actor. Relationships and Grants are reduced by Constraints, credential restrictions and request facts to derive Effective Authority and a Capability Relation. A concrete Command(Action, Resource, Boundary) is evaluated by the Resource owner. Allow still requires Domain Preconditions before State Transition. Domain Events are distinct from Audit, Webhook, Notification and Projection effects.

## Routing

- Enterprise governance: `mem:10-product/enterprise-governance`
- Entitlement: `mem:10-product/entitlement`
- Notification: `mem:10-product/notification`
- Search: `mem:10-product/search`
- Governance boundary taxonomy: `mem:10-product/governance-boundary-taxonomy`
- Request context: `mem:30-architecture/request-context-resolution`

Do not infer a shared Context or owner from their appearance as cross-cutting responsibilities.

## Canonical

- `docs/product/platform-world-model.md`
- `docs/product/product-model.md`

## Last Verified

- Date: 2026-07-12
- Evidence: separate canonical routes pass docs:check and pnpm check.
