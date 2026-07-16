# Classroom Management Bounded Context

## Status

Planned semantic boundary only. No runtime, contract, composition, persistence, or dependency is approved.

## Ownership

Candidate source-of-truth models: `Classroom`, `Roster`, `Assignment`.

## Constraints

- Do not add runtime directories or exports before an approved first use case.
- Do not import this Context while `lifecycle` is `planned`.
- Revalidate owner, invariants, Ports, contracts, consumers, and official evidence before promotion.

<!-- BEGIN:context-governance -->

## Complete governance contract

### Status and problem boundary

- Lifecycle: `planned`; runtime evidence: `none`.
- Owner: www.a-i.tw Product Team.
- Problem: Own non-Code Classroom, roster, assignment administration, deadlines, extensions, progress and LMS connection semantics.
- Evidence status: Partial non-Code subset; promotion requires a useful first slice independent of Code.

### Owns

Canonical source-of-truth models declared by `context.json`:

- `Classroom`
- `Roster`
- `Assignment`

### Does not own

- Repository content
- autograding
- Pull Request feedback
- Organization Account
- Education eligibility

### Ubiquitous language

- Classroom
- Roster
- Assignment
- Group Assignment
- Deadline
- Extension
- Progress
- LMS Link

### Core invariants

- Classroom and Assignment metadata must remain useful without owning generated Repository content.
- Roster membership cannot replace User Account or Organization participation truth.

### Allowed dependencies

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Cross-Context calls still require a consumer-owned Port, outbound integration ACL and provider `contracts/vN/public.ts`.

### Non-Code boundary

Exclude template and submission code, autograding execution, Pull Request feedback, IDEs and Codespaces.

### Change and promotion gate

Do not add runtime directories, contracts, relationships, composition or exports until the first use case and source-of-truth model are re-approved.

### Official evidence

Evidence IDs: `EDU4`. Definitions are centralized in `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`; do not duplicate official URLs here.
<!-- END:context-governance -->
