# account

- Domain: Account Management
- Subdomain: account (core)
- Owner: www.a-i.tw Product Team

Current aggregates are Account, Membership Invitation, Membership and Team. Application use cases create Accounts,
manage Membership lifecycle and manage Team membership. Outbound Ports are `AccountStore`, `MembershipStore`,
`MembershipInvitationStore` and `TeamStore`; process-local adapters are wired only by the product workspace root.
Published language is limited to Account eligibility and Membership/Team relationship facts.
