# Discussions Q&A evidence

日期：2026-07-14  
狀態：Current in-memory runtime slice

## Approved semantics

- Owner: `collaboration/discussions`.
- First use case: create a Repository Q&A Discussion, add a Comment, and let the author or an eligible Repository
  triager mark that active Comment as the accepted Answer.
- Source of truth: `DiscussionCategory` and `Discussion`.
- Every Discussion belongs to one Repository-scoped Category; only an answerable Category permits an accepted Answer.
- The accepted Answer references an active Comment inside the same Discussion Aggregate.
- Repository access, lifecycle and Principal eligibility are consumed facts and are not duplicated by Discussions.

GitHub documents that every Discussion belongs to a Category, Q&A Categories accept answers, and Discussion authors or
people with Repository triage access or greater can mark a Comment as an Answer:

- <https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-categories-for-discussions>
- <https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/participating-in-a-discussion>

## Runtime boundaries

- Domain owns Discussion/Category/Comment values, Category answerability, Comment membership and accepted Answer
  invariants.
- Application owns create/list/comment/mark-answer orchestration and author-or-triager eligibility.
- Discussions consumes `RepositoryParticipationApiV1` through `RepositoryDiscussionParticipation` and
  `RepositoryDiscussionParticipationAdapter`.
- Repository and Authorization publish `discussion:read`, `discussion:create`, `discussion:comment` and
  `discussion:triage` decisions without owning conversation state.
- Repository console Server Actions re-authenticate, pass only untrusted identifiers/text and revalidate the current
  route after mutation.

## Explicit exclusions

Organization Discussions, Category administration, announcements, polls, reply threads, minimizing, answer removal,
closing/locking, moderation, transfer, labels, durable persistence, notifications and search require separate gates.

## Verification

- Discussions／Authorization focused tests: 5 files, 14 tests passed.
- Complete web tests: 36 files, 88 tests passed.
- Web typecheck and lint: passed.
- Documentation checks: passed.
- Architecture check: passed with 39 tests and zero dependency violations.
- Next.js 16.2.10 production build: passed and includes `/repositories`.
- Chromium Repository management E2E: 4 tests passed, including create Discussion → add Comment → mark Answer.
- Semgrep: 317 targets, zero findings.
- Repository-wide `pnpm check`: formatting phase remains blocked only by the pre-existing
  `.codex/agents/README.md` and `.codex/prompts/README.md` differences; scoped formatting and lower-level web plus
  architecture checks passed.
