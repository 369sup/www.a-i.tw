# Network Domain Governance Bounded Context

## Status and ownership

- Lifecycle: `prototype`.
- Owner: www.a-i.tw Product Team.
- Source of truth: `DomainVerification`, `VerifiedDomain`.
- Approved use case: an Enterprise owner starts and completes one authoritative DNS TXT ownership challenge.

## Required boundaries

- Domain code owns DNS-name canonicalization, challenge construction, and the `pending` to `verified` transition.
- Application code owns authorization sequencing and retryable DNS failure behavior.
- Peer access is limited to the provider contracts named in `context.json`; never import upstream internals.
- Concrete repositories, verifier implementations, clocks, generators, and cross-Context wiring belong to
  `composition` or `apps/web/src/composition/product-composition.ts`.
- Keep `contracts/v1/public.ts` empty until a real peer consumer is approved.

## Allowed dependencies

- `enterprise-account` via `EnterpriseAccountDirectoryApiV1` ->
  `NetworkDomainEnterpriseDirectoryAdapter`.
- `administrative-access-control` via `AdministrativeAccessApiV1` ->
  `NetworkDomainAdministrationAdapter`.

## Invariants

- Trim, remove one trailing dot, and lowercase ASCII DNS hostnames.
- Preserve the distinction between root and `www` hostnames.
- Reject duplicate canonical hostnames within the same Enterprise.
- Require an existing Enterprise and an Enterprise owner for every operation.
- Preserve `pending` on missing, mismatched, or unavailable DNS answers.
- Create `VerifiedDomain` state only after an authoritative match.

## Exclusions

Do not add approved-domain preview, Organization domain verification, email policy, member-email projection, IP
allow lists, continuous monitoring, Pages custom-domain security, or authentication/authorization semantics.

## Verification

Run focused Domain, Application, persistence, ACL, and inbound-adapter tests; then run architecture, docs,
typecheck/build, Semgrep when security-sensitive, and inspect the final diff.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `prototype`; runtime evidence: `in-memory-prototype`.
- Owner: www.a-i.tw Product Team.
- Problem: Own Enterprise domain ownership verification independently of identity, authorization and organization-level domain policy.
- Evidence status: Confirmed for the approved first slice.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `DomainVerification`
- `VerifiedDomain`

### Does not own

- authentication or administrative authorization
- Organization-level domain verification or policy
- email policy or member-email projection
- IP allow lists or continuous DNS monitoring
- Pages custom-domain security

### Ubiquitous language

- Enterprise Domain Name
- DNS TXT Challenge
- Domain Verification
- Verified Domain
- authoritative DNS answer

### Core invariants

- Canonicalization trims, removes one trailing dot, and lowercases ASCII DNS names while preserving root and `www`
  distinction.
- An available Enterprise and Enterprise-owner authority are required for every operation.
- Duplicate canonical hostnames are rejected within one Enterprise.
- Missing, mismatched, or unavailable DNS answers preserve `pending`; only a matching answer transitions to verified.

### Allowed dependencies

- Consumes from `enterprise-account` through `EnterpriseAccountDirectoryApiV1` (synchronous, prototype).
- Consumes from `administrative-access-control` through `AdministrativeAccessApiV1` (synchronous, prototype).

Cross-Context calls require the consumer-owned Ports and ACLs declared in `context.json`. Concrete peer wiring remains
in app composition.

### Non-Code boundary

The `_a-i-domain-verification.<domain>` challenge record is local prototype behavior, not GitHub record naming.

### Change and promotion gate

Any source-of-truth, relationship, lifecycle, challenge naming, or exclusion change requires matching canonical owner,
manifest, Context Map, focused tests, architecture checks, documentation checks, and dated runtime evidence.

### Official evidence

Evidence IDs: `A6`, `A11`. Definitions are centralized in
`docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
