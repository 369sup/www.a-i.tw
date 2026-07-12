# Account Context

## Purpose

Route analysis of Account, Profile, Membership, Team, Active Actor and Active Scope language.

## Summary

Account is a verified core Context. It owns Account, Account Profile, Membership and Team invariants. Profile is Account presentation data and cannot authenticate or authorize. Account Context switching is two-dimensional: Personal/Managed User accounts may be Active Actors, while Personal/Organization/Enterprise are scopes. Current runtime supports one Personal Actor and Personal/Organization scope selection; multi-session switching, Managed user and Enterprise governance remain Planned.

## Rules

- Organization and Enterprise cannot log in or replace action attribution.
- Scope switching does not change Active Actor.
- Profile changes never change AccountId, Session, Membership or Repository grants.
- Cross-context consumers use versioned facts only.
- Formal docs, manifests, runtime and tests override this navigation memory.

## Source Locations

- `apps/web/src/modules/account/`
- `apps/web/src/app/(console)/workspace/@accounts/page.tsx`

## Related Documents

- `docs/domains/account.md`
- `docs/decisions/0006-login-session-profile-dashboard.md`
- `docs/status/architecture-debt-register.md`

## Last Verified

- Date: 2026-07-12
- Evidence: Profile tests, Actor/Scope UI language, 4 E2E and full gates.
