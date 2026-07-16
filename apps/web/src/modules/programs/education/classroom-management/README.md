# Classroom Management

Lifecycle: `planned`

Own non-Code Classroom, roster, assignment administration, deadlines, extensions, progress and LMS connection semantics.

This directory materializes the accepted GitHub non-Code portfolio target. It is not runtime evidence. See the canonical semantic model and ADR 0014 before promotion.

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Own non-Code Classroom, roster, assignment administration, deadlines, extensions, progress and LMS connection semantics.

This directory is the declared local ownership boundary for `Classroom`, `Roster`, `Assignment`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `planned`.
- Runtime evidence: `none`.
- Principal use case: No first use case is approved. Promotion requires a concrete product outcome, acceptance criteria and refreshed official evidence.

### Source of truth

- `Classroom`
- `Roster`
- `Assignment`

### Language and invariants

Ubiquitous language:

- Classroom
- Roster
- Assignment
- Group Assignment
- Deadline
- Extension
- Progress
- LMS Link

Required invariants:

- Classroom and Assignment metadata must remain useful without owning generated Repository content.
- Roster membership cannot replace User Account or Organization participation truth.

### Collaboration

- No runtime relationship is approved. Candidate collaborations must not be imported or added to the Context Map before promotion.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- Repository content
- autograding
- Pull Request feedback
- Organization Account
- Education eligibility

Exclude template and submission code, autograding execution, Pull Request feedback, IDEs and Codespaces.

### Official evidence

- Evidence status: Partial non-Code subset; promotion requires a useful first slice independent of Code.
- Evidence IDs: `EDU4`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
