# Serena Usage Policy

## Purpose

Define retrieval, semantic analysis, editing, diagnostics and memory-maintenance order for Serena.

## Summary

After the mandatory handshake, list and read scoped memories, then prefer symbol/reference tools for code entities. Use file tools for prose/configuration, Serena pattern search for targeted discovery and shell commands for verification. Tool selection is intent-based; do not call all available tools merely to satisfy a count.

## Rules

- Start every repository task with `initial_instructions`, `get_current_config`, `list_memories` and scoped `read_memory`.
- Use `get_symbols_overview` before analyzing an unfamiliar code file.
- Use `find_symbol` or `find_declaration` for definitions and `find_referencing_symbols` for impact.
- Use `find_implementations` when a Port/interface implementation relationship matters.
- Use diagnostics for changed TypeScript/JavaScript files.
- Use `rename_symbol`, `safe_delete_symbol` and symbol-body editing only when the operation requires them.
- Do not use global text replacement for semantic refactors.
- After canonical docs and verified runtime change, proactively update, organize, distill or edit every affected scoped memory; routine maintenance does not require a separate prompt.
- Re-read changed memories and report the maintenance performed; deletion, rename or broad hierarchy reorganization still requires explicit user direction.
- Memory is navigation and never overrides formal documentation, manifests, code or tests.

## Source Locations

- `.codex/config.toml`
- `.agents/skills/serena-semantic-workflow/`

## Related Documents

- `docs/runbooks/serena-memory-policy.md`
- `docs/engineering/semantic-development-workflow.md`

## Related Memories

- `mem:00-core/memory-governance`
- `mem:50-workflows/architecture-audit`
- `mem:50-workflows/safe-refactoring`
- `mem:40-engineering/verification-workflow`

## Last Verified

- Date: 2026-07-12
- Evidence: Serena tool inventory, scoped memory audit and proactive maintenance policy.
