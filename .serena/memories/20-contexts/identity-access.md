# Identity and Access Context

## Purpose

Route analysis of Principal, Login, credential verification and browser Session facts.

## Summary

Identity & Access is a verified supporting Context. It owns Principal validity, Login, the CredentialVerifier Port and token-keyed Session lifecycle. The current Infrastructure adapter accepts the non-production mock credential admin / 123456 and stores opaque sessions in process memory. It publishes PrincipalRefV1; it does not own Account Profile, Active Scope or resource authorization.

## Rules

- Only an active Principal may authenticate.
- Browser cookies contain an opaque session token, never credentials or Principal data.
- Active Actor and Active Scope are distinct; the current runtime supports one Personal Actor session only.
- Passkey, SSO, 2FA, device verification, Managed user and multi-session Actor switching are Planned.
- Formal docs, manifests, runtime and tests override this navigation memory.

## Source Locations

- `apps/web/src/modules/identity-access/`
- `apps/web/src/server/auth/session.ts`
- `apps/web/src/presentation/auth/actions.ts`

## Related Documents

- `docs/domains/identity-and-access.md`
- `docs/decisions/0006-login-session-profile-dashboard.md`
- `docs/evidence/2026-07-12-login-session-profile-dashboard.md`

## Last Verified

- Date: 2026-07-12
- Evidence: diagnostics, 18 tests, 4 E2E, docs/arch/build/Semgrep.
