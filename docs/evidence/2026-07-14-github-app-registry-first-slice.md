# GitHub App Registry first-slice evidence

Date: 2026-07-14

Status: G1-G7 completed; Current in-memory first slice

## Problem

The accepted portfolio records App Registry、App Installation and Authorization、Webhook Delivery and Marketplace as
distinct semantic owners, but no local Integration Ecosystem runtime exists. A registration identity must be created
before any later installation or commercial lifecycle can refer to an App.

## Official product facts

Context7 `/github/docs` and the corresponding official GitHub Docs sources confirm:

- A GitHub App may be registered under a Personal Account, an owned Organization, or an Organization where the actor
  has permission to manage all Apps.
- Registration name is required, limited to 34 characters and unique across GitHub; Homepage URL is required and up to
  ten Callback URLs are optional.
- Registration defines the App; using the App requires a separate Installation. User Authorization is another separate
  consent relationship, and OAuth Apps do not use GitHub App Installation semantics.
- Installation permissions、Repository selection、webhook delivery and Marketplace distribution have independent
  state and are not part of the first registration transaction.

Sources:

- [Registering a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
- [About using GitHub Apps](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps)

## Approved first use case

> An authenticated Personal Account owner creates a private GitHub App registration with a locally non-conflicting
> name, required homepage URL and optional callback URL, then lists registrations owned by that account from
> `/settings/apps`.

## Boundary decisions

- Runtime path: `apps/web/src/modules/ecosystem/apps-marketplace/app-management`.
- Owner: `www.a-i.tw Product Team`.
- Domain / strategic Subdomain: `App Integrations` / `app-registration`.
- Classification: Supporting.
- Source of truth: `GitHubAppRegistration`.
- Upstream dependency: Account & Profile Published Language, consumed through an App Management-owned Port and ACL.
- Presentation: authenticated settings page plus Server Action; UX calls Application only and owns no Domain truth.
- Deferred: Account namespace collision contract, Organization/Enterprise ownership, permissions, installation,
  authorization, tokens, webhooks, public distribution, Marketplace and full registration maintenance.

## Gate result

| Gate | Result                                                                                                        |
| ---- | ------------------------------------------------------------------------------------------------------------- |
| G1   | Owner, language, aggregate candidate, invariants and exclusions approved                                      |
| G2   | Dependency direction, source of truth, UX ownership and deferred lifecycles approved                          |
| G3   | Context path, first use case, classification and generator inputs approved; G4 filesystem change allowed      |
| G4   | Generator created the canonical template-v2 Context and registered it in the Area and Context Map             |
| G5   | Domain Aggregate/Value Objects, Application API, Ports, in-memory store and focused tests implemented         |
| G6   | Account Published Language ACL, product composition, `/settings/apps` Server Action/page and navigation wired |
| G7   | Diagnostics, tests, docs, architecture, production build, security and focused Chromium flow passed           |

## Validation

| Check              | Result                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Serena diagnostics | No diagnostics in the inspected App Management Domain, Application and ACL files               |
| Focused runtime    | 3 files / 5 tests passed                                                                       |
| Web regression     | 53 files / 125 tests passed                                                                    |
| TypeScript / lint  | Web typecheck and focused ESLint passed                                                        |
| Architecture       | 18 Context manifests/templates; import graph; 49 architecture tests passed                     |
| Documentation      | Ownership, 30-concern catalog, links and workspace checks passed                               |
| Production build   | Next.js 16.2.10 build passed; `/settings/apps` emitted as a dynamic route                      |
| Security           | Semgrep scanned 422 files with zero findings                                                   |
| Acceptance         | Focused Chromium login → settings navigation → register → list → reload passed with one worker |
| React review       | Semantic form markup, labels and stable keys passed; global-name overclaim removed from the UX |

The first wrapper-driven E2E attempt unintentionally ran all seven specs with six workers because the wrapper forwarded
an extra `--`; the new App Management flow and five other flows passed, while the pre-existing parallel in-memory
Repository creation flow timed out waiting for its new Repository link. The direct focused single-worker App Management
flow passed and no broad E2E pass is claimed.
