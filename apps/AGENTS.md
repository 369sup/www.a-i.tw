# Application container rules

## Scope and hard rules

- `apps/web` is the only deployable product application.
- Product behavior belongs to app-local Bounded Contexts; context-neutral reusable technology belongs in `packages/`.
- UI and delivery code call Application use cases or public contracts; they do not own business invariants or access persistence directly.
- Framework code must not enter Domain models; concrete adapters are wired only in server composition.

## Prohibited actions

- Do not create another app without explicit product ownership and deployment approval.
- Do not move product Domain, Application, contracts, policies, or persistence adapters into `packages/`.
- Do not import another app or Context's internal implementation.

## Required workflow

1. Continue to `apps/web/AGENTS.md` and the nearest target-path instructions.
2. Identify the owning Bounded Context, public contract, consumer, and composition impact.
3. Change the smallest app-local owner and add observable behavior coverage.

## Validation and Definition of Done

- Run focused app tests, then `pnpm check` and `pnpm build`; add `pnpm arch:check` for boundary or topology changes.
- The app count and deployment boundary remain unchanged unless explicitly approved, UI does not bypass Application, and the focused diff contains no unrelated refactor.
