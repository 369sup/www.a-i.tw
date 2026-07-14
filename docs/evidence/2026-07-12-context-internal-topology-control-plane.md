# Context internal topology control-plane evidence

日期：2026-07-12

## Scope

Prepare ADR 0008 documentation, boundaries, generators, validators, static rules, skills and commands before any
runtime Context file is moved.

## Completed

- Accepted ADR 0008 and canonical target topology.
- Added transitional migration registry with eleven legacy Contexts.
- New Context generator emits layer/subdomain topology, `public-api.ts` and `composition/index.ts`.
- Subdomain generator emits the subdomain across owned layers.
- Manifest and cross-context validators accept registered legacy paths and enforce target paths for new Contexts.
- Added `arch:context-target` to `arch:check`.
- Added target Dependency Cruiser and Semgrep rules.
- Updated root/Codex rules, implementation prompts and lifecycle/scaffold skills.
- Runtime Context files were intentionally not moved.

## Verification

- Target topology validator: passed in transitional mode with eleven registered legacy Contexts.
- Context manifest equality: passed.
- Cross-context Published Language validation: passed.
- Repository topology: passed.
- Documentation ownership, 30 canonical concerns and links: passed.
- Generator scripts: Node syntax validation passed.
- Architecture rules: 12 tests passed, including transitional target-topology enforcement.
- Full `pnpm arch:check`: passed; Dependency Cruiser found zero violations across app and technical packages.
