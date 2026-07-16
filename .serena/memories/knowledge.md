# Distilled Knowledge

## Organization-Wide Rules

### K-20260716-semantic-evidence-precedence

- Status: active
- Tags: first-principles, official-evidence, ownership, scope
- Scope: repository-wide product and architecture decisions
- Claim: Official product behavior may establish semantics, but UI navigation, routes, APIs, GraphQL types, storage layout, existing packages, and physical code placement do not independently establish Domain ownership.
- Invariant: Confirm the problem, unique owner, lifecycle, constraints, source of truth, and smallest verifiable outcome before implementation; newer runtime, manifest, test, ADR, or canonical-document evidence supersedes historical memory.
- Symbols and relations: GitHub Docs informs `docs/product/github-non-code-semantic-model.md`; canonical owners constrain Context manifests and runtime.
- Why retained: Ownership drift is easy when presentation or co-location is mistaken for semantic authority.
- Evidence: `AGENTS.md`; `docs/product/github-non-code-semantic-model.md`; `docs/decisions/0014-complete-github-non-code-portfolio-taxonomy.md`.
- Applies when: Classifying or changing GitHub non-Code product semantics.
- Invalidated when: An accepted decision replaces the evidence hierarchy.
- Last verified: 2026-07-16 against current canonical governance documents.

## Project Architecture

### K-20260716-portfolio-and-promotion

- Status: active
- Tags: topology, portfolio, planned, runtime, promotion
- Scope: `apps/web/src/modules`
- Claim: The closed portfolio contains six Domain Groups, twelve Domain Areas and thirty-seven physical Context
  descriptors. The current snapshot contains twenty-one runtime Contexts and sixteen planned descriptors; topology is
  placement and governance, not runtime completeness.
- Invariant: Planned Contexts contain only `AGENTS.md`, `README.md`, `context.json`, and an empty `public-api.ts`; they have `firstUseCase: null`, `runtimeEvidence.status: none`, no runtime relationships, and no runtime directories.
- Symbols and relations: `group.json` declares Areas; `area.json` declares Contexts; non-planned manifests are mirrored in `docs/domains/context-map.json`.
- Why retained: Historical counts and scaffold completeness repeatedly caused incorrect implementation claims.
- Evidence: `apps/web/src/modules/AGENTS.md`; `apps/web/src/modules/README.md`; ADR 0015; current manifests and Context Map.
- Applies when: Planning, generating, promoting, reviewing, or counting Contexts.
- Invalidated when: A verified promotion changes the runtime/planned distribution, or an accepted taxonomy decision
  changes the fixed 37-Context identity.
- Last verified: 2026-07-17; manifest count 37/21/16, `pnpm arch:manifests` and `pnpm arch:cross-context` passed.

### K-20260716-cross-context-boundary

- Status: active
- Tags: hexagonal, ports, acl, contracts, dependencies
- Scope: all runtime Bounded Contexts
- Claim: Cross-Context calls use a consumer-owned outbound Port, a consumer ACL under `adapters/outbound/integrations`, and provider `contracts/vN/public.ts`; final wiring belongs to `apps/web/src/composition`.
- Invariant: Domain has no framework or I/O dependencies; Application never imports concrete adapters or peer internals; projections never become upstream transaction truth; `public-api.ts` is app-facing only.
- Symbols and relations: Consumer Port is implemented by consumer ACL; ACL consumes provider Published Language; app composition wires Context composition entries.
- Why retained: Dependency direction is distributed across manifests, contracts, adapters, and architecture checks and is costly to reconstruct during cross-Context work.
- Evidence: `apps/web/src/modules/AGENTS.md`; `docs/architecture/ddd-hexagonal-standard.md`; `docs/domains/context-map.json`.
- Applies when: Adding or changing a runtime relationship, contract, Port, adapter, or composition edge.
- Invalidated when: An accepted architecture decision replaces the Ports and Adapters boundary.
- Last verified: 2026-07-16; architecture relationship checks passed.

## Development Environment

### K-20260716-windows-serena-verification

- Status: active
- Tags: windows, git-bash, serena, checkpoint, verification
- Scope: local Windows development and Codex/Serena workflows
- Claim: Use Git Bash for Git, shell, and project commands; Serena CLI validation requires `PYTHONUTF8=1` on this host, and repository-sensitive hooks use `bash -c` rather than `bash -lc`.
- Invariant: Do not mix shell syntaxes, weaken checks, or report unexecuted validation as passed. A Serena checkpoint succeeds only when write and exact read-back both succeed.
- Symbols and relations: Host Serena executable is `C:\Users\sup\.local\bin\serena.exe`; checkpoint workflow is owned by `scripts/validation/codex-context-checkpoint`.
- Why retained: PATH separation, cp950 encoding, cwd changes, and CRLF warnings cause failures that resemble product defects.
- Evidence: `C:\Users\sup\.codex\config.toml`; `.codex/plugins/README.md`; checkpoint runbook and tests.
- Applies when: Running Serena, hooks, checkpoints, Git, or repository checks on the configured Windows host.
- Invalidated when: Host configuration or supported shell/checkpoint implementation changes.
- Last verified: 2026-07-16; Serena 1.5.3 executable and absolute host configuration verified.

## Naming Conventions

### K-20260716-module-artifact-classification

- Status: active
- Tags: naming, placement, modules, dto, ui, server-actions
- Scope: `apps/web/src/modules/**`
- Claim: `apps/web/src/modules/AGENTS.md` is normative for tactical placement and filenames; nearby legacy names and green checks do not override unenforced natural-language rules.
- Invariant: Before creating an artifact, classify owning Context, approved capability or use case, layer, tactical category, artifact role, consumers, and contract, then derive the filename from the matching placeholder.
- Symbols and relations: Transport-neutral view data belongs in `application/dto`; inbound UI adapters are kebab-case `.tsx`; server-action adapters are kebab-case `.ts` files for one explicit action.
- Why retained: Existing legacy names can pass incomplete checks and encourage new misplaced or catch-all artifacts.
- Evidence: `apps/web/src/modules/AGENTS.md`; architecture naming and topology checks.
- Applies when: Creating, moving, or renaming module artifacts.
- Invalidated when: The module boundary contract changes and matching checks are updated.
- Last verified: 2026-07-16 against the current module contract.

## Bounded-Context Ownership

### K-20260716-account-profile-participation-ownership

- Status: active
- Tags: account, profile, organization, participation, onboarding
- Scope: `platform-governance/accounts-profile` and `platform-governance/participation-teams`
- Claim: `profile-presence` solely owns User and Organization presentation state; Account Contexts own identity and lifecycle; `organization-participation` owns Membership, Invitation, Team, and founding-owner writes.
- Invariant: Profile data does not authenticate a Principal or determine Account eligibility. `organization-account` must not persist participation state. Founding-owner onboarding is a cross-Context process with retry and failure semantics owned by `organization-participation`.
- Symbols and relations: Account Contexts consume `ProfileDirectoryApiV1`; `OrganizationOnboardingProcess` consumes `OrganizationAccountApiV1`.
- Why retained: Account, Profile, and Membership were previously collapsed into one workflow and can regress during onboarding work.
- Evidence: Context manifests and governance files for `user-account`, `organization-account`, `profile-presence`, and `organization-participation`.
- Applies when: Changing Account creation, Profile initialization, Organization onboarding, Membership, Invitation, or Team behavior.
- Invalidated when: An accepted boundary decision and matching runtime migration changes these owners.
- Last verified: 2026-07-16 against current manifests and Context Map relationships.

### K-20260716-repository-authorization-ownership

- Status: active
- Tags: repository, authorization, access-grant, role, runtime-debt
- Scope: Repository core and Authorization and Policy semantics
- Claim: Repository core owns identity, Account owner reference, profile, visibility, state, feature configuration, and lifecycle; access grants, roles, permissions, and authorization decisions semantically belong to Authorization and Policy.
- Invariant: Physical co-location of `RepositoryRoleDefinition` and `RepositoryAccessGrant` in `repository-governance` is current runtime placement debt and must not expand Repository semantic ownership without a boundary decision.
- Symbols and relations: Repository publishes participation/resource facts; consumers use Published Language and ACLs; logical ownership remains recorded in the semantic inventory.
- Why retained: Physical co-location repeatedly causes semantic owner drift.
- Evidence: `docs/product/github-non-code-semantic-model.md`; `docs/domains/repository.md`; `repository-governance` governance files.
- Applies when: Changing Repository access, roles, grants, permissions, or authorization wording.
- Invalidated when: An accepted boundary change migrates runtime and updates the semantic inventory.
- Last verified: 2026-07-16 against current semantic owner registry and runtime placement.

### K-20260716-discussions-accepted-answer

- Status: active
- Tags: discussions, q-and-a, accepted-answer, triage
- Scope: `collaboration/community-knowledge/discussions`
- Claim: Discussions owns Discussion, category, comments, and accepted-answer references; an accepted answer must be an active comment in the same Discussion and the category must allow answers.
- Invariant: Repository participation is consumed through the provider contract and a Discussions-owned ACL. Repository and Authorization do not own Discussion state. `triage` remains distinct from `read` and `write`, and missing owner facts fail closed.
- Symbols and relations: Discussion command handlers consume Repository participation and Community Safety decisions through consumer-owned Ports.
- Why retained: The accepted-answer and triage rules span Domain invariants and cross-Context authorization facts.
- Evidence: Discussions manifest, governance files, focused tests, and dated Discussions implementation evidence.
- Applies when: Changing Q&A categories, comments, answer selection, or Repository-scoped participation.
- Invalidated when: Discussion Domain rules or provider contracts are intentionally replaced.
- Last verified: 2026-07-16 against current Discussions runtime and governance documentation.

## Workflow Constraints

### K-20260716-vertical-slice-and-checkpoint

- Status: active
- Tags: vertical-slice, g1-g7, checkpoint, hooks, validation
- Scope: implementation sequencing and cross-session continuity
- Claim: Runtime development is driven by one approved use case and one Context per implementation task, not by
  portfolio order or fixed Contract-first, Value-Object-first, Adapter-first, or step-count sequences. The short
  initiative entry and target owner files are the default read set; the 37-row matrix is loaded only for portfolio
  audit.
- Invariant: Refresh official evidence; approve owner, source of truth, first use case, invariants, Ports, contracts,
  and consumers; implement only the required vertical slice; validate changed files and focused tests per Context,
  then run portfolio-level checks once per wave. Exact token percentage is unavailable, so checkpointing is
  event-driven through official lifecycle hooks.
- Symbols and relations: Planned promotion uses G1-G4; implementation and verification complete G5-G7; `mem:current-work-state` is the only overwriteable checkpoint.
- Why retained: Historical roadmap order and unsupported context-percentage assumptions caused unnecessary scope expansion and unreliable handoffs.
- Evidence: `apps/web/src/modules/AGENTS.md`; `docs/engineering/semantic-development-workflow.md`;
  `docs/initiatives/github-non-code-37-context-prototypes/README.md`; Serena checkpoint runbook.
- Applies when: Selecting a next slice, promoting a planned Context, pausing, compacting, or handing off work.
- Invalidated when: Accepted workflow or hook capabilities change.
- Last verified: 2026-07-17; protocol reviewed against Wave 0/1 execution cost and current repository gates.
