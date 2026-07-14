# GitHub non-Code semantic reconstruction evidence

Date: 2026-07-14

Status: Semantic ownership baseline accepted; runtime expansion not approved

## Scope

The reconstruction uses GitHub's official product documentation as the only external semantic source. It excludes
source code、Git、version control、Pull Request／code review、CI/CD、Actions、Codespaces、Copilot、SSH、Packages、
Release and code-centric security scanning.

Official navigation、pages、URLs、API／GraphQL types、payloads、tables and the existing repository structure are not
treated as Domain boundaries.

## Gate evidence

| Gate  | Evidence                                                                                                                                                                            |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G0    | Root instructions、product owner docs、existing runtime catalog and semantic workflow inspected                                                                                     |
| G1    | User supplied the exclusion boundary and required official-only concept reconstruction                                                                                              |
| G2    | `github-non-code-semantic-model.md` records definition、lifecycle/invariant、classification、unique owner、allowed relation、forbidden attribution、evidence and status per concept |
| G3    | Logical owners are separated by business lifecycle; no fixed Context count and no runtime directory implied                                                                         |
| G4-G7 | Not entered for unscaffolded owners; each requires a separately approved first use case and source of truth                                                                         |

## Ownership corrections

- Repository owns only identity、Account owner、profile、visibility、state、feature configuration and lifecycle.
- Repository Access Grant／Role／Permission／decision belongs to Authorization & Policy, while the current Repository
  ACL remains explicitly documented compatibility debt.
- Organization Custom Property definition and Repository value are Repository Governance facts, not Repository core.
- Subscription and Notification have distinct preference versus delivery／Inbox lifecycles.
- App Registration、App Installation／user Authorization and Webhook Delivery have distinct lifecycles and owners.
- Complete Ruleset semantics are excluded because official Rulesets primarily govern branches、tags and pushes; any
  non-Code constraint requires independent evidence before modeling.

## Unresolved stop conditions

- Exact Repository disabled／delete／restore transition matrix.
- Non-Code Ruleset decomposition beyond independently evidenced Repository rename constraints.
- Context-local Comment／Reaction lifecycle differences and moderation ownership.
- Durable global Saved Search semantics, feed ranking and Audit retention guarantees.

These items remain `Pending verification` or `Partial` and cannot create runtime artifacts.

## Verification

| Check                     | Result                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| Concept inventory shape   | 97 concept rows; every row has all 8 required columns                                               |
| Evidence ledger integrity | 32 official-source IDs; every used ID defined and every defined ID used                             |
| Focused Prettier          | passed for all changed canonical/evidence Markdown files                                            |
| `pnpm docs:check`         | ownership、30 architecture concerns、links and workspace configuration passed                       |
| `pnpm arch:check`         | topology/manifests/template/exports/workspaces/cross-context/source/imports passed; 37 tests passed |
| Runtime tests/build       | not run because no runtime source or contract changed                                               |
