# Serena Usage Policy

## Purpose

Define the retrieval, editing, and validation order for Serena in this repository.

## Summary

Read relevant memories first, then prefer symbol and reference tools for code entities. Use file tools for documentation/configuration, pattern search for non-symbol text, and shell commands for verification.

## Rules

- Use `rename_symbol` for semantic renames and `replace_symbol_body` for complete symbol changes.
- Use `insert_before_symbol` or `insert_after_symbol` for symbol-relative additions.
- Do not use global text replacement for semantic refactors or move domain models during exploration.

## Source Locations

- `.codex/config.toml`
- `.agents/skills/serena-semantic-workflow/`

## Related Documents

- `docs/runbooks/serena-memory-policy.md`

## Related Memories

- `mem:50-workflows/architecture-audit`
- `mem:50-workflows/safe-refactoring`
- `mem:40-engineering/verification-workflow`

## Last Verified

- Date: 2026-07-11
- Evidence: Serena MCP configuration and project skill.
