# account bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Account Management`; subdomain: `account` (`core`).
- Keep the package's public exports deliberately empty until an approved use
  case or published language requires one.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.
- Profile display name is presentation, never Account identity or handle. Profile bio is trimmed and limited to 160
  characters. Profile website is optional and must be an absolute HTTP(S) URL; this protocol restriction is a local
  safety invariant, not an undocumented GitHub limit.
- Persistence seeds and mappers must construct Account/Profile values through Domain factories. Contracts keep
  primitive Published Language and must not export internal branded Value Objects.
- Membership Invitation expiry is seven days from issue. Only a pending invitation may be accepted, expired or
  cancelled; acceptance is restricted to the invited Principal and cannot occur at or after expiry.
- Membership role/status and Invitation status are Account-owned closed vocabularies. Do not reuse Principal, Team or
  Repository lifecycle/role values.
- Team identity is distinct from its canonical name. Team member collections contain unique Account-owned
  `MembershipId` references; Application orchestration must require an active Organization Membership.
- Do not add Team visibility, maintainer or hierarchy semantics without an approved use case and canonical evidence.
