# GitHub non-code runtime expansion evidence

日期：2026-07-12

## Implemented vertical slices

- Issues: Comment, Milestone and blocking dependency in addition to Issue, Label and Assignment.
- Projects: create Project, add Project Item reference and list by owner.
- Discussions: create Repository Discussion and mark Answer.
- Notifications: create Notification and triage unread/read/saved/done Inbox state.
- Search: index non-code Search Document, query and apply viewer visibility filter.
- Activity Feed: append and list recipient-scoped Feed Items.
- Audit: append immutable observations and query by actor/action.
- Dashboard: Presentation-owned consumer read model composed from owner-provided sources.

## Architecture

All product Contexts are app-local under `apps/web/src/modules`. Domain models have no framework dependencies;
Application owns Ports/use cases; Infrastructure implements in-memory outbound adapters; concrete instances are wired
only by `apps/web/src/composition/product-composition.ts`. Dashboard remains an Experience adapter and does not
own product truth.

## Verification

- `pnpm --filter @a-i/web check`: passed.
- `pnpm --filter @a-i/web test`: 29 passed, 1 template todo.
- `pnpm docs:check`: passed; all 30 canonical architecture concerns resolved.
- `pnpm arch:check`: passed; 231 app modules and 391 dependencies cruised with zero violations; 11 architecture tests passed.
- `pnpm build`: passed with Next.js 16.2.10.
- `pnpm semgrep`: unavailable in the current Windows environment because Semgrep is not installed.
