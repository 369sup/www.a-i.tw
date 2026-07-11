---
name: serena-semantic-workflow
description: Use Serena MCP automatically for code-symbol discovery, implementation/reference analysis, diagnostics, and symbol-level refactors. Do not use for prose, configuration, Git-only tasks, or simple literal edits.
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

1. Read the root and target-path `AGENTS.md` files. Run Serena only from WSL Ubuntu using the Linux `serena` executable and Linux Python/Node/PATH; never invoke Windows `serena.exe` or Windows runtimes. Call `initial_instructions` before Serena work and `activate_project` if the active project is not this repository.
2. Select Serena tools by intent: `get_symbols_overview` for a file map; `find_symbol` or `find_declaration` for a definition; `find_implementations` and `find_referencing_symbols` for impact; diagnostics tools for semantic validation; and symbol-level edit/refactor tools for whole declarations.
3. Before a rename, deletion, move, or change crossing a bounded-context boundary, inspect references and the relevant contract/ADR. Keep dependency direction `UI / Infrastructure -> Application -> Domain`.
4. Prefer `replace_symbol_body`, `insert_before_symbol`, and `insert_after_symbol` to line-based edits when the full target is a code symbol. Use `rename_symbol` and `safe_delete_symbol` only after impact analysis.
5. Use normal file and text tools for Markdown, TOML, JSON, environment/configuration files, string literals, Git inspection, or an unsupported language. JetBrains tools are optional: use them only when present in the live Serena tool set and their IDE backend is required.
6. After semantic edits, obtain diagnostics for changed files and run the repository verification required by `AGENTS.md`.

Do not write or delete Serena memories unless the user explicitly asks. Do not assume optional tools are exposed; select them only when live tool discovery shows them.
