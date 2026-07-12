---
name: serena-semantic-workflow
description: Initialize Serena for every repository task, then use its semantic tools for code-symbol discovery, reference analysis, diagnostics, and symbol-level refactors.
metadata:
  promptSignals:
    anyOf:
      - "find definition"
      - "find declaration"
      - "find usages"
      - "find references"
      - "find implementations"
      - "rename symbol"
      - "safe delete"
      - "refactor"
      - "call hierarchy"
      - "type error"
      - "diagnostics"
---

# Serena Semantic Workflow

Use this workflow for code symbols in languages supported by Serena's language server.

1. At the start of every repository task call `initial_instructions` and `get_current_config`, then activate the project if it is not this repository. This handshake also applies to prose, configuration and Git-only tasks. Run Serena through the Codex Desktop configured host runtime for this workspace; Windows-hosted tasks should use the Windows `serena`, Python, Node and PATH.
2. Use `list_memories`, then read only scoped memories required by the task. Treat `docs/` as the formal source of truth; memories are summaries and navigation and never override documentation, code, or tests.
3. Select Serena tools by intent: `get_symbols_overview` for a file map; `find_symbol` or `find_declaration` for a definition; `find_implementations` and `find_referencing_symbols` for impact; diagnostics tools for semantic validation; and symbol-level edit/refactor tools for whole declarations.
4. Before a rename, deletion, move, or change crossing a bounded-context boundary, inspect references and the relevant contract/ADR. Keep dependency direction `UI / Infrastructure -> Application -> Domain`.
5. Prefer `replace_symbol_body`, `insert_before_symbol`, and `insert_after_symbol` to line-based edits when the full target is a code symbol. Use `rename_symbol` and `safe_delete_symbol` only after impact analysis.
6. Use normal file and text tools for Markdown, TOML, JSON, environment/configuration files, string literals, Git inspection, or an unsupported language. JetBrains tools are optional: use them only when present in the live Serena tool set and their IDE backend is required.
7. After semantic edits, obtain diagnostics for changed files and run the repository verification required by `AGENTS.md`. Update formal docs first, then proactively update, organize, distill or edit every affected durable Serena memory with concise source-backed navigation facts. Re-read changed memories to verify freshness.
8. Memory maintenance is part of task completion when canonical docs, manifests, runtime status, ownership, contracts, paths or verification evidence materially change. It does not require a separate user prompt. Never turn proposed semantics into Current memory before their gate is approved.

Do not delete or rename Serena memories, or broadly reorganize the memory hierarchy, unless the user explicitly asks. Do not assume optional tools are exposed; select them only when live tool discovery shows them.
