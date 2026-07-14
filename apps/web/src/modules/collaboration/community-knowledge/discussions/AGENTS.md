# discussions bounded context

- Owner: `www.a-i.tw Product Team`.
- Domain: `Discussions`; subdomain: `discussions` (`core`).
- Keep Published Language deliberately empty until a peer consumer requires it;
  app composition uses the Context composition entrypoint.
- Add a Context Map relationship and a versioned contract before importing a
  contract from another context.
- Discussion Category, Discussion, Comment and accepted Answer invariants are
  owned here. Repository participation enters only through the local Port and
  outbound ACL; do not import Repository or Authorization internals.
