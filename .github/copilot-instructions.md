# Repository guidance

- Treat root `AGENTS.md` as the repository contract; read the nearest nested `AGENTS.md` before changing a subtree.
- Use `pnpm` commands from `package.json`. Preserve unrelated work and make the smallest owned change.
- Product runtime belongs in `apps/web/src/modules/<domain-group>/<bounded-context>`; technical packages must remain context-neutral.
- Preserve `UI / Infrastructure -> Application -> Domain`; cross-Context code may consume only provider
  `contracts/vN/public.ts` from a consumer outbound integration adapter.
- Route documentation through `docs/ai-index.md`; do not infer Current product status from directory presence.
- Run focused tests and the proportional gate: `pnpm docs:check`, `pnpm check`, `pnpm build`, and/or `pnpm arch:check`.
