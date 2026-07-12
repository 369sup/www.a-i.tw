# Context migration roadmap

狀態：Current / baseline established

1. **Completed**: app-local topology, owners, Context Map and architecture gates.
2. **Completed**: in-memory Principal, Account and non-code Repository slice.
3. **Completed**: declared Sub Template internal subdomain and catalog flow.
4. **Completed**: organization Membership invitation, acceptance, removal and `MembershipFactV1` application slice.
5. **Completed**: Team aggregate, membership management, `TeamMembershipFactV1` and Team-based Repository grants.
6. **Completed in-memory slice**: Issue → Label → Assignment in Work Management with Repository participation ACL.
7. **Later**: Discussion → Star/Collection → Activity/Notification → Discovery → Contribution Graph.
8. **Later**: approve production identity and persistence requirements before adapters.
9. **Extraction gate**: only independent deployment, scaling, compliance,
   ownership or release-cadence evidence permits service/workspace extraction.

Each step requires entry evidence, rollback, compatibility impact and exit verification.
