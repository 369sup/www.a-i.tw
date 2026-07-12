# GitHub product surface URL inventory

Canonical route inventory: `docs/product/github-product-url-inventory.md`.
Official Docs URL coverage is separate at `docs/product/github-official-url-inventory.md`; do not conflate `github.com` product routes with `docs.github.com` evidence routes.

Seed product routes supplied by the user include Profile tabs (`repositories`, `stars`, `achievements`), personal settings (`profile`, `admin`, `appearance`), authentication (`login`, `logout`), cross-resource projections (`notifications`, `issues`, `discussions`), personal operating home (`dashboard`) and discovery (`explore`).

Before implementing `apps/web/src/app`, each route must record access state, surface type, target entity, actor/scope effect, projection or command, side-effect risk, official evidence, local owner candidate and local disposition. Product routes are adopted only after semantic ownership and contracts are approved. Never execute logout or destructive settings commands while crawling.