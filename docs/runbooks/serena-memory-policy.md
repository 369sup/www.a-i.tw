# Serena Memory Policy

## Status

Accepted operational policy. It does not redefine Domain ownership or claim unverified runtime behavior.

## Responsibility Boundary

`docs/` is the human-reviewable source of truth for architecture, domains, decisions, status, and governance.
`.serena/memories/` is a concise AI navigation layer that links to formal sources, symbols, constraints, and verification.
Code and tests remain the evidence for actual runtime behavior.

## Memory Contract

Every durable memory uses: Purpose, Summary, Rules, Source Locations, Related Documents, Related Memories, and Last Verified.
`Last Verified` records a date and concrete evidence. Use `mem:` references for deterministic navigation.

Do not store full source files, broad diffs, command logs, chat history, duplicate documents, unverified claims, or stale research.

## Lifecycle

1. Start from a scoped memory and follow formal-document links.
2. Use Serena symbol tools to obtain current code evidence.
3. Update `docs/` first when a durable policy, decision, or status changes.
4. Proactively update, organize, distill or edit every affected durable memory with only a concise source-backed index or summary; a separate user prompt is not required for maintenance edits.
5. Keep temporary investigation under `.serena/memories/_temporary/`, then delete, archive, or promote it after verification.

Routine maintenance includes correcting stale status, owner, contract, path, relationship and verification summaries.
It must be narrow, reviewable and backed by canonical documents plus runtime or validation evidence. Creating speculative
Current state is forbidden. Deleting, renaming or broadly reorganizing durable memories still requires explicit user direction.

## Tool Policy

Every new Codex task begins with `serena.initial_instructions` and
`serena.get_current_config`. The handshake confirms the active WSL project and Codex
context. Verified maintenance edits are an expected completion step after canonical updates; they are not an external
side effect requiring separate per-task permission. Afterward, use symbol tools for code and native file tools for
Markdown, JSON, TOML and Git-only work.

Use memories for navigation, symbol tools for code entities, file tools for documents/configuration, pattern search for non-symbol text, and shell commands for validation. Before a cross-context change, establish owner, public contract, dependency direction, and reference impact.
