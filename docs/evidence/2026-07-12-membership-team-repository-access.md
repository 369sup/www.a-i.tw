# Membership, Team and Repository access verification

日期：2026-07-12

## Story

Organization owner 邀請 Principal 形成 active Membership，將 active member 加入 Team，
再由 Repository owner 將 Repository Role 授予 Team。Repository 透過 Account 發布的
`TeamMembershipFactV1` 取得最小關係事實，並在自身 authorization policy 內計算有效存取。

## Boundary evidence

- Account Domain owns Team name and membership invariants.
- Account Application owns `TeamStore` and Team use cases.
- Account publishes Team ids only; it does not publish Repository Role.
- Repository owns Principal/Team access grants and the `team-grant` access decision.
- In-memory adapters are wired only by `apps/web/src/server/composition/product-workspace.ts`.
- Server Actions are inbound adapters and re-authenticate the current Principal before mutation.

## Verification

| Check                                         | Result                                              |
| --------------------------------------------- | --------------------------------------------------- |
| Serena diagnostics for changed TypeScript/TSX | no errors after correction                          |
| `pnpm check`                                  | passed; 25 tasks, Account/Repository tests included |
| `pnpm docs:check`                             | passed                                              |
| `pnpm arch:check`                             | passed; 11 architecture tests                       |
| `pnpm build`                                  | passed with Next.js 16.2.10                         |
| `pnpm semgrep`                                | passed                                              |

The first sandboxed `pnpm arch:check` attempt could not spawn its fixture Node process (`EPERM`).
The same command passed outside the sandbox with the repository WSL Node PATH.

## Remaining scope

- Storage is process-local and resets on restart.
- Browser E2E is not yet defined in `@a-i/e2e`; unit, type, architecture, build and static-security gates cover this slice.
- Membership removal invalidates effective Team access because Account publishes no Team ids for an inactive Membership;
  physical Team roster cleanup remains a later lifecycle refinement.
