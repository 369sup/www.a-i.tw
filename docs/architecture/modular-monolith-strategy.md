# Modular Monolith strategy

狀態：Accepted baseline

One deployable application is organized by bounded contexts under
`apps/web/src/modules/<context>`. A Context owns its Domain, Application,
Infrastructure, Contracts and Composition; technical packages have no business
owner and cannot depend on context internals. Service or workspace extraction is
deferred until independent deployment, scaling, availability, compliance or
team ownership is evidenced.

Decision evidence: [`../decisions/0001-domain-driven-modular-monolith.md`](../decisions/0001-domain-driven-modular-monolith.md).

ADR 0008 refines Context internals to `layer/<declared-subdomain>/<tactical-pattern-or-use-case>`. Existing `src/*`
paths are transitional; new scaffolds must use the target topology. See
[`context-internal-topology.md`](context-internal-topology.md).
