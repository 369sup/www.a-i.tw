# Context migration roadmap

狀態：Current / baseline established

1. **Completed**: app-local topology, owners, Context Map and architecture gates.
2. **Completed**: in-memory Principal, Account and non-code Repository slice.
3. **Completed**: declared Sub Template internal subdomain and catalog flow.
4. **Completed**: organization Membership invitation, acceptance, removal and `MembershipFactV1` application slice.
5. **Completed**: Team aggregate, membership management, `TeamMembershipFactV1` and Team-based Repository grants.
6. **Completed in-memory slice**: Issue → Label → Assignment in Work Management with Repository participation ACL.
7. **Completed in-memory baseline**: Password mock Login, browser Session, Identity Resolution, Account Profile, Actor/Scope distinction and Personal Dashboard gate.
8. **Completed baseline**: minimal Request Envelope plus distributed Repository Capability Context resolver and owner decision.
9. **Next identity gate**: production provider, durable session revocation, 2FA/passkey/device/IdP security verification.
10. **Later**: each Discussion, Star/Collection, Activity/Notification and Discovery capability owns its typed context resolver; no universal Context Service.
11. **Extraction gate**: only independent deployment, scaling, compliance,
    ownership or release-cadence evidence permits service/workspace extraction.

Each step requires entry evidence, rollback, compatibility impact and exit verification.
