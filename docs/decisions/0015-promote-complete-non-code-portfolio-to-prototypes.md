# ADR 0015: Promote the complete non-Code portfolio to usable prototypes

Status: Accepted — 2026-07-16

## Context

ADR 0014 established the closed six-Group, twelve-Area, 37-Context physical portfolio while deliberately keeping 17
Context descriptors non-runtime. The product goal now requires every accepted Context identity to demonstrate at least
one usable non-Code behavior. Directory presence, a manifest name or official product evidence alone remains
insufficient implementation evidence.

Complete GitHub parity is not the decision. The required minimum is one evidence-backed in-memory vertical slice with
a Web flow, tests and dated runtime evidence per Context.

## Decision

The accepted target distribution is 37 runtime Contexts and zero planned descriptors:

- 18 Contexts retain `lifecycle: approved` and `runtimeEvidence.status: current`;
- 19 Contexts use `lifecycle: prototype` and `runtimeEvidence.status: in-memory-prototype`;
- the 37 Context identities, six Domain Groups and twelve Domain Areas remain unchanged.

Each of the 17 planned descriptors is promoted only after its wave-specific G1-G3 decision matrix approves the exact
problem, first use case, source of truth, invariants, failures, Ports, dependencies, route, Web flow and exclusions.
Promotion must atomically create the six fixed runtime roots without losing the Context's governance or official
evidence record.

The transition is evidence-led:

1. an accepted wave decision authorizes only the listed slice;
2. G4-G7 implement and verify that slice;
3. the Context manifest, Context Map and canonical catalogs change from planned to runtime only when the implementation
   and dated evidence exist;
4. machine count fixtures change to 37/0 only when the final promotion is complete.

The delivery matrix and wave gates are owned by
[`github-non-code-37-context-prototypes`](../initiatives/github-non-code-37-context-prototypes/README.md).
Runtime truth continues to be owned by manifests, the Context Map, source and tests.

## Consequences

- ADR 0014's `20 runtime / 17 planned` distribution is superseded as the target, while its 37-Context identity and
  taxonomy remain valid.
- During migration, repository counts may remain between 20/17 and 37/0; no document may present the accepted target
  as already implemented.
- `Partial` official evidence blocks only unsupported behavior. A narrow slice may proceed when its exact rules are
  supported by identified GitHub official sources.
- Prototype completion does not imply durable persistence, live third-party integration or complete GitHub parity.
- Code, Git, Pull Request, Actions, autograding, Repository contents, Certification training content and other declared
  exclusions remain outside these prototypes.
