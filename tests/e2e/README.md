# E2E tests

Place product-flow specifications under a bounded-context folder, for example
`identity-access/sign-in.spec.ts`. Add a flow only after its acceptance criteria
and runtime owner are defined.

`master-template/` is the sole exception: it verifies the architecture showcase,
not a product bounded context or a production acceptance criterion.
