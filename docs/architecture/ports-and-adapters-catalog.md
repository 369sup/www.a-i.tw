# Ports and Adapters catalog

狀態：Current / in-memory baseline

| Context / subdomain   | Application-owned outbound Port                                                             | Current adapter                                          | Composition owner           |
| --------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------- |
| Identity & Access     | `PrincipalStore`, `CredentialVerifier`, token-keyed `SessionStore`                          | mock password verifier + in-memory stores                | product workspace root      |
| Account               | `AccountStore`, `ProfileStore`, `MembershipStore`, `MembershipInvitationStore`, `TeamStore` | in-memory Account, Profile, Membership and Team adapters | product workspace root      |
| Enterprise Governance | `EnterpriseStore`, `OrganizationDirectory`                                                  | in-memory store + `OrganizationDirectoryAdapter`         | product workspace root      |
| Repository            | `RepositoryStore`, `AccessGrantStore`, `AccountDirectory`, `EnterpriseRepositoryGovernance` | in-memory stores + Account/Enterprise ACL adapters       | product workspace root      |
| Issues                | `IssueStore`, `LabelStore`, `IssueNumberSequence`, `RepositoryParticipation`                | in-memory stores + `RepositoryParticipationAdapter`      | product workspace root      |
| Projects              | `ProjectStore`, `AccountOwnerDirectory`, `IssueDirectory`                                   | in-memory store + consumer-side ACL adapters             | product workspace root      |
| Repository Experience | `AccountContextPort`, `RepositoryContextPort`                                               | Account/Repository facade adapters                       | repository-context root     |
| Architecture fixture  | resource, namespace, access, clock and id Ports                                             | demo/in-memory adapters                                  | master-template root        |
| Fixture sub-template  | `SubTemplateCatalog`                                                                        | `InMemorySubTemplateCatalog`                             | Master Template composition |

Inbound adapters are Next.js pages, parallel slots, forms and Server Actions.
Port names describe business-needed capability, never a database, framework or
SDK. Production adapters must document timeout, retry, idempotency, data
classification and failure mapping.
