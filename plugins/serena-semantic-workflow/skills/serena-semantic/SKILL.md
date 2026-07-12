---
name: serena-semantic
description: Use Serena MCP for semantic symbol discovery, implementation/reference analysis, diagnostics, and safe refactors.
---

# Serena Semantic Tools

Before code-symbol work, run Serena through the Codex Desktop configured host runtime for this workspace; Windows-hosted tasks should use the Windows `serena`, Python, Node and PATH. Call `initial_instructions`; activate the current project if needed; use `list_memories` and read only scoped memories. `docs/` is formal truth, while memories are concise navigation and never override documentation, code, or tests. Use `get_symbols_overview` to orient, `find_symbol`/`find_declaration` for definitions, `find_implementations`/`find_referencing_symbols` for impact, and diagnostics for semantic validation. Prefer Serena symbol edits for full declarations; inspect references before rename or deletion. Optional JetBrains and diagnostic tools are used only if they are present in the live tool set. Update formal docs before a concise, source-backed status memory. Maintain repository `AGENTS.md` constraints and use native text/file tools for non-code artifacts.
