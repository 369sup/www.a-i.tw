# Cross-context ACL migration evidence

Date: 2026-07-12

## Outcome

All seven AD-009 Application-to-provider imports were removed.

- Account Application owns `AccountPrincipal` and imports no Identity & Access contract.
- Repository Application owns `RepositoryPrincipal` and `AccountDirectory`.
- `AccountDirectoryAdapter` is a Repository Infrastructure outbound integration consuming `AccountDirectoryApiV1`.
- Issues Application owns `IssuePrincipal` and `RepositoryParticipation`.
- `RepositoryParticipationAdapter` is an Issues Infrastructure outbound integration consuming
  `RepositoryParticipationApiV1`.
- App server composition creates both adapters and injects provider facades.
- `cross-context-dependency-exceptions.json` is empty.

## Verification

- Cross-context entrypoint and Context Map check passed with zero exceptions.
- Web TypeScript check passed.
- Web tests passed, including focused ACL adapter tests.
- Full docs, architecture, build and available static-analysis gates are recorded in the task handoff.
