# Documentation rules

## Closed topology and non-waiver

The only legal documentation categories are:

```text
application  architecture  contracts  data  decisions  domains
engineering  evidence      experience governance initiatives operations
product      roadmap       runbooks   status           strategy    templates
```

Root owner files are exactly `AGENTS.md`, `README.md`, `ai-index.md`, `architecture-document-catalog.md`, and
`glossary.md`.

- Root entries MUST match this closed list; each category MUST retain the ownership defined by `README.md`.
- MUST NOT adopt an alternative structure, simplify categories, add a catch-all documentation bucket, duplicate an
  owner, or place public Fumadocs source in this internal knowledge base.
- MUST NOT bypass document status, canonical ownership, link/package-workspace checks, architecture gates, or CI.
- Draft, Proposed, temporary, generated, research, migration, and historical documents never become Current evidence
  without the required runtime or dated proof.

## Scope and hard rules

- Start with `ai-index.md` and read only the canonical owner required by the task.
- `README.md` owns documentation topology and navigation, not product or architecture semantics.
- Preserve explicit Current, Proposed, Transitional, Deprecated, and Historical status; Current claims require current code, manifest, test, or dated evidence.
- ADRs record decisions and trade-offs, contracts remain explicit, and runbooks remain executable.

## Prohibited actions

- Do not duplicate an owner document, copy runtime truth into navigation, or present research/roadmap intent as implemented behavior.
- Do not leave stale paths, unverifiable commands, broken links, or unmarked superseded guidance.
- Do not rewrite unrelated documents or generate broad reports unless requested.

## Required workflow

1. Identify document type, canonical owner, audience, and current status.
2. Verify affected paths, commands, contracts, and runtime claims against current evidence.
3. Update the owner first, then only affected navigation and dated evidence.
4. Keep rationale short and use tables or diagrams only when they clarify a real mapping or dependency.

## Validation and Definition of Done

- Documentation-only changes require `pnpm docs:check`; topology or boundary changes also require `pnpm arch:check`.
- Done means one canonical owner remains, links and commands validate, status is explicit, and no Proposed behavior is described as Current.
