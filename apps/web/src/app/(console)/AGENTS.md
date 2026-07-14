# Authenticated console route rules

## Scope and hard rules

- This route group contains authenticated product routes; its root layout must continue to fail closed through the
  approved authentication entrypoint.
- Product routes, labels, symbols, and presentation folders use `Repository`, `Repositories`, or `Repository management`.
  `Workspace` is not a GitHub product or Domain term and must not be introduced under `apps/web/src`.
- Routes remain inbound adapters: map request and UI state, invoke public Application capabilities, and render results.
- Preserve account, organization, enterprise, repository, and request-context ownership boundaries.

## Prohibited actions

- Do not bypass authentication in a child route or treat Organization or Enterprise as a login actor.
- Do not implement authorization, Domain invariants, persistence, or cross-Context integration inside route files.
- Do not import concrete outbound adapters; obtain composed capabilities through server composition.

## Required workflow and validation

1. Identify the owning Context, use case, audience, and authorization decision before changing a route.
2. Change the smallest route and owning capability; add focused observable-behavior coverage.
3. Run focused tests, then `pnpm check` and `pnpm build`; add `pnpm arch:check` for boundary changes.

Done means unauthenticated access still fails closed, authorization remains owner-controlled, and affected routes build
and behave as verified.
