# Serena project state

`.serena/` contains the TypeScript language-server configuration, ignored disposable cache, and three role-specific memories. Code, tests, manifests, `AGENTS.md`, and canonical docs remain authoritative.

```text
.serena/
├── cache/        # ignored PID, logs, debounce, fallback and generated state
├── memories/
│   ├── project-overview.md
│   ├── knowledge.md
│   └── current-work-state.md
├── .gitignore
├── AGENTS.md
├── project.yml
└── README.md
```

For supported code, activate once, inspect symbols and references before editing, and run diagnostics after editing. Read only the memory required by the current event. Memory policy and checkpoint commands are documented in `docs/runbooks/serena-memory-policy.md`.
