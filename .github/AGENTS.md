# GitHub automation rules

## Closed topology and non-waiver

```text
.github/
├── instructions/       # path-specific Copilot constraints
├── ISSUE_TEMPLATE/     # intake forms only
├── workflows/          # CI, docs, security, CodeQL
├── AGENTS.md
├── CODEOWNERS
├── PULL_REQUEST_TEMPLATE.md
├── README.md
├── copilot-instructions.md
└── dependabot.yml
```

- Root entries MUST match this tree exactly; GitHub behavior belongs to the semantic owner shown above.
- MUST NOT adopt an alternative structure, simplify or remove required governance, add a parallel automation root, or
  encode product behavior in workflow/template prose.
- MUST NOT bypass required checks, least privilege, reviewed action versions, branch/environment protections, or CI.
- Temporary, emergency, experimental, and migration workflows receive no permission or validation waiver.

## Scope and hard rules

- Scope: workflows, CODEOWNERS, issue/PR templates, Dependabot, and Copilot customization.
- Keep workflow commands aligned with `package.json`, permissions least-privileged, and third-party actions on an explicit reviewed version or commit.
- Copilot repository guidance routes to root `AGENTS.md`; path-specific files contain only incremental constraints.
- PR and issue templates must request the evidence and validation relevant to this repository.

## Prohibited actions

- Do not weaken branch protection, remove required checks, broaden workflow permissions, expose secrets, or change remote repository state without explicit authorization.
- Do not duplicate business or architecture policy in workflow YAML or Copilot prose.
- Do not expand triggers, deployment environments, or dependency update scope without assessing all affected branches and consumers.

## Required workflow

1. Identify owner, event trigger, permissions, commands, secrets, and downstream environment impact.
2. Reuse canonical scripts and the narrowest required token permissions.
3. Validate templates/customization and run the commands invoked by a changed workflow.
4. Review the focused YAML/Markdown diff for accidental remote or secret-bearing behavior.

## Validation and Definition of Done

- Documentation/customization changes require `pnpm docs:check`; workflow changes also require syntax review and affected-command checks.
- Done means required checks remain intact, permissions did not broaden unintentionally, action references are explicit, and no secret reaches logs.
