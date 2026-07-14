# ADR 0014: Complete GitHub non-Code portfolio taxonomy

Status: Accepted — 2026-07-14

## Context

ADR 0013 fixed the Current runtime navigation at four Domain Groups and nine Domain Areas. The complete product-model
discussion additionally includes GitHub Education、Campus Program、Campus Experts、Community Exchange、Classroom、
Certifications and Developer Program, and
separates Organization participation from Enterprise participation. GitHub official documentation confirms that these
concepts have distinct application、verification、partnership、course administration、exam/credential and membership
lifecycles, but that evidence does not make them local runtime Contexts.

## Decision

The long-term candidate navigation becomes:

| Domain Group          | Domain Areas | Candidate Bounded Contexts |
| --------------------- | -----------: | -------------------------: |
| `platform-governance` |            4 |                         11 |
| `collaboration`       |            2 |                          6 |
| `engagement`          |            1 |                          4 |
| `ecosystem`           |            1 |                          3 |
| `business-operations` |            2 |                          6 |
| `programs`            |            2 |                          7 |
| **Total**             |       **12** |                     **37** |

The complete mapping is owned by
[`github-non-code-semantic-model.md`](../product/github-non-code-semantic-model.md#accepted-complete-product-suite-navigation-taxonomy).
Domain Groups and Areas remain governance-only. Context IDs remain globally unique; runtime dependency is expressed only
by Context Map relationships. Account type、resource scope、installation scope and program qualification stay model or
manifest dimensions rather than additional directory levels.

## Adopted physical portfolio

This ADR supersedes ADR 0013's closed Group/Area registry. The physical migration completed with:

1. exactly 37 physical Context descriptors under six Groups and twelve Areas;
2. 20 runtime Contexts registered in the Context Map;
3. 17 planned descriptors with `runtimeEvidence.status: none` and no runtime directories;
4. no compatibility Context or old app-local import path;
5. an executable migration ledger recording the 18 source Context outcomes.

`context-topology-migration.json` owns physical taxonomy, while `context-relocation-map.json` owns the historical
rename/split/merge ledger. Planned directories materialize accepted portfolio boundaries only; they are not runtime,
Current status or implementation evidence.

## Consequences

- The 37 count is the physical portfolio target, not a completeness or deployment claim; only 20 are runtime.
- Campus Experts and Community Exchange remain distinct Education candidates because their application, membership,
  submission and discovery lifecycles differ from Campus Program and Classroom.
- Generic analytics is not a Context; source Contexts retain their own traffic, chart, metric and billing projections.
- Engagement and Ecosystem may be navigated independently without implying a runtime dependency split.
- Education and professional programs can evolve without becoming Account variants or Commercial entitlements.
- Classroom's Code-dependent template Repository、submission、autograding and Pull Request feedback remain excluded.
