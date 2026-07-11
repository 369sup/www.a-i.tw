# Codex MCP runtime

## Purpose

Keep filesystem, Git, and Serena available by default to Codex within this
repository while retaining narrow scope and explicit write approval.

## Scope and permissions

- filesystem MCP is limited to `/home/sup/code/www.a-i.tw`.
- Git MCP is for read-only repository investigation; commit, push, and other
  history-changing actions remain explicit user-authorized Git operations.
- Serena is the default semantic tool for TypeScript/JavaScript symbols,
  implementations, references, and diagnostics. Its memory writes retain the
  approval modes in `.codex/config.toml`.

## Prerequisites

Run Codex from WSL Ubuntu with `node`, `npx`, `uvx`, `serena`, and `curl` on
`PATH`. Do not use Windows equivalents for Serena or its language-server
runtime.

## Startup and verification

1. Keep the required MCP servers enabled in `.codex/config.toml`.
2. Open a new Codex task after changing `.codex/config.toml`; MCP configuration
   is read while the task starts.
3. Run:

   ```bash
   pnpm mcp:doctor
   ```

4. For TypeScript/JavaScript code work, call Serena initial instructions before
   symbol-level investigation. Use filesystem and Git MCP for scoped, read-only
   repository inspection when appropriate.

## Failure and recovery

- If `mcp:doctor` reports a missing command, install the required WSL-local
  runtime and retry; do not substitute Windows executables.
- If an OAuth endpoint reports `401`, reconnect the corresponding MCP provider
  in Codex; no token belongs in this repository.
- If an MCP server is not visible after a successful doctor check, reopen the
  Codex task so it reloads the project configuration.
