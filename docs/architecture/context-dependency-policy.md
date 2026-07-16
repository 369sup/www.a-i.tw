# Context dependency policy

狀態：Accepted / machine enforced for new dependencies

Contexts communicate by synchronous Request/Response, Integration Event, Process Manager or read-only Query
Composition. These interaction modes are implemented with consumer-owned Application Ports and Infrastructure ACL
adapters; they do not authorize internal imports.

- Consumer Domain, Application, Contracts and Presentation know no provider Context.
- Consumer `adapters/outbound/integrations` may import only provider `contracts/vN/public.ts`.
- Provider contracts contain primitive DTO/schema, callable facade types or versioned Integration Events, never Domain,
  use-case, repository or persistence types.
- Domain Events remain internal. Published Integration Events are versioned and map to consumer-local Commands.
- Immediate invariants require an authoritative synchronous decision; events provide eventual reactions only.
- Every Context writes only its owned data, and one synchronous transaction guarantees one Context boundary.
- Cross-context assembly occurs only in `apps/web/src/composition`.

Every dependency requires a Context Map relationship. No cross-context ORM model, foreign-key invariant or distributed
transaction is approved. Registered legacy exceptions are removal debt, not precedent for new imports.
