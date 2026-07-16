# Organization Account

Context `organization-account`; core subdomain; owner www.a-i.tw Product Team.

Problem: Own Organization Account identity and lifecycle without owning presentation Profile, Membership, Team, authentication, policy, or resource access grants.

## First approved use case

Principal use case: Create an Organization Account for an active Principal, initialize its Profile, and activate the Account.

An active Principal creates an Organization Account and initializes its presentation Profile.

- Success: persist a `provisioning` Organization Account, initialize Profile through `ProfileDirectory`, activate the
  Account, and return an Organization reference.
- Failures: inactive Principal, invalid identity/handle, conflicting active handle, or unavailable Profile capability.
- Retry: failed Profile initialization leaves an internal provisioning Account; the same canonical handle reuses the
  Account identity and retries initialization.
- Source of truth: this Context owns `OrganizationAccount`; Profile remains owned by `profile-presence`.

Organization Accounts never authenticate as Actors. Membership, Invitation and Organization Team lifecycle belongs to
`organization-participation`; this slice deliberately does not create a founding owner Membership or claim full
Organization onboarding.
