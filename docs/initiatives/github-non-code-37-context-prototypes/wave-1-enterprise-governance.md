# Wave 1: Enterprise governance prototypes

狀態：Approved — 2026-07-16 / G4-G7 authorized

This decision matrix passed the G1-G3 gate for promoting three planned descriptors. Approval permits only the slices
below; all listed exclusions remain non-runtime. Promotion and implementation proceed one Context at a time so each
slice can independently pass G4-G7.

## Official evidence refresh

| ID    | GitHub official source                                                                                                                                                                                                                                                                                                               | Evidence used                                                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `A9`  | [Configuring SAML single sign-on for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/using-saml-for-enterprise-iam/configuring-saml-single-sign-on-for-your-enterprise)                                                                                                                       | Enterprise-owner configuration, personal-account SAML scope and required SP-initiated test |
| `A10` | [About teams in an enterprise](https://docs.github.com/en/enterprise-cloud@latest/enterprise-onboarding/setting-up-organizations-and-teams/about-teams-in-an-enterprise) and [Creating enterprise teams](https://docs.github.com/en/enterprise-cloud@latest/enterprise-onboarding/setting-up-organizations-and-teams/creating-teams) | Enterprise Team distinction, membership, Organization access and documented limits         |
| `A11` | [Verifying or approving a domain for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/configuring-settings/configuring-user-applications-for-your-enterprise/verifying-or-approving-a-domain-for-your-enterprise)                                                                                           | Enterprise-owner DNS verification, authoritative TXT lookup and pending propagation        |

## Common boundary decisions

- Every command requires an active Principal and `AdministrativeAccessApiV1.requireEnterpriseOwner()`.
- Every target Enterprise is resolved through `EnterpriseAccountDirectoryApiV1`.
- The new Contexts expose app-facing facades/view models only. They have no peer consumers, so their own
  `contracts/v1` leaves remain empty.
- Concrete and cross-Context wiring belongs only in `apps/web/src/composition/product-composition.ts`.
- `/settings/enterprises` remains the selector/overview and links to three independent routes.

## Enterprise Identity Management

### Approved use case

An Enterprise owner configures a personal-account Enterprise SAML connection. The submitted HTTPS sign-on URL,
optional issuer and X.509 public certificate must pass an SP-initiated configuration test before one
`IdentityProviderConnection` is saved as `enforced`.

| Item               | Decision                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source of truth    | `IdentityProviderConnection`                                                                                                                              |
| Aggregate / values | `IdentityProviderConnection`; `SamlSignOnUrl`, `SamlIssuer`, `SamlPublicCertificate`                                                                      |
| Inbound use cases  | `ConfigureEnterpriseSamlConnection`, `GetEnterpriseSamlConnection`                                                                                        |
| Outbound Ports     | `IdentityProviderConnectionRepository`, `EnterpriseIdentityEnterpriseDirectory`, `EnterpriseIdentityAdministration`, `SamlConfigurationTester`            |
| Route              | `/settings/enterprises/[enterpriseId]/identity`                                                                                                           |
| Inbound adapters   | `configure-enterprise-saml-connection.ts`, `enterprise-saml-connection-ui.tsx`                                                                            |
| Success            | A successful test atomically saves one connection; reload shows a masked `Enforced` view                                                                  |
| Failure            | Missing/unavailable Enterprise, non-owner, invalid URL/certificate, rejected/unavailable tester, duplicate connection; every failure leaves no new record |

Relationships:

| Upstream                        | Contract                          | Consumer Port                           | ACL                                            | Failure mode                                |
| ------------------------------- | --------------------------------- | --------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| `enterprise-account`            | `EnterpriseAccountDirectoryApiV1` | `EnterpriseIdentityEnterpriseDirectory` | `EnterpriseIdentityEnterpriseDirectoryAdapter` | `reject-unavailable-enterprise`             |
| `administrative-access-control` | `AdministrativeAccessApiV1`       | `EnterpriseIdentityAdministration`      | `EnterpriseIdentityAdministrationAdapter`      | `reject-non-owner-or-unavailable-authority` |

Excluded: OIDC, SCIM, Enterprise Managed Users, External Identity linking, provisioning, disabling/replacing a
connection, recovery and actual SAML sign-in. `authentication-security` gains no relationship in this slice.

Tests: HTTPS/issuer/certificate values, duplicate prevention, owner success/failure, rejected/unavailable test with no
save, repository failure, ACL mappings, in-memory reconstruction and Web reload/error/authorization flows.

## Enterprise Participation

### Approved use case

An Enterprise owner creates an `EnterpriseTeam`, assigns one Organization already affiliated with the Enterprise and
adds one active Personal Account that already has active Membership in that Organization. The Context creates
`EnterpriseMember` and `OrganizationAccessAssignment` state without writing Organization Membership.

| Item               | Decision                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Source of truth    | `EnterpriseTeam`, `EnterpriseMember`, `OrganizationAccessAssignment`                                                                          |
| Aggregate / values | `EnterpriseTeam`; `EnterpriseMember`; `OrganizationAccessAssignment`; `EnterpriseTeamName`, `EnterpriseMemberClassification`                  |
| Inbound use cases  | `CreateEnterpriseTeam`, `AddEnterpriseTeamMember`, `ListEnterpriseTeams`                                                                      |
| Outbound Ports     | `EnterpriseTeamRepository`, `EnterpriseMemberRepository`, four consumer directory/authority Ports                                             |
| Route              | `/settings/enterprises/[enterpriseId]/people/teams`                                                                                           |
| Inbound adapters   | `create-enterprise-team.ts`, `add-enterprise-team-member.ts`, `enterprise-team-administration-ui.tsx`                                         |
| Success            | Reload shows one Team, member and Organization assignment; upstream Organization Membership is unchanged                                      |
| Failure            | Non-owner, unavailable providers, unaffiliated Organization, inactive Account, inactive/missing Membership or documented count limit exceeded |

Relationships:

| Upstream                        | Contract                          | Consumer Port                                            | ACL                                                      | Failure mode                                                 |
| ------------------------------- | --------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| `enterprise-account`            | `EnterpriseAccountDirectoryApiV1` | `EnterpriseParticipationEnterpriseDirectory`             | `EnterpriseParticipationEnterpriseDirectoryAdapter`      | `reject-unavailable-enterprise-or-unaffiliated-organization` |
| `administrative-access-control` | `AdministrativeAccessApiV1`       | `EnterpriseParticipationAdministration`                  | `EnterpriseParticipationAdministrationAdapter`           | `reject-non-owner-or-unavailable-authority`                  |
| `user-account`                  | `PersonalAccountDirectoryApiV1`   | `EnterpriseParticipationPersonalAccountDirectory`        | `EnterpriseParticipationPersonalAccountDirectoryAdapter` | `reject-unavailable-or-inactive-personal-account`            |
| `organization-participation`    | `OrganizationParticipationApiV1`  | `EnterpriseParticipationOrganizationMembershipDirectory` | `EnterpriseParticipationOrganizationMembershipAdapter`   | `reject-unavailable-or-inactive-organization-membership`     |

Domain invariants include 2,500 Teams per Enterprise, 5,000 members per Team and 1,000 Organizations per Team.
Duplicate member addition is idempotent local set semantics.

Excluded: inviting an unaffiliated user, creating Organization Membership, IdP group sync, nested/secret teams,
maintainer/CODEOWNER/Project features, role/license or Repository grants and undocumented slug canonicalization.

Tests: documented limits, idempotent membership, all upstream failure modes, unaffiliated Organization, inactive
Account/Membership, four ACL mappings, in-memory reconstruction, Web create/add/reload and denied flows.

## Network & Domain Governance

Implementation status: G4-G7 completed 2026-07-16 for this Context. Focused Domain/Application/adapter tests,
typecheck, build, docs, manifest/boundary/source/import checks, Semgrep, and Chromium start/verify/reload/denied
acceptance passed. Aggregate `arch:topology` remains blocked by pre-existing missing governance-root README files
outside this slice.

### Approved use case

An Enterprise owner starts a DNS ownership challenge for one hostname and completes it only when an authoritative DNS
TXT verifier matches the expected value. Missing, mismatched or unavailable DNS remains retryable `pending`; a match
transitions the `DomainVerification` to `verified`.

| Item               | Decision                                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source of truth    | `DomainVerification`, `VerifiedDomain`                                                                                                                         |
| Aggregate / values | `DomainVerification`; `VerifiedDomain`; `EnterpriseDomainName`, `DnsTxtChallenge`, `DomainVerificationStatus`                                                  |
| Inbound use cases  | `StartEnterpriseDomainVerification`, `CompleteEnterpriseDomainVerification`, `ListEnterpriseDomains`                                                           |
| Outbound Ports     | `DomainVerificationRepository`, `NetworkDomainEnterpriseDirectory`, `NetworkDomainAdministration`, `AuthoritativeDnsTxtVerifier`, `VerificationTokenGenerator` |
| Route              | `/settings/enterprises/[enterpriseId]/domains`                                                                                                                 |
| Inbound adapters   | `start-domain-verification.ts`, `complete-domain-verification.ts`, `enterprise-domain-verification-page.tsx` and its focused form/list/card components         |
| Success            | Reload shows `Verified` and `verifiedAt` after a matching authoritative lookup                                                                                 |
| Failure            | Non-owner, unavailable/missing Enterprise, invalid/duplicate hostname, unavailable DNS or missing/mismatched TXT; DNS failures preserve `pending`              |

Relationships:

| Upstream                        | Contract                          | Consumer Port                      | ACL                                       | Failure mode                                |
| ------------------------------- | --------------------------------- | ---------------------------------- | ----------------------------------------- | ------------------------------------------- |
| `enterprise-account`            | `EnterpriseAccountDirectoryApiV1` | `NetworkDomainEnterpriseDirectory` | `NetworkDomainEnterpriseDirectoryAdapter` | `reject-unavailable-enterprise`             |
| `administrative-access-control` | `AdministrativeAccessApiV1`       | `NetworkDomainAdministration`      | `NetworkDomainAdministrationAdapter`      | `reject-non-owner-or-unavailable-authority` |

Hostname canonicalization trims, removes one trailing dot and lowercases ASCII DNS names. Root and `www` hostnames are
distinct. The prototype challenge record is `_a-i-domain-verification.<domain>` and is explicitly local product
behavior, not GitHub's record naming.

Excluded: public-preview approved domains, Organization-level verification, email policy, member-email projection, IP
allow lists, continuous DNS monitoring and Pages custom-domain security.

Tests: canonicalization, duplicate active challenge, pending-to-verified transition, retryable DNS failures,
owner/Enterprise failures, deterministic DNS/token adapters, ACL mappings, in-memory reconstruction and Web
start/verify/reload/denied flows.

## Approval effect

Approving this document authorizes G4-G7 for exactly these three slices. It also authorizes adding `A9`-`A11` to the
canonical evidence ledger and updating the affected owner documents, manifests and Context Map. It does not approve
any excluded capability.
