# Context migration roadmap

狀態：Current / baseline established

1. **Completed**: app-local topology, owners, Context Map and architecture gates.
2. **Completed**: in-memory Principal, Account and non-code Repository slice.
3. **Engineering-only**: master/sub template validation exists but is excluded from product sequencing.
4. **Completed**: organization Membership invitation, acceptance, removal and `MembershipFactV1` application slice.
5. **Completed**: Team aggregate, membership management, `TeamMembershipFactV1` and Team-based Repository grants.
6. **Completed in-memory slice**: Issue → Label → Assignment in Issues with Repository participation ACL.
7. **Completed in-memory baseline**: Password mock Login, browser Session, Identity Resolution, Account Profile, Actor/Scope distinction and Personal Dashboard gate.
8. **Completed baseline**: minimal Request Envelope plus distributed Repository Capability Context resolver and owner decision.
9. **Next identity gate**: production provider, durable session revocation, 2FA/passkey/device/IdP security verification.
10. **Research before implementation**: Projects, Discussions, Social Graph, Notifications, Search,
    Apps, Billing, Sponsors, Audit and Support must each pass G1-G3; no capability family automatically
    becomes a Context and no universal Context Service is allowed.
11. **Extraction gate**: only independent deployment, scaling, compliance,
    ownership or release-cadence evidence permits service/workspace extraction.

Each step requires entry evidence, rollback, compatibility impact and exit verification.

## ADR 0008 internal-topology migration

狀態：Completed 2026-07-12

1. **Completed**: canonical documents, generators, validators, Dependency Cruiser, Semgrep, skills and commands.
2. **Completed**: all eleven Contexts migrated by declared subdomain and Hexagonal layer.
3. **Completed**: Context entrypoints, Published Language imports, composition roots and focused tests updated.
4. **Completed**: `legacyContexts` is empty and migration mode is `target`.
