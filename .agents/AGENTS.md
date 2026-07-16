# Agent asset rules

## Closed topology and non-waiver

```text
.agents/
├── plugins/
│   ├── marketplace.json # canonical repository marketplace manifest
│   └── plugins/         # repository-owned plugin sources referenced from repo root
├── skills/              # standalone-skill exceptions and routing index only
├── AGENTS.md
└── README.md
```

- Root entries MUST match this tree exactly; every skill directory MUST contain `SKILL.md`.
- MUST NOT adopt an alternative structure, simplify required entries, add an architecture category, or mix prompts,
  roles, memories, product truth, host state, or runtime code into this owner.
- MUST NOT bypass the skill/plugin manifest, consumer validation, `pnpm arch:topology`, or CI.
- Temporary, experimental, copied, generated, or migration status never waives ownership, permissions, trigger, or
  validation boundaries.

## Scope and hard rules

- Scope: repository skills, generators, references, overlays, assets, and repository-distributed plugin metadata.
- Repository workflows SHOULD ship through one owning plugin; use standalone skills only when no plugin bundle is justified.
- Vendor-owned workflows available through official plugins MUST NOT be copied into repository-owned plugins or skills.
- Every workflow has one narrow trigger, explicit inputs, bounded actions, outputs, owner, and verification.
- Skills remain small, composable, and reference canonical docs or manifests rather than encoding product truth.
- Repo marketplace entries use a `./`-prefixed path resolved from the repository root and match the plugin manifest name.
- Parallel work uses disjoint scopes; the primary agent owns integration and final verification.

## Prohibited actions

- Do not create overlapping agents or skills without a distinct decision boundary.
- Do not let an asset elevate permissions, bypass root rules, or silently expand task scope.
- Do not store secrets, tokens, personal data, connector state, long logs, speculative semantics, or copied canonical documents.
- Do not preload every skill or reference for unrelated tasks.

## Required workflow

1. Confirm the missing reusable capability and existing owner.
2. Prefer updating one existing workflow over adding a duplicate.
3. Define trigger, inputs, exact action, output, failure behavior, and verification.
4. Test generators against canonical templates and inspect generated output.

## Validation and Definition of Done

- Markdown/config changes require `pnpm docs:check`; generator or topology changes also require focused tests and `pnpm arch:check`.
- Done means the asset is discoverable, narrowly triggered, permission-safe, source-backed, and independently verifiable.
