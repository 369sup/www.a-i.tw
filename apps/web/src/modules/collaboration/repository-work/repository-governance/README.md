# repository

- Domain: Repository Governance
- Subdomain: repository (core)
- Owner: www.a-i.tw Product Team

The Repository Aggregate owns Repository identity, Personal Account or Organization ownership, profile, visibility,
state, feature configuration and lifecycle. Product UI uses `Repository`, `Repositories`, or `Repository management`;
`Workspace` is not product language and is prohibited in runtime and presentation naming.

The Current Create Repository slice owns an optional HTTP(S) homepage URL as Repository Profile data. Empty input means
the Repository has no homepage; transport code does not canonicalize or validate the URL.

Repository does not own Repository Access Grant, Repository Role, Repository Permission, Project association, Ruleset,
Custom Property definition, Webhook, Audit Entry, Notification, Watch Subscription or Star. Repository consumes the
approved Authorization & Policy API through its own Port and ACL; the grant store, role mapping and final decision no
longer live in this Context.

# Authorization & Policy: repository-governance

Strategic subdomain `repository-governance` (`core`); owner www.a-i.tw Product Team.

The Current in-memory slice owns the five predefined Repository Roles, Principal/Team Repository Access Grants and
point-in-time non-Code decisions. It consumes active Principal, Account Membership, Team and Repository resource facts
without taking ownership of those models.

Custom roles, organization base permissions, outside-collaborator lifecycle, enterprise role assignment, durable
persistence and policy administration remain outside this first slice.
