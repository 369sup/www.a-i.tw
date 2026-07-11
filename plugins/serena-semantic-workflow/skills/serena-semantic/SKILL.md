---
name: serena-semantic
description: Automatically use Serena MCP for code-symbol discovery, callers, implementations, diagnostics, and symbol-level refactors. Use native tools for prose, configuration, Git, and simple literal edits.
metadata:
  promptSignals:
    anyOf:
      - "find definition"
      - "find references"
      - "find implementations"
      - "rename symbol"
      - "refactor"
      - "safe delete"
      - "diagnostics"
---

# Serena Semantic Tools

Before code-symbol work, run Serena only from WSL Ubuntu using its Linux executable and Linux Python/Node/PATH—never Windows `serena.exe` or Windows runtimes. Call `initial_instructions`; activate the current project if needed. Use `get_symbols_overview` to orient, `find_symbol`/`find_declaration` for definitions, `find_implementations`/`find_referencing_symbols` for impact, and diagnostics for semantic validation. Prefer Serena symbol edits for full declarations; inspect references before rename or deletion. Optional JetBrains and diagnostic tools are used only if they are present in the live tool set. Maintain repository `AGENTS.md` constraints and use native text/file tools for non-code artifacts.
