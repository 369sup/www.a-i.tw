# Ports and Adapters catalog

狀態：Current / in-memory baseline

| Context / subdomain   | Application-owned outbound Port                                                             | Current adapter                                          | Composition owner           |
| --------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------- |
| Identity & Access     | `PrincipalStore`, `CredentialVerifier`, token-keyed `SessionStore`                          | mock password verifier + in-memory stores                | product workspace root      |
| Account               | `AccountStore`, `ProfileStore`, `MembershipStore`, `MembershipInvitationStore`, `TeamStore` | in-memory Account, Profile, Membership and Team adapters | product workspace root      |
| Repository            | `RepositoryStore`, `AccessGrantStore`, `AccountDirectoryGateway`                            | in-memory stores + Account Membership/Team ACL           | product workspace root      |
| Issues       | `IssueStore`, `LabelStore`, `IssueNumberSequence`, `RepositoryParticipationGateway`         | in-memory work stores + Repository ACL                   | product workspace root      |
| Repository Experience | `AccountContextPort`, `RepositoryContextPort`                                               | Account/Repository facade adapters                       | repository-context root     |
| Master Template       | resource, namespace, access, clock and id Ports                                             | demo/in-memory adapters                                  | master-template root        |
| Sub Template          | `SubTemplateCatalog`                                                                        | `InMemorySubTemplateCatalog`                             | Master Template composition |

Inbound adapters are Next.js pages, parallel slots, forms and Server Actions.
Port names describe business-needed capability, never a database, framework or
SDK. Production adapters must document timeout, retry, idempotency, data
classification and failure mapping.
