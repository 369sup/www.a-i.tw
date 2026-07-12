# Application ports

Define inbound and outbound interfaces beside the use case that needs them.
Outbound ports are implemented by Infrastructure; they are never imported from
Infrastructure.

Current outbound Ports: `RepositoryStore`, `AccessGrantStore`, `AccountDirectoryGateway`.
`AccountDirectoryGateway` is the consumer-owned ACL for Account eligibility, Membership and Team facts.
