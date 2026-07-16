# Codex project rules

## Closed topology and non-waiver

```text
.codex/
├── agents/        # role briefs
├── environments/  # reproducible project environment descriptors
├── rules/         # command-execution policy only
├── AGENTS.md
├── config.toml
└── README.md
```

- Root entries MUST match this tree exactly; each category MUST retain the responsibility shown above.
- MUST NOT adopt an alternative structure, simplify required entries, add a hidden instruction source, or move
  product/architecture truth into Codex execution configuration.
- MUST NOT bypass root/nearer `AGENTS.md`, permissions, sandbox, approval, architecture gates, or CI through a prompt,
  role, profile, rule, environment, or plugin.
- Temporary, local, generated, experimental, and migration status never permits secrets, host state, or weaker rules.

## Scope and precedence

- This file owns repository-local Codex execution policy; product semantics and architecture remain in root or nearest module `AGENTS.md` and canonical docs.
- Read only the first relevant route selected by root `Context routing`; current runtime, manifests, tests, and owner documents remain authoritative.
- `.codex/rules/*.rules` controls command execution only and does not own architecture, TypeScript, documentation, or naming policy.

## Hard rules

- Prefer semantic tools for supported code symbols, references, implementations, diagnostics, and semantic refactors. Use precise text search and patch tools for prose, structured text, configuration, Git, and content that does not benefit from symbol analysis; mixed tasks must reconcile code and documentation evidence.
- Use local installed documentation first for version-sensitive frameworks, packages, SDKs, and APIs; use external official versioned docs only when local evidence is incomplete.
- Repository config may declare trusted-project hooks and instruction-discovery settings. User preferences, profiles,
  host MCP commands, credentials, notifications, telemetry, and plugin state remain user-managed.
- Custom agents must reference formal repository rules instead of duplicating or weakening them.

## Prohibited actions

- Do not store credentials, connector IDs, OAuth state, plugin caches, personal model preferences, notifications, telemetry, or Desktop-managed state.
- Do not preload documentation catalogs, memories, skills, roles, or tools unrelated to the task.
- Do not create automation that bypasses tests, permissions, architecture gates, or explicit user authorization.
- Never push, deploy, destructively delete, reset, rebase, or handle secrets without explicit authorization.

## Required workflow

1. Confirm root instructions, worktree status, owner, boundary, and verification.
2. Select the narrowest route and load only required resources.
3. For semantic code work, attempt the configured semantic handshake once; if unavailable, use native semantic fallback only with explicit user authorization and do not repeat the same failure.
4. State owner, dependency direction, use case, Ports/Adapters, composition impact, and verification before editing; mark non-applicable items explicitly.
5. Make the smallest change and inspect the focused diff.

## Validation and Definition of Done

- Markdown/config changes require formatting and `pnpm docs:check`; rules, custom agents, MCP, hooks, environments, or plugin changes also require their consumer-specific validation.
- Windows: treat `CreateProcessAsUserW failed: 5` or `Access denied` while starting `pwsh.exe` as shell-launch failure; use an available shell and do not retry blocked launch.
- Done means context stayed scoped, no host-private state entered Git, formal rules were not duplicated, and executed verification is reported accurately.
