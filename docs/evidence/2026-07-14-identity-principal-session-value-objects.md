# Identity Principal and Session Value Object evidence

日期：2026-07-14

狀態：Verified Current slice

## Scope

Reconstruct the approved `authentication-security` Login, Session resolution and Logout runtime with Context-owned
Principal and Session values. Preserve the existing eight-hour browser Session behavior while moving lifecycle truth
from the Next.js cookie adapter into Domain/Application ownership.

No Bounded Context, Context Map relationship or Published Language expansion is approved by this slice. Federation,
provider linkage, SSO, 2FA, passkey, device verification, production credential storage and durable persistence remain
out of scope.

## Intended boundary

- Domain owns Principal identity/kind/status and Session identity/status/expiry transitions.
- Application owns Login/resolve/revoke orchestration and outbound Ports.
- Persistence adapters reconstruct Domain objects and map opaque token lookup without owning expiry policy.
- Next.js maps the Application-provided expiry into the cookie and owns cookie security flags.
- `contracts/v1` remains primitive and does not expose Session identity or token.

## Verified invariants

- Principal identity rejects blank values; kind and status use closed Context-owned vocabularies.
- Disabled Principals cannot authenticate.
- Credential verification returns a typed authentication method and assurance without leaking credential secrets.
- Session identity is independent from the opaque browser token.
- A Session expires exactly eight hours after authentication; expiry at the boundary fails closed.
- Revoked and expired Sessions are persisted terminal states and cannot become active.
- Principal persistence seeds reconstruct through Domain factories.
- Successful Login maps Domain/Application expiry to the HttpOnly cookie and enters `/repositories`.
- Confirmed Logout revokes the server Session, removes the cookie, enters `/login`, and protected `/repositories` rejects
  the former Session.

## Verification

| Check                                                                 | Result                                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Focused Identity tests                                                | 3 files, 8 tests passed                                    |
| `pnpm --filter @a-i/web test`                                         | 31 files, 72 tests passed                                  |
| `pnpm --filter @a-i/web check`                                        | passed; one unrelated existing Projects warning remains    |
| Serena changed-file diagnostics                                       | no diagnostics                                             |
| `pnpm docs:check`                                                     | passed                                                     |
| `pnpm arch:check`                                                     | passed; 37 architecture tests and no dependency violations |
| `pnpm build`                                                          | passed with Next.js 16.2.10 production build               |
| Focused Chromium Login → Profile → Logout → protected-route rejection | 1 passed                                                   |
| `pnpm semgrep`                                                        | passed; 265 targets, 4 rules, 0 findings                   |

The first E2E attempt exposed stale route assumptions in the acceptance test: Login lives at `/login`, successful Login
enters `/repositories`, and Logout uses the profile-menu confirmation flow. The corrected test then exposed and verified
the inbound adapter's successful Login and Logout redirects. Playwright Chromium was installed in the user cache only;
no package or lockfile changed.

Repository-wide `pnpm check` reached `format:check` and remains blocked by pre-existing formatting differences in
`.codex/agents/README.md` and `.codex/prompts/README.md`. The Identity slice passed its scoped Prettier check, full web
check/typecheck and tests; the unrelated `.codex` files were not changed.
