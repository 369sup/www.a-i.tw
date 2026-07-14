# Repository skill routing

Repository-owned skills are distributed through plugins under `.agents/plugins/plugins/`:

| Plugin    | Skills                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `modules` | `repo-explore-first`, `repo-docs-maintenance`, `architecture-boundary-audit`, `scaffold-bounded-context`, `semantic-development-lifecycle` |
| `serena`  | `serena-semantic`; the same plugin also owns the Serena MCP and lifecycle hook                                                   |

Use the official Vercel plugin for Vercel, Next.js, React, AI SDK, UI, deployment, storage, runtime, and end-to-end verification
skills. Use the official OpenAI Developers plugin for OpenAI APIs, Agents SDK, ChatGPT Apps, and API troubleshooting. Do not copy
vendor skills into this directory or either repository plugin.

This directory is retained as the standalone-skill exception point and routing index. It currently contains no standalone skill.
