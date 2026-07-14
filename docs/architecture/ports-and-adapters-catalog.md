# Ports and Adapters catalog

狀態：Current / in-memory baseline

| Context / subdomain    | Application-owned outbound Port                                                                    | Current adapter                                                 | Composition owner        |
| ---------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------ |
| Identity & Access      | `PrincipalStore`, `CredentialVerifier`, token-keyed `SessionStore`                                 | mock password verifier + in-memory stores                       | product composition root |
| Account                | `AccountStore`, `ProfileStore`, `MembershipStore`, `MembershipInvitationStore`, `TeamStore`        | in-memory Account, Profile, Membership and Team adapters        | product composition root |
| Authorization & Policy | `RepositoryAccessGrantStore`, `IdentityDirectory`, `AccountAuthorizationDirectory`                 | in-memory grant store + Identity/Account ACL adapters           | product composition root |
| Enterprise Governance  | `EnterpriseStore`, `OrganizationDirectory`                                                         | in-memory store + `OrganizationDirectoryAdapter`                | product composition root |
| Repository             | `RepositoryStore`, `AccountDirectory`, `EnterpriseRepositoryGovernance`, `RepositoryAuthorization` | in-memory store + Account/Enterprise/Authorization ACL adapters | product composition root |
| Issues                 | `IssueStore`, `LabelStore`, `IssueNumberSequence`, `RepositoryParticipation`                       | in-memory stores + `RepositoryParticipationAdapter`             | product composition root |
| Discussions            | `DiscussionStore`, `DiscussionCategoryStore`, `RepositoryDiscussionParticipation`                  | in-memory stores + `RepositoryDiscussionParticipationAdapter`   | product composition root |
| Projects               | `ProjectStore`, `AccountOwnerDirectory`, `IssueDirectory`                                          | in-memory store + consumer-side ACL adapters                    | product composition root |
| Repository Experience  | `AccountContextPort`, `RepositoryContextPort`                                                      | Account/Repository facade adapters                              | repository-context root  |
| App Management         | `AppRegistrationStore`, `PersonalAppOwnerDirectory`                                                | in-memory registration store + Account Published Language ACL   | product composition root |

Inbound adapters are Next.js pages, parallel slots, forms and Server Actions.
Port names describe business-needed capability, never a database, framework or
SDK. Production adapters must document timeout, retry, idempotency, data
classification and failure mapping.
