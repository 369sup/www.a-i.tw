# Context migration roadmap

狀態：Current / baseline established

1. **Completed**: app-local topology, owners, Context Map and architecture gates.
2. **Completed**: in-memory Principal, Account and non-code Repository slice.
3. **Completed**: declared Sub Template internal subdomain and catalog flow.
4. **Completed**: organization Membership invitation, acceptance, removal and `MembershipFactV1` application slice.
5. **Next**: expose accessible Membership feedback in the workspace UX and add E2E evidence.
6. **Later**: Team → Team-based Repository Access → Issue → Label/Assignment → Discussion → Star/Collection → Activity/Notification → Discovery → Contribution Graph.
7. **Later**: approve production identity and persistence requirements before adapters.
8. **Extraction gate**: only independent deployment, scaling, compliance,
   ownership or release-cadence evidence permits service/workspace extraction.

Each step requires entry evidence, rollback, compatibility impact and exit verification.
