# Ownership matrix

狀態：Current baseline

| Concern                             | Owner             | Decision boundary                               |
| ----------------------------------- | ----------------- | ----------------------------------------------- |
| authentication and credential facts | Identity & Access | Principal validity and assurance                |
| Account ownership and relationships | Account           | namespace, membership, Team                     |
| Repository container governance     | Repository        | visibility, grant, lifecycle, resource decision |
| repository-scoped work tracking     | Issues   | Issue, Label, Assignment lifecycle              |
| delivery UI and view model          | Experience        | presentation only                               |
| deployment and observability        | Platform          | operations only                                 |

Runtime Context owner is recorded in each `context.json`. Product Team owns the
three product Contexts; Architecture Team owns Master Template and Sub Template.
Technical package and topology ownership is recorded in `packages/AGENTS.md`
and CODEOWNERS.
