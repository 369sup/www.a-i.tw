# Context internal topology runtime migration evidence

Date: 2026-07-12

## Outcome

All app-local Bounded Contexts now use the ADR 0008 Context-first, layer-second, declared-subdomain-third topology. No Context retains the legacy `src/*` tree. The migration registry is in `target` mode with an empty `legacyContexts` list.

GitHub-aligned product semantics remain owned by their explicit Contexts: Issues owns Issue, Label, Assignment and collaboration behavior; Projects and Discussions remain separate product Contexts; Dashboard, Profile, Feed, Search, Notification Inbox and Audit remain consumer-shaped projections or dedicated read capabilities rather than a generic Projection Context.

## Verification

- Context target topology: target mode, zero legacy Contexts.
- Context manifests, public entrypoints and cross-context Published Language imports: passed.
- Web TypeScript check: passed.
- Web tests: 20 passed, 1 skipped; 29 tests passed, 1 todo.
- Dependency Cruiser: no violations across app, package and architecture graphs.
- Full architecture rules rerun after updating the target-mode assertion.
