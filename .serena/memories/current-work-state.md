# Current Work State
## Objective
Simplify and validate the Windows 11 Codex Desktop configuration for Git Bash, subagents, selected role plugins, eight MCP servers, and project checkpoint hooks.
## Scope
Global Codex AGENTS/config/custom agents plus repository Codex config, hook implementation, tests, and documentation.
## Confirmed Decisions
Use absolute cmd.exe plus npx.cmd for npm stdio MCPs, absolute uvx.exe for Python MCPs, Git Bash -c for interactive repository commands, and semantic checkpoint signals instead of token or dirty-file heuristics.
Keep only OpenAI Developers, Modules, Product Design, Data Analytics, and Sales plugins. Use built-in Explorer plus custom implementer and reviewer agents.
## Completed
Simplified global plugins, removed Node REPL and redundant custom reviewer, narrowed Filesystem to the repository, isolated browser MCPs, and configured Serena from cwd.
Reworked hooks so PreCompact and explicit phase signals create requests, Stop blocks only an existing request, and SessionStart restores pending context.
Validated TOML, MCP initialization and tools lists, hook launcher, hook tests, documentation checks, focused diff, and Serena diagnostics.
## In Progress
None.
## Pending
Restart Codex Desktop, review and trust project hooks, then validate custom agent selection in a new task because the current session cannot reload global configuration.
## Modified Files
C:/Users/sup/.codex/AGENTS.md; C:/Users/sup/.codex/config.toml; C:/Users/sup/.codex/agents/implementer.toml; C:/Users/sup/.codex/agents/reviewer.toml; repository AGENTS.md; .codex/AGENTS.md; .codex/config.toml; scripts/README.md; scripts/validation/codex-context-checkpoint files.
## Git Anchor
Branch main at 138fa497f77cf998bad68b17cdb262a074abc23f. Working tree contains this task plus pre-existing README deletions and pre-existing .serena/project.yml changes that were preserved.
## Validation
Hook tests passed 11 of 11. pnpm docs:check passed. Eight requested MCP servers initialized and listed tools. Serena active project is www.a-i.tw; changed hook files have only baseline missing Node type-resolution diagnostics. git diff --check found no whitespace errors.
## Known Risks
pnpm arch:topology remains blocked by pre-existing deletions of five repository README files. Codex Desktop restart is required to load global MCP, plugin, and custom-agent changes.
## Next Action
Restart Codex Desktop, approve the project hooks, open a new task, and confirm implementer/reviewer plus the eight MCP servers are exposed.
