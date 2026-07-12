# ADR 0010: Enterprise Governance Context

狀態：Accepted 2026-07-12

## Context

GitHub Enterprise centrally governs multiple Organizations and can enforce policy that Organization owners cannot
override. It cannot directly own Repository or Project resources. Treating Enterprise as `Account.kind` would merge
different ownership, policy and lifecycle rules.

## Decision

Create `enterprise-governance` as a Core Bounded Context. Its first aggregate owns Enterprise identity,
Organization affiliations and Repository visibility policy. Account publishes Organization eligibility facts;
Repository consumes Enterprise governance constraints through a Repository-owned Application Port and Infrastructure ACL.

The first use case is: an Enterprise owner affiliates an Organization and forbids Public Repository creation or
visibility changes for that Organization.

## Boundaries

- Enterprise does not own Repository, Project, Organization Membership, credential, Session, Invoice or Audit Entry.
- Repository owns the final create/change-visibility decision and fails closed when governance facts are unavailable.
- Enterprise Team, Managed User, Entitlement, Billing and Audit remain outside this slice.
- Cross-context integration uses provider Published Language, consumer-owned Ports, ACL adapters and server composition.

## Consequences

Enterprise policy becomes an authoritative constraint without becoming a central authorization service. Future
Enterprise capabilities require their own G0-G7 approval and cannot be inferred from this first slice.
