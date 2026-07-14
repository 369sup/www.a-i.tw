# Account Profile Value Objects evidence

Date: 2026-07-13

Status: Current / verified

## Scope

The approved Account Context now owns `ProfileDisplayName`, `ProfileBio` and `ProfileWebsite`. Update Profile is a named
Application Command/Handler, the legacy Profile service delegates to it, and the in-memory persistence adapter maps
seed records through Domain construction.

## Invariants

- Profile display name is required, trimmed and remains distinct from Account identity and handle.
- Profile bio is trimmed and limited to 160 characters, matching GitHub's documented public Profile boundary.
- Profile website is optional and canonicalized as an absolute HTTP(S) URL. The protocol restriction is a local safety
  invariant; no undocumented GitHub website length limit is claimed.
- Invalid seed records cannot enter the store without passing the same Domain constructors as runtime updates.

## Verification

- Serena diagnostics: no diagnostics in changed TypeScript files.
- Focused Account Profile tests: 3 files and 10 tests passed.
- Full web suite: 25 files and 51 tests passed, including the persistence-seed regression test.
- Web lint/typecheck passed with one unrelated existing Projects unused-variable warning.
- Documentation checks passed.
- Architecture import graph passed with no dependency violations; the serial verification run passed all 37
  architecture tests. An earlier parallel run had one transient fixture miss, so it was investigated, rerun narrowly,
  and then rerun through the complete serial architecture gate.
- Next.js 16.2.10 production build passed.
- Semgrep scanned 215 targets with 0 findings.
- Repository-wide `pnpm check` stopped at the pre-existing Prettier differences in `.codex/agents/README.md` and
  `.codex/prompts/README.md`; neither task-external file was modified. The scoped changed-file format check passed.

## Next gate

Membership and Invitation Value Objects, followed by Team Value Objects.
