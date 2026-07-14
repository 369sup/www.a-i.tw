# GitHub non-Code portfolio and next-Context planning evidence

Date: 2026-07-14

Status: Portfolio taxonomy accepted; Knowledge Wiki, Community Safety and Social Curation first slices implemented and verified

## Scope and sources

The referenced product-model discussion was reconciled against the Current repository manifests, ADR 0013, the semantic
development workflow and GitHub official documentation. Context7 `/github/docs` was used first; focused official GitHub
Docs pages were then checked for account types、Education applications、Campus Program、Classroom、Certifications and
Developer Program.

## Findings

- The governance topology now records six Domain Groups、twelve Domain Areas and thirty-five candidate Contexts while
  preserving the fourteen pre-existing Context IDs and runtime behavior.
- Official product semantics support five optional Programs owners: Education Eligibility、Campus Program、Classroom
  Management、Certification and Developer Program.
- Splitting Organization and Enterprise participation is a plausible owner hypothesis because their membership/team
  lifecycles differ, but it still requires a boundary decision and compatibility plan.
- ADR 0014 accepts the six-Group／twelve-Area／thirty-five-candidate tree as portfolio navigation; candidate placement
  does not by itself approve runtime.
- Knowledge remains the next core target. Its first slice can model Repository-scoped Wiki/Page semantics while excluding
  Git-backed storage implementation.
- Classroom metadata has a non-Code subset; template Repository contents、submission source、autograding and Pull Request
  feedback remain excluded.

## Gate evidence

| Gate  | Result                                                                                                      |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| G0    | Git root/worktree、root/docs/module instructions、canonical owners、Current manifests and roadmap inspected |
| G1    | Programs semantic candidates and Knowledge first-use-case proposal recorded from official behavior          |
| G2    | Canonical product model, detailed inventory, roadmap, Proposed ADR and dated evidence updated               |
| G3    | Passed: Knowledge Wiki owner, path, Supporting classification, first use case and source of truth approved  |
| G4-G7 | Passed: Context scaffolded, implemented inside-out, composed and verified                                   |

## Community Safety continuation

Context7 `/github/docs` confirmed that Repository interaction limits are temporary public-Repository controls; the
official kinds are `existing_users`, `contributors_only` and `collaborators_only`, and the documented expiry choices
include one day, three days, one week, one month and six months. Repository owner/admin REST management and owner-level
override semantics were retained. G1-G3 approve only `collaborators_only + one_day`, with Community Safety owning the
rule and Repository/Authorization remaining authoritative for visibility, lifecycle and access decisions.

G4-G7 then scaffolded and implemented `community-safety`, published `CommunitySafetyApiV1`, composed Repository facts
upstream and Issues/Discussions consumers downstream, and added a Server Action management surface using existing
`@a-i/shadcn` Button, Card and Alert primitives. Documentation, architecture checks, production build and Semgrep passed.

## Social Curation continuation

Context7 `/github/docs` confirmed that Star is a Repository bookmark and interest/appreciation signal that does not
affect notifications or Activity Feed. Authenticated-user REST resources expose `starredAt`; a private Repository is
visible in stargazer and public-list views only to actors with Repository read access. G1-G3 therefore assigned
`RepositoryStar` to Social Curation, with Repository read decisions upstream and Follow, Topic Star, public Star Lists,
recommendation ranking and all Watch/Notification behavior deferred.

G4-G7 scaffolded and implemented `social-curation`, published `SocialCurationApiV1`, added its Repository read ACL and
in-memory store, composed it into the product runtime and exposed Star/Unstar through existing shadcn Card and Button
primitives. A focused Chromium acceptance flow proved that Star persists across reload, unstars successfully and does
not remove the separate Watch control.

## Validation

| Check             | Result                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Focused Prettier  | passed for the changed runtime, manifest and documentation scope                                                      |
| `pnpm docs:check` | passed ownership、30-concern catalog、links and workspace configuration                                               |
| `pnpm arch:check` | passed 17-Context registry、manifests、exports、cross-Context/import/source rules and 47 architecture tests           |
| Runtime checks    | Social Curation focused suite passed 3 files/6 tests; web suite passed 47 files/112 tests; TypeScript and lint passed |
| Production build  | Next.js 16.2.10 build passed and generated all application routes                                                     |
| Acceptance        | focused Chromium Star → reload → Unstar flow passed and retained the independent Watch control                        |
| Security          | Semgrep fallback scanned 391 files with zero findings                                                                 |
| `pnpm check`      | umbrella stopped only on pre-existing `.codex/agents/README.md` formatting; lower-level checks passed                 |
