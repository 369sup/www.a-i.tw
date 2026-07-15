# Public routes

## Purpose and scope

`(public)` groups entrypoints that are reachable without a blanket authentication gate. Some routes may adapt their
result when a valid session exists; every data-producing use case still enforces its own visibility policy.

## Current route map

```text
(public)/
├── page.tsx    public or session-aware home
├── sign-in/    canonical authentication entry
├── sign-up/    registration capability status
├── forgot-password/, reset-password/, verify-email/  lifecycle capability status
├── accept-invitation/ optionally authenticated membership transition
├── privacy/, terms/, accessibility/  public policy and experience foundations
├── search/     public documentation or authenticated product scope by Session
├── logout/     session termination
├── docs/       Fumadocs pages sourced from content/docs
└── api/search/ public documentation search endpoint
```

The route-group name does not appear in URLs. Product behavior remains in the owning Bounded Context; public MDX source
is documented in [`../../../content/docs/README.md`](../../../content/docs/README.md).

For route-wide rules read the parent [`AGENTS.md`](../AGENTS.md), then this directory's [`AGENTS.md`](AGENTS.md).
