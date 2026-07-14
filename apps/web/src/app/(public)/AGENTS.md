# Public route rules

## Scope and hard rules

- This route group contains entrypoints that do not require blanket authentication, including the home page, login,
  public documentation, and public search endpoint.
- Public accessibility does not make data public: each use case must still apply visibility and authorization policy.
- Routes map transport concerns and invoke approved presentation or Application capabilities; they do not own Domain
  decisions.

## Prohibited actions

- Do not expose private resources, sessions, credentials, internal errors, or unrestricted search results.
- Do not add a route-level shortcut around Context Ports, published contracts, or server composition.
- Do not move public MDX source out of `content/docs` or internal canonical documents into the published tree.

## Required workflow and validation

1. Identify whether the endpoint is anonymous, optionally authenticated, or an authentication transition.
2. Verify visibility, error, cache, and metadata behavior appropriate to that audience.
3. Run focused tests, then `pnpm check` and `pnpm build`; run `pnpm docs:check` for public documentation changes.

Done means anonymous and authenticated behavior are explicit, private data remains protected, and the affected route is
verified.
