# GitHub control plane

## Purpose and scope

`.github/` owns GitHub-facing automation, intake, ownership, dependency updates, and coding-agent routing. Application behavior and product semantics remain with runtime and canonical documentation owners.

The root structure below is closed and machine-enforced by `pnpm arch:topology`; workflow convenience is not a waiver for adding another control-plane layout.

## Structure

```text
.github/
├── workflows/
│   ├── ci.yml       # primary CI
│   ├── docs.yml     # documentation gates
│   ├── security.yml # security policy
│   └── codeql.yml   # CodeQL analysis
├── ISSUE_TEMPLATE/  # bug and feature intake
├── PULL_REQUEST_TEMPLATE.md
├── CODEOWNERS
├── dependabot.yml
├── copilot-instructions.md
└── instructions/    # path-specific Copilot constraints
```

## Operating model

- Workflow commands call canonical `package.json` scripts instead of reimplementing project policy.
- `CODEOWNERS` routes review responsibility; it does not replace Domain ownership documentation.
- Repository-wide Copilot guidance routes to root `AGENTS.md`; path-specific instructions contain only incremental constraints.
- Secrets stay in GitHub-managed secret storage and are never echoed into logs or committed files.

## Change workflow and validation

1. Identify whether the change affects CI, security, ownership, intake, or Copilot routing.
2. Preserve least-privilege `permissions` and reviewed action version pins.
3. Run the affected local command and `pnpm docs:check` for templates or customization.
4. Review workflow syntax, trigger scope, branch/environment impact, and secret exposure before handoff.
