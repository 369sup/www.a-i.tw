# Network Domain Governance

Lifecycle: `prototype`

Own Enterprise DNS ownership verification independently of identity, authorization, organization-level domain
policy, and network-origin enforcement.

## Approved first use case

An Enterprise owner starts a DNS TXT ownership challenge for one hostname and completes it only after the
authoritative lookup matches the expected value. Missing, mismatched, or unavailable DNS remains retryable
`pending`.

## Source of truth

- `DomainVerification`
- `VerifiedDomain`

The local prototype record is `_a-i-domain-verification.<domain>`. This is www.a-i.tw product behavior, not a claim
about GitHub's record naming.

## Boundaries and relationships

- `enterprise-account` provides `EnterpriseAccountDirectoryApiV1` through the consumer-owned
  `NetworkDomainEnterpriseDirectory` Port and `NetworkDomainEnterpriseDirectoryAdapter` ACL.
- `administrative-access-control` provides `AdministrativeAccessApiV1` through the consumer-owned
  `NetworkDomainAdministration` Port and `NetworkDomainAdministrationAdapter` ACL.
- Concrete wiring remains in `apps/web/src/composition/product-composition.ts`.
- This Context has no peer consumer, so `contracts/v1/public.ts` intentionally exposes no Published Language.

## Invariants

- Hostnames are trimmed, one trailing dot is removed, and ASCII DNS names are lowercased.
- Root and `www` hostnames are distinct.
- One Enterprise cannot start a second verification for the same canonical hostname.
- Only an Enterprise owner can start, list, or complete a challenge.
- Only a matching authoritative TXT answer transitions `pending` to `verified`.
- DNS lookup failures never erase or verify the pending challenge.

## Explicit exclusions

Approved domains public preview, Organization-level verification, email policy, member-email projection, IP allow
lists, continuous DNS monitoring, and Pages custom-domain security are not part of this slice.

## Evidence

Canonical evidence IDs: `A6`, `A11`. See
`docs/product/github-non-code-semantic-model.md#official-evidence-ledger` and
`docs/initiatives/github-non-code-37-context-prototypes/wave-1-enterprise-governance.md`.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own Enterprise domain ownership verification independently of identity, authorization and organization-level domain policy.

This directory is the declared local ownership boundary for `DomainVerification`, `VerifiedDomain`. Its physical
presence and prototype implementation do not transfer authentication, authorization, organization-domain policy, IP
allow-list, email-policy, or Pages custom-domain ownership into this Context.

### Lifecycle and principal use case

- Lifecycle: `prototype`.
- Runtime evidence: `in-memory-prototype`.
- Principal use case: An Enterprise owner starts and completes a DNS ownership challenge for one hostname.

### Source of truth

- `DomainVerification`
- `VerifiedDomain`

### Language and invariants

Ubiquitous language:

- Enterprise Domain Name
- DNS TXT Challenge
- Domain Verification
- Verified Domain
- authoritative DNS answer

Required invariants:

- Canonicalization trims, removes one trailing dot, and lowercases ASCII DNS names while preserving root and `www`
  distinction.
- Only an Enterprise owner can operate on an available Enterprise.
- Missing, mismatched, or unavailable DNS answers preserve retryable `pending`; only a match creates verified state.

### Collaboration

- Consumes from `enterprise-account` through `EnterpriseAccountDirectoryApiV1` (synchronous, prototype).
- Consumes from `administrative-access-control` through `AdministrativeAccessApiV1` (synchronous, prototype).

Navigation hierarchy is not a runtime dependency. Cross-Context calls use the consumer-owned Port and ACL named in
`context.json`; this Context publishes no peer contract in the approved slice.

### Explicit exclusions

- Approved-domain public preview
- Organization-level domain verification
- email policy and member-email projection
- IP allow lists and continuous DNS monitoring
- Pages custom-domain security

The `_a-i-domain-verification.<domain>` challenge record is local prototype behavior, not GitHub record naming.

### Official evidence

- Evidence status: Confirmed for the approved first slice.
- Evidence IDs: `A6`, `A11`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics; implementation and verification remain independently evidenced.
<!-- END:context-governance -->
