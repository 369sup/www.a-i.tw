# Account Value Object foundation evidence

日期：2026-07-13

狀態：Verified Current slice

## Scope

The approved Account Context now implements its first Value Object-first vertical slice for Create Account. The change
separates stable `AccountId` from mutable namespace `AccountHandle`, moves Account kind/status vocabulary into owned
Value Objects, delegates Account creation to a named Command/Handler, and relocates Account-owned Ports from the legacy
service file to `application/ports`.

No Bounded Context, Context Map relationship or versioned Published Language was added or changed. Presentation retains
FormData mapping and invokes the existing Account Application facade; app server composition remains the only concrete
wiring root.

## Verified invariants

- Account identity is non-empty and distinct from the handle.
- Account handles canonicalize to lowercase, contain 1-39 alphanumeric/single-hyphen characters, and reject leading,
  trailing or consecutive hyphens.
- Canonical handle variants compete for one globally unique Account namespace.
- Personal Account creation requires an active Principal.
- Organization Account creation establishes an active owner Membership for the creating Principal.
- Persistence seeds pass through Account Domain factories instead of bypassing Value Object construction.

## Evidence

| Check                           | Result                                                     |
| ------------------------------- | ---------------------------------------------------------- |
| Focused Account tests           | 3 files, 9 tests passed                                    |
| `pnpm --filter @a-i/web test`   | 23 files, 43 tests passed                                  |
| `pnpm --filter @a-i/web check`  | passed; one unrelated existing Projects warning remains    |
| Serena changed-file diagnostics | no diagnostics                                             |
| `pnpm docs:check`               | passed                                                     |
| `pnpm arch:check`               | passed; 30 architecture tests and no dependency violations |
| `pnpm build`                    | passed with Next.js 16.2.10 production build               |
| `pnpm semgrep`                  | passed; 202 targets, 4 rules, 0 findings                   |

Repository-wide `pnpm check` reached `format:check` and was blocked by pre-existing formatting differences in
`.codex/agents/README.md` and `.codex/prompts/README.md`. Files in this slice were formatted separately; the unrelated
baseline was not changed.

## Next gate

Implement Account-owned Profile values (`ProfileDisplayName`, `ProfileBio`, `ProfileWebsite`), then Membership,
Invitation and Team values, with Domain tests before changing Application orchestration or adapters.
