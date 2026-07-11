# Architecture Principles

## Purpose

Summarize durable architectural constraints before symbol-level analysis.

## Summary

This repository uses a Domain-Driven Modular Monolith with Hexagonal Architecture and Ports and Adapters. Domain owns business rules and does not depend on delivery frameworks, databases, or SDKs. Application owns use cases, inbound ports, and outbound ports. Infrastructure implements outbound ports. UI, route handlers, Server Actions, jobs, and tests are inbound adapters; only a server-side composition root wires concrete adapters.

## Rules

- Cross-context interaction uses explicit contracts, ports, events, or consumer-owned adapters.
- Do not infer ownership solely from a file path or shared-looking name.
- Keep each Bounded Context model internally consistent. Resolve disagreement from code/tests and Context Map manifests before relying on canonical docs; memories and copied skills are navigation aids only.

## Source Locations

- `apps/web/src/modules/`
- `packages/`

## Related Documents

- `docs/architecture/dependency-rules.md`
- `docs/architecture/ports-and-adapters.md`

## Related Memories

- `mem:30-architecture/dependency-direction`
- `mem:30-architecture/shared-kernel-policy`

## Last Verified

- Date: 2026-07-12
- Evidence: app-local Context manifests, topology gate, dependency rules and architecture tests.
