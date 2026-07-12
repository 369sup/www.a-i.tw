# Issues

- Domain: Issues
- Technical path: `work-management` (pending filesystem rename to `issues`)
- Owner: www.a-i.tw Product Team

Owns GitHub-aligned Issue, Label and Assignment lifecycle. `/pulls*` belongs to GitHub Pull requests
and is excluded from the current non-code product scope. Application Ports are `IssueStore`,
`LabelStore`, `IssueNumberSequence` and `RepositoryParticipationGateway`; concrete adapters are
wired only in server composition.
