# Distilled Knowledge

## Purpose

Store verified, reusable, non-obvious operating knowledge. Canonical repository sources remain authoritative. Remove a record when it becomes obsolete or cheap to reconstruct.

## Organization-Wide Rules

- Confirm the real problem, owner, boundary, constraints, and smallest verifiable outcome before implementation.
- Prefer the simplest cohesive solution with the fewest dependencies; do not broaden an approved slice into a roadmap.
- Official GitHub product behavior is semantic evidence. UI navigation, routes, APIs, GraphQL types, storage layout, existing packages, and current code placement do not independently establish Domain ownership.
- A topology, scaffold, green check, or physical directory proves placement only, not runtime completeness.
- When canonical sources conflict with memory or historical rollout text, retain the newest confirmed runtime, manifest, test, ADR, or canonical-document fact.

## Project Architecture

- The complete tactical topology code block in `apps/web/src/modules/AGENTS.md` and `apps/web/src/modules/README.md` is a fixed Codex classification coordinate. Keep the paired blocks synchronized and do not abbreviate or replace them when clarifying lifecycle rules. [ad-hoc note]
- Planned Contexts have four root files, `firstUseCase: null`, `runtimeEvidence.status: none`, no runtime relationships, no runtime directories, and an empty `public-api.ts`. Promotion requires an approved first use case, source of truth, refreshed official evidence, and explicit Context Map/runtime gates. [ad-hoc note]
- Runtime development is approved-use-case vertical-slice driven. Do not impose Contract-first, Value-Object-first, Adapter-first, or fixed step-count implementation sequences. [ad-hoc note]
- Canonical anti-rules are AR-001 through AR-018 in `docs/architecture/ddd-hexagonal-standard.md`; repository rules prohibit ownership-free product primitives, God Contexts, peer internal imports, cross-Context transactions, Domain framework/I/O dependencies, Application concrete-adapter dependencies, and projections as upstream truth. [ad-hoc note]

## Development Environment

- Use Git Bash for Git, shell, and project commands on Windows. Do not mix PowerShell, CMD, and Bash syntax in one workflow.
- For cwd-sensitive hooks use `bash -c`; `bash -lc` may move to the home directory and break repository detection.
- Set `PYTHONUTF8=1` for Serena CLI validation to avoid cp950 encoding failures.
- For read-only Git fingerprinting use `git -c core.safecrlf=false ...` when CRLF warnings would corrupt structured hook output.
- Prefer lower-level checks when Windows wrappers fail for environmental reasons: focused tests, `pnpm docs:check`, `pnpm arch:check`, `pnpm build`, and `git diff --check`. Do not weaken rules or report unexecuted checks as passed.
- Avoid Serena commands that create transient `.serena/logs/` inside the closed repository topology.

## Naming Conventions

- `apps/web/src/modules/AGENTS.md` is normative for tactical placement and filenames; nearby legacy names and green checks do not override its natural-language rules. [ad-hoc note]
- Before creating an artifact, classify owning Context, approved capability or use case, layer, tactical category, artifact role, consumers, and contract; derive the name from the matching placeholder. [ad-hoc note]
- Use Context-owned immutable Value Objects; do not create global product `ID`, `Name`, `Status`, `Role`, `Scope`, or `Reference` primitives under `shared`, `common`, or `core`. [ad-hoc note]
- Transport-neutral view data belongs in `application/dto`.
- `adapters/inbound/ui` contains kebab-case `.tsx` UI adapters.
- `adapters/inbound/server-actions` contains kebab-case `.ts` adapters named for one explicit action.
- Do not create catch-all `helpers`, `utils`, `actions`, or grouped form-adapter files.

## Bounded-Context Ownership

- Repository core owns identity, owner reference, profile, visibility, state, feature configuration, and lifecycle. Access grants, roles, permissions, and authorization decisions semantically belong to Authorization and Policy.
- `RepositoryRoleDefinition` and `RepositoryAccessGrant` are currently physically co-located in `repository-governance`; this is runtime placement debt and does not transfer semantic ownership. [ad-hoc note]
- `profile-presence` is the sole owner of User and Organization presentation state. Profile data cannot authenticate a Principal or determine Account eligibility. [ad-hoc note]
- `organization-account` owns Organization identity and provisioning lifecycle only. Membership, Invitation, Team, and founding-owner writes belong to `organization-participation`. [ad-hoc note]
- `enterprise-account` owns Enterprise identity, lifecycle, and Organization affiliation; it does not own Repository policy, administrative roles, Repository actions, or Organization membership. [ad-hoc note]
- Organization onboarding that creates founding-owner Membership requires a separately approved cross-Context provisioning workflow with retry and failure semantics. [ad-hoc note]
- Discussions owns Discussion, category, comments, and accepted-answer references. An accepted answer must be an active comment in the same Discussion, and the category must allow answers.
- Repository participation for Discussions is consumed through its published participation contract and consumer ACL; Repository and Authorization do not own Discussion state.
- Preserve `triage` as distinct from `read` and `write`; missing owner facts fail closed and must not create synthetic principals.

## Workflow Constraints

- For supported code work, initialize Serena once, confirm active project configuration, inspect symbols and references before editing, and use changed-file diagnostics after semantic code changes.
- Markdown, JSON, YAML, configuration, Git, and literal text changes use narrow native tools.
- Exact context-token percentage is not available through official hooks. Do not infer it from transcript files or claim an exact 90% trigger.
- Checkpointing is event-driven through official `SessionStart`, `PreCompact`, and `Stop` hooks.
- When a matching checkpoint request is required, run `pnpm checkpoint:context -- --signal important-phase-completed` before piping the checkpoint to `pnpm checkpoint:context -- --checkpoint`.
- A Serena checkpoint succeeds only when both `serena_saved: true` and `read_back_verified: true` are observed.
- If the checkpoint reports `No checkpoint request matches the current work hash`, issue the signal and retry; do not bypass the gate.
- When the user requests distillation before continuing or closing, checkpoint and read back before further product work or completion.
- Verify hook triggers, checkpoint read-back, archive completion, tests, and diffs from actual output rather than expected behavior.
- Green checks prove only implemented rules. If a natural-language constraint is unenforced, add the narrowest regression guard or record explicit legacy debt. [ad-hoc note]

## Maintenance

Keep these categories separate. Merge duplicates, discard stale rollout counts and historical paths, and defer to current canonical repository evidence whenever validity changes.

## Last Verified

2026-07-16 using `C:\Users\sup\.codex\memories\MEMORY.md` as source context and the active repository as the conflict-resolution authority.
