# Issues

- Domain: Issues
- Technical path: `issues` (pending filesystem rename to `issues`)
- Owner: www.a-i.tw Product Team

Owns GitHub-aligned Issue, Label and Assignment lifecycle. `/pulls*` belongs to GitHub Pull requests
and is excluded from the current non-code product scope. Application Ports are `IssueStore`,
`LabelStore`, `IssueNumberSequence` and `RepositoryParticipationGateway`; concrete adapters are
wired only in server composition.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Track repository-scoped work with Issue identity, lifecycle, labels, assignment and collaboration relationships.

This directory is the declared local ownership boundary for `Issue`, `Label`, `IssueComment`, `Milestone`, `IssueDependency`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Create, classify, assign and close an Issue after authoritative Repository participation approval.

### Source of truth

- `Issue`
- `Label`
- `IssueComment`
- `Milestone`
- `IssueDependency`

### Language and invariants

Ubiquitous language:

- Issue
- Issue Number
- Issue Type
- Issue Field
- Label
- Milestone
- Sub-issue
- Dependency

Required invariants:

- Issue Number is unique only within a Repository scope.
- Project references never transfer Issue truth; Organization Issue Fields remain distinct from Project custom fields.

### Collaboration

- Consumes from `repository-governance` through `RepositoryParticipationApiV1` (synchronous, current).
- Consumes from `community-safety` through `CommunitySafetyApiV1` (synchronous, current).

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Repository lifecycle
- Project Item or Project field
- Notification
- Pull Request

Exclude Pull Requests, code review, commit references that require Code semantics and code-scanning issues.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `I1`, `I2`, `I3`, `I4`, `I5`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
