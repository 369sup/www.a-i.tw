# ADR 0006: Login, Session, Profile and Personal Dashboard boundary

狀態：Accepted

## Context

The product previously auto-authenticated every process as a demo Principal. The requested flow requires an
unauthenticated public entry, credential verification, browser-specific Session, Identity Resolution and an
authenticated Personal Dashboard. Profile must be represented without confusing it with Identity or Session.

## Decision

- Identity & Access owns Login, credential-verifier Port, opaque Session token and Principal resolution.
- Account owns Profile as Account presentation data.
- The public Login Server Action and cookie reader are inbound/transport adapters.
- `(console)/layout.tsx` is the shared authenticated route gate; resource authorization remains in owning Contexts.
- `MockCredentialVerifier` temporarily accepts `admin / 123456`; it is Infrastructure-only and non-production.
- Passkey, Social login, Enterprise SSO, 2FA, device verification and IdP policy remain planned extensions.
- Only Personal/Managed User accounts are Active Actors; Personal, Organization and Enterprise are scopes.
- Scope switching never changes action attribution. The current single cookie is a one-Actor baseline, not the target multi-session account switcher.

## Consequences

Different browsers no longer share one implicit session, Profile cannot grant access, and replacing the mock
credential provider does not change Domain or UI contracts. Production release is blocked until the mock is removed.
