# Fixed Bounded Context template control plane

Date: 2026-07-13
Status: Historical; superseded by the closed nine-group registry and completed Context relocation.

ADR 0010 makes section 32 of `apps/web/src/modules/AGENTS.md` the canonical topology. The repository generator,
architecture checks, project skill, Codex prompt and repo marketplace plugin now route new Context creation through
the same complete `modules/<domain-group>/<bounded-context>` template. At the time of this evidence, existing ADR 0008
Contexts were registered as transitional and were not moved in that control-plane change.

Evidence: generator smoke test, Context topology check, manifest check and module-api export check.
