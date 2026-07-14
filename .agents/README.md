# Agent workflow assets

## Purpose and scope

`.agents/` stores repository-owned reusable workflows and install metadata. These assets help agents work on the repository; they are not canonical product or Domain documentation.

The root structure below is closed and machine-enforced by `pnpm arch:topology`; changes require coordinated rules, checker tests, and passing CI.

## Resource map

```text
.agents/
├── skills/                  # routing index and exceptional standalone skills
└── plugins/
    ├── marketplace.json     # canonical repository marketplace manifest
    └── plugins/
        ├── modules/         # repository architecture and delivery workflows
        └── serena/          # semantic skill, MCP, and lifecycle hook
```

Related resources intentionally live elsewhere:

| Resource                       | Owner                                   |
| ------------------------------ | --------------------------------------- |
| Agent role briefs and prompts  | `.codex/agents/`, `.codex/prompts/`     |
| Semantic navigation memories   | `.serena/memories/`                     |
| Product and architecture truth | `docs/`, Context manifests, code, tests |
| Host plugins and credentials   | user/host-managed state                 |

## Selection and collaboration

1. Select a plugin-owned skill only when its trigger matches the current task.
2. Load its required inputs and references on demand rather than preloading the catalog.
3. Keep each workflow's input, output, owner, actions, and validation explicit.
4. Use parallel agents only for independent scopes; one primary owner integrates overlapping edits and final verification.

Vendor capabilities such as Vercel, Next.js, React, and OpenAI development remain owned by their official Codex
plugins. Do not mirror them into this repository; repository plugins contain only project-specific policy and automation.

Markdown and marketplace changes require `pnpm docs:check`; generators, templates, or topology assets also require their focused command and `pnpm arch:check` when topology is affected.
