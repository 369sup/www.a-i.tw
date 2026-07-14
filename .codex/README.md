# Codex repository controls

## Purpose and boundary

This version-controlled directory owns repository-local Codex execution controls and reusable task interfaces. Host credentials, connectors, plugin caches, model preferences, notifications, telemetry, and Desktop state do not belong here.

The root structure documented here is closed and machine-enforced by `pnpm arch:topology`; no alternative Codex resource layout is accepted.

## Startup workflow

1. Read root `AGENTS.md`; read `.codex/AGENTS.md` when Codex or tool policy is relevant.
2. Select the narrowest route from the root `Context routing` map.
3. Load only task-relevant source, documentation, prompts, roles, or semantic state.
4. Use local installed docs before external versioned documentation.
5. Run the verification required by the root matrix before handoff.

## Directory map

| Path                             | Responsibility                                                        |
| -------------------------------- | --------------------------------------------------------------------- |
| `AGENTS.md`                      | repository-local Codex execution contract                             |
| `config.toml`                    | reproducible project MCP, sandbox, and approval settings              |
| `TOOL-ROUTING.md`                | detailed tool-selection guidance                                      |
| `rules/`                         | command execution safety only                                         |
| `prompts/`                       | reusable task prompts                                                 |
| `profiles/`                      | optional user-level profile templates; not automatically active       |
| `agents/`                        | read-only agent role briefs                                           |
| App-generated files in `.codex/` | Codex Desktop generated local-environment configuration, when present |
| `plugins/`                       | plugin boundary and host-integration policy                           |

## Efficient task format

```text
Goal: one verifiable outcome
Scope: target files, module, or behavior
Known facts: evidence already confirmed
Constraints: contracts and boundaries that must remain unchanged
Validation: focused command, then blast-radius expansion
Delivery: edit, analysis, or review plus final report shape
```

Prompts route to formal repository rules instead of copying them. Use relevant tools by intent: semantic tools for supported code-symbol work, native tools for Markdown/TOML/JSON/Git, and official versioned docs when local evidence is incomplete.

Changes to Markdown or repository Codex configuration require formatting plus `pnpm docs:check`; command rules or executable integration changes also require their focused validation.

## Stop checkpoint hook

The project-local `SessionStart`, `PreCompact`, and `Stop` hooks call the single checkpoint implementation under
`scripts/validation/codex-context-checkpoint/`. `SessionStart` records an observation baseline, `PreCompact` pauses for
a checkpoint, and `Stop` requests a checkpoint after material cross-file work. The `Stop` request requires task-scoped
verification before the structured work state is written and read back through Serena.

The hook uses the official `continue`, `stopReason`, `systemMessage`, and `SessionStart` additional-context fields. It
does not parse transcripts or impose a response template. Review and trust the exact repo-local definitions with
`/hooks` after they change. Run `node --test scripts/validation/codex-context-checkpoint/*.test.mjs` after changing this
contract.
