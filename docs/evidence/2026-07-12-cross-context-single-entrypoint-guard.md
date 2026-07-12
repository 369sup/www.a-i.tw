# Cross-context single-entrypoint guard evidence

Date: 2026-07-12

## Decision applied

ADR 0009 defines the target collaboration path:

```text
Consumer Application Port
  <- Consumer Infrastructure integration ACL
  -> Provider contracts/<subdomain>/public.ts

apps/web/src/server/composition
  -> Context public-api.ts + composition/index.ts
```

Domain, Application, Contracts and Presentation cannot introduce new provider dependencies. Integration Events enter
through Infrastructure and map to local Commands. Immediate invariants use synchronous authoritative decisions.

## Runtime disposition

Seven pre-existing Application-to-provider contract imports are registered under AD-009. The exception registry is
exact: stale entries fail verification, and any new unregistered dependency fails. This preserves current behavior while
preventing expansion of transitional coupling.

## Verification scope

- Cross-context checker validates importer layer, provider entrypoint and Context Map relationship.
- Architecture fixtures cover allowed Infrastructure integration and rejected Application dependency.
- Semgrep guards Domain, Contracts, Presentation and non-integration Infrastructure locations.
- Canonical architecture, contract, composition, adapter, workflow, template and agent guidance are aligned.
