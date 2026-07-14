# Repository core semantics evidence

Date: 2026-07-14

Status: Verified Current core slice; access ownership migration pending

## Approved correction

`Workspace` is not GitHub product Ubiquitous Language or presentation language. Repository is a product resource container owned by a
Personal Account or Organization. Its core owner boundary contains identity, Name With Owner, profile, visibility,
state, feature configuration and lifecycle.

Being shown on a Repository page or scoped to a Repository does not make a model part of the Repository Aggregate.
Repository Access Grant／Role／Permission, Project association, Ruleset, Custom Property definition, Webhook, Audit
Entry, Watch Subscription, Notification and Star remain externally owned.

## Runtime change

- Added Context-owned `RepositoryId`, `RepositoryName`, `RepositoryNameWithOwner`, `RepositoryOwnerReference`,
  `RepositoryDescription`, `RepositoryHomepageUrl`, `RepositoryVisibility` and `RepositoryState` values.
- Connected the optional `RepositoryHomepageUrl` through Repository construction, the Create Repository Application
  input, in-memory reconstruction, `RepositoryRefV1`, the authenticated Server Action and the Repository view. Empty
  input remains absent; non-HTTP(S) input fails in the Domain constructor.
- Corrected the inbound visibility mapper so the UI's `internal` value remains `internal` instead of being reduced to
  `private`; authorization and Enterprise constraints remain in the owning Application boundaries.
- Repository construction now distinguishes Personal Account and Organization ownership and derives Name With Owner.
- Persistence seeds reconstruct through the Repository Domain factory.
- `internal` visibility and `disabled` state are represented and fail closed through existing compatibility surfaces.
- The later Authorization & Policy slice moved grant persistence, Repository Role and decision policy out of
  Repository without changing Repository core ownership; see
  [`2026-07-14-repository-authorization.md`](2026-07-14-repository-authorization.md).

## Completed follow-up migration

Authorization & Policy passed G1-G7 for predefined Repository Role, eligible Principal/Team Access Grant and non-Code
decision. Repository now consumes the versioned contract through its own Port/ACL; custom roles and broader policy
administration remain outside that slice.

## Verification

| Check                                             | Result                                              |
| ------------------------------------------------- | --------------------------------------------------- |
| Repository focused Domain/Application tests       | 3 files, 10 tests passed                            |
| Complete Repository Context tests                 | 4 files, 11 tests passed                            |
| Web TypeScript typecheck                          | passed                                              |
| Web lint/check                                    | passed with one unrelated existing Projects warning |
| Serena diagnostics on changed runtime surfaces    | no diagnostics                                      |
| Documentation checks                              | passed                                              |
| Architecture checks                               | 37 tests passed; no dependency violations           |
| Next.js 16.2.10 production build                  | passed                                              |
| Semgrep                                           | 278 targets; 0 findings                             |
| Repository management Playwright acceptance flows | 3 of 3 passed in Chromium                           |

Root `pnpm check` reached `format:check` and remains blocked only by the pre-existing
`.codex/agents/README.md` and `.codex/prompts/README.md` formatting differences. The scoped Repository files, web
check/typecheck and all checks above pass; unrelated Codex files were preserved.
