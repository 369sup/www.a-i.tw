# Application ports

Define inbound and outbound interfaces beside the use case that needs them.
Outbound ports are implemented by Infrastructure; they are never imported from
Infrastructure.

Current outbound Ports: `AccountStore`, `MembershipStore`, `MembershipInvitationStore`, `TeamStore`.
Current inbound facades: `AccountService`, `MembershipService`, `TeamService`.
