# Ports and Adapters catalog

狀態：Current / in-memory baseline

| Context / subdomain | Application-owned outbound Port                                                     | Current adapter                                 | Composition owner           |
| ------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------- |
| Identity & Access   | `PrincipalStore`, `SessionStore`                                                    | in-memory Principal/session stores              | product workspace root      |
| Account             | `AccountStore`, `MembershipStore`, `MembershipInvitationStore`, `TeamStore`         | in-memory Account, Membership and Team adapters | product workspace root      |
| Repository          | `RepositoryStore`, `AccessGrantStore`, `AccountDirectoryGateway`                    | in-memory stores + Account Membership/Team ACL  | product workspace root      |
| Work Management     | `IssueStore`, `LabelStore`, `IssueNumberSequence`, `RepositoryParticipationGateway` | in-memory work stores + Repository ACL          | product workspace root      |
| Master Template     | resource, namespace, access, clock and id Ports                                     | demo/in-memory adapters                         | master-template root        |
| Sub Template        | `SubTemplateCatalog`                                                                | `InMemorySubTemplateCatalog`                    | Master Template composition |

Inbound adapters are Next.js pages, parallel slots, forms and Server Actions.
Port names describe business-needed capability, never a database, framework or
SDK. Production adapters must document timeout, retry, idempotency, data
classification and failure mapping.
