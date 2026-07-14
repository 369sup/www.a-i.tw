# authentication-security bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Identity and Access`; subdomain: `authentication-security` (`supporting`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.
- Principal identity/status and Session identity/status/expiry are owned here. Browser tokens are lookup credentials,
  not Domain Session identity and never Published Language.
- A disabled Principal cannot authenticate. An expired or revoked Session must fail closed and cannot become active.
- The current browser Session policy is eight hours, preserving existing runtime behavior; adapters consume the
  Application expiry result instead of re-declaring that policy.
- Federation, provider linkage, SSO, 2FA, passkey, device verification and recovery require separate approved semantics.
