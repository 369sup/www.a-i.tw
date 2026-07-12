# Codex repository controls

This directory is the version-controlled policy surface for Codex in this repository.
Host-managed credentials, connectors, plugin caches, model preferences and desktop
state do not belong here.

## Startup contract

1. Read the root `AGENTS.md` and `.codex/AGENTS.md`.
2. Follow the narrowest route in the root routing table.
3. Start every task with the Serena handshake: `initial_instructions`,
   `get_current_config`, `list_memories`, and only the scoped memories needed.
4. Use Serena's exposed tools by intent for code symbols, references,
   implementations, diagnostics and semantic refactors.
5. Use Context7 autonomously for version-sensitive framework, package, SDK or API
   questions, after checking the installed version and local documentation.
6. Use native file tools for Markdown, TOML, JSON, Git and other configuration work.

## Directory map

| Path | Responsibility |
| --- | --- |
| `AGENTS.md` | Repository-local operating contract |
| `config.toml` | Project-local Serena MCP and tool policy |
| `TOOL-ROUTING.md` | Detailed tool-selection rules |
| `rules/` | Command execution safety policy only |
| `prompts/` | Reusable task workflows |
| `profiles/` | Optional user-level Codex profile templates |
| `agents/` | Read-only subagent role briefs |
| `plugins/` | Plugin boundary and host-managed integration policy |

## Scope boundary

The repository asks Codex to use all currently exposed, relevant Serena tools; it
does not require blindly calling every tool on every task. Context7 is similarly
opt-in by version sensitivity. This keeps startup small while preserving autonomous
tool selection when semantic or current external documentation is needed.
