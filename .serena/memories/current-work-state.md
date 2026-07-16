# Current Work State
## Objective
Audit official Codex configuration, remove invalid repository-local surfaces, migrate user-level profiles and custom agent configuration, and establish reliable Python and TOML validation.
## Scope
.agents and .codex configuration, repository topology validation, C:\Users\sup\.codex profiles, Python PyYAML runtime.
## Confirmed Decisions
Keep project-local environment.toml, lifecycle hooks, instruction budget, and repository-specific command rules. Keep user preferences, profiles, host MCP configuration, and custom agents under C:\Users\sup\.codex. Use Python tomllib for TOML, not Prettier.
## Completed
Removed deprecated project prompts, repo profile templates, redundant plugin guidance, TOOL-ROUTING, and repo custom agent. Corrected marketplace source path and nonexistent Serena plugin references. Installed PyYAML 6.0.3. Added implementation, review, and release user profiles.
## In Progress
None.
## Pending
Restart Codex Desktop or open a new task to pick up user-level profile and agent changes.
## Modified Files
Repository Codex and agent governance files plus topology checker/tests; user-level profile files under C:\Users\sup\.codex.
## Git Anchor
branch main; HEAD 012843029e8624d1b80d2f27e4f8521bf25e38bf; working tree contains pre-existing unrelated Serena, module, and product documentation changes plus this Codex configuration cleanup.
## Validation
Official plugin validator passed; PyYAML import and pip check passed; all TOML parsed; Codex CLI 0.144.5 loaded all three profiles through mcp list; docs:check passed; arch:check passed; architecture tests 90 passed; hook tests 13 passed; git diff --check passed.
## Known Risks
Project-local rules remain by design because moving www.a-i.tw-specific command restrictions globally would affect unrelated repositories. Empty .codex/agents discovery directory remains due a Windows process lock but contains no configuration.
## Next Action
Restart Codex Desktop, then verify the new task sees the user-level agent and selected profiles.
