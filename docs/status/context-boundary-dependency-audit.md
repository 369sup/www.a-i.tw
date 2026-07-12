# Context boundary dependency audit

狀態：Current / verified 2026-07-12

All app-local Contexts use the target topology. Peer semantic imports originate only from consumer
`infrastructure/<subdomain>/integrations/**`, target provider `contracts/<subdomain>/public.ts`, and require a Context
Map relationship. `public-api.ts` and `composition/index.ts` are reserved for app server composition.

AD-009 is closed. Repository owns the `AccountDirectory` Port and its Account Published Language ACL adapter. Issues
owns the `RepositoryParticipation` Port and its Repository Published Language ACL adapter. Account, Repository and
Issues use local Principal input types instead of importing Identity & Access types into Application. The exception
registry is empty and remains machine checked so stale or newly added exceptions fail verification.

Dependency Cruiser verifies layer direction and cycles. The cross-context checker verifies importer layer, provider
entrypoint and manifest relationship. Architecture fixtures cover allowed Infrastructure integration, forbidden
provider internals, missing Context Map relationships and forbidden Application-to-provider imports.
