# Issues v1 semantic brief

狀態：Historical / superseded by the `work-tracking` Context and the
[`../github-non-code-37-context-prototypes/`](../github-non-code-37-context-prototypes/) initiative

This file records the original slice decision. Its `issues` path and progress wording are not current routing.

## Problem and outcome

Repository participant 需要在不引入程式碼生命週期的前提下，提出可追蹤工作、以穩定分類
整理工作，並指派具有該 Repository 參與資格的負責人。成功結果是 actor 可建立 Issue、套用
Repository-scoped Label、設定或移除 Assignee，且所有 mutation 都由 Issues use case
透過 Repository access decision 授權。

## Owner and boundary

- Owner：`www.a-i.tw Product Team`。
- Candidate Domain：Issues。
- Candidate Bounded Context：`issues`。
- Classification：Core extension。
- Upstream：Repository；Open Host Service + Published Language。
- Downstream ACL owner：Issues。
- Runtime path：`apps/web/src/modules/collaboration/repository-work/issues`（Current in-memory）。

這不是 Repository internal folder。Issue 有獨立 lifecycle、numbering、分類與責任語言；
Repository 只提供 collaboration scope 與 access decision，不擁有 Issue state。

## Ubiquitous Language candidates

| Term         | Definition                                                                   | Owner  | Forbidden conflation                 |
| ------------ | ---------------------------------------------------------------------------- | ------ | ------------------------------------ |
| Issue        | Repository scope 內可追蹤、可關閉與重新開啟的工作項目                        | Issues | Git issue、support ticket table      |
| Issue Number | 在單一 Repository scope 內單調配置的人類可讀序號                             | Issues | Issue identity、array index          |
| Label        | Repository scope 內具唯一名稱與顯示 metadata 的工作分類                      | Issues | status、permission、free-form tag    |
| Assignment   | Issue 與負責 Principal 的可撤銷責任關係                                      | Issues | Account Membership、Repository grant |
| Assignee     | 目前持有 Assignment 且仍具 Repository participation eligibility 的 Principal | Issues | owner、authenticated user            |

## Aggregate candidates and invariants

### Issue aggregate

- Stable `IssueId`; `IssueNumber` is unique only within one Repository.
- Required non-empty title; optional body is content, not code.
- Lifecycle is `open | closed`; only open Issue accepts Assignment or Label mutation.
- Close is idempotency-sensitive and records actor/time; reopen is an explicit transition.
- An Issue belongs to exactly one Repository scope; v1 does not transfer it.
- Label and Assignment references cannot silently cross Repository scope.

### Label aggregate

- Stable `LabelId`; normalized name is unique per Repository.
- Color and description are presentation metadata and cannot encode authorization.
- Removing a Label must define unlink semantics; v1 rejects deletion while linked.

### Assignment relationship

- At most one active Assignment per Issue/Principal pair.
- Assignee eligibility is checked through a Issues-owned Repository gateway.
- Authentication alone never makes a Principal eligible for Assignment.

## First use cases

1. `CreateIssue` — authenticated actor with Repository `triage`-equivalent participation creates an open Issue.
2. `CreateLabel` / `ApplyLabel` / `RemoveLabel` — authorized actor manages Repository-scoped classification.
3. `AssignIssue` / `UnassignIssue` — authorized actor assigns an eligible Principal.
4. `CloseIssue` / `ReopenIssue` — authorized actor performs explicit lifecycle transitions.
5. `ListRepositoryIssues` — query returns purpose-specific read models, not Domain aggregates.

## Ports and adapters candidates

- Inbound Ports：named use-case interfaces listed above.
- Outbound Ports：`IssueStore`, `IssueNumberSequence`, `LabelStore`, `RepositoryParticipationGateway`, `Clock`, `IdGenerator`.
- Repository ACL：translates `RepositoryRefV1` and an action-specific access decision into Issues participation language.
- Inbound adapters：repository-console Server Components/forms/Server Actions after runtime approval.
- Outbound adapters：process-local stores for the first slice.
- Composition：only `apps/web/src/composition` wires concrete adapters.

## Contract decision required before scaffold

Repository must publish an action-specific, versioned contract usable by the consumer ACL; Issues must not
import Repository Domain/Application/Infrastructure. Candidate contracts are `RepositoryCollaborationScopeV1`
and `RepositoryParticipationDecisionV1`. Their action vocabulary and compatibility policy remain G2 work.

Issues does not need to publish a cross-context contract in v1 unless another approved consumer appears.

## Acceptance and success measure

- One browser flow demonstrates create Issue → create/apply Label → assign eligible Principal → close Issue.
- Domain tests cover lifecycle and scope invariants.
- Application tests prove denied Repository participation fails closed.
- Architecture tests prove only provider contracts cross Contexts.
- `pnpm check`, `pnpm docs:check`, `pnpm arch:check`, `pnpm build`, and `pnpm semgrep` pass.
- No Repository, Account, or Identity internal type appears in Issues Domain.

## Out of scope

- Comments, reactions, mentions, notifications and activity feed.
- Discussion conversion, Projects, milestones, dependencies and sub-issues.
- Git references, commits, branches, pull requests and code review.
- Cross-Repository Issue transfer, bulk editing, automation and durable persistence.

## Gate status

| Gate                   | Status   | Evidence / blocker                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------------- |
| G0 Orient              | Complete | current runtime, Context Map and tactical documents inspected             |
| G1 Approve semantics   | Complete | this selected semantic brief                                              |
| G2 Canonical knowledge | Complete | UL, contracts, data, Context Map and ADR 0005                             |
| G3 Ownership/path      | Complete | Product Team; `apps/web/src/modules/collaboration/repository-work/issues` |
| G4 Scaffold            | Complete | generated app-local Context and manifests                                 |
| G5 Implement           | Complete | Domain, Application Ports, in-memory adapters and tests                   |
| G6 Compose/present     | Complete | server composition and repository-console inbound adapters                |
| G7 Verify              | Complete | diagnostics, check, docs, architecture, build and Semgrep                 |
