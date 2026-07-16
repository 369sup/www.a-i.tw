# Repository plugin rules

## Ownership

- `plugins/<plugin-name>/` contains repository-owned installable plugin source.
- Each plugin must contain `.codex-plugin/plugin.json`; its directory and manifest names must match.
- Skills belong under the owning plugin's `skills/` directory and must contain `SKILL.md`.
- `.agents/plugins/marketplace.json` is the canonical repository catalog.

## Constraints

- Do not copy vendor-owned skills or connectors into repository plugins.
- Do not store credentials, OAuth state, connector state, personal data, caches, or Desktop-managed installation state.
- Add `.app.json`, `.mcp.json`, hooks, or assets only when the plugin actually ships that capability.
- Preserve root and nearest `AGENTS.md`, permissions, architecture gates, and explicit authorization.

## Validation

- Validate skills with the system `skill-creator` validator.
- Validate plugin manifests with the system `plugin-creator` validator.
- Run focused generator tests, `pnpm docs:check`, `pnpm arch:check`, and inspect the diff.
