# Issues application ports

Define inbound and outbound interfaces beside the use case that needs them.
Outbound ports are implemented by Infrastructure; they are never imported from
Infrastructure.

Current outbound Ports: `IssueStore`, `LabelStore`, `IssueNumberSequence`, `RepositoryParticipationGateway`.
The gateway is the consumer-owned ACL for Repository scope and participation decisions.
