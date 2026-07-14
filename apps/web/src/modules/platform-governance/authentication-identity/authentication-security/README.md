# authentication-security

- Domain: Identity and Access
- Subdomain: authentication-security (supporting)
- Owner: www.a-i.tw Product Team

Before adding behavior, document the aggregate boundary, first use case, input
and output contract, outbound ports, and Context Map relationships.

## Approved Principal and Session foundation

Implementation is limited to the existing Login, Session resolution and Logout use cases:

- `PrincipalId`, `PrincipalKind` and `PrincipalStatus` own attribution identity and authentication eligibility.
- `AuthenticationMethod` records the verified mechanism; the current mock adapter represents password verification.
- `SessionId` is Domain identity and is never the browser token.
- `SessionStatus` and `SessionExpiry` own revocation and the existing eight-hour Session deadline.
- Browser tokens, cookies and Next.js options remain Application/Adapter concerns.
- Internal Value Objects never cross `contracts/v1`; Published Language remains primitive and minimal.

Federation, provider subject linkage, SSO, 2FA, passkey, device verification and durable providers remain unapproved
runtime work. Do not create empty artifacts or a new Context for them.
