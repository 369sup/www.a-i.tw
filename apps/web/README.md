# Web application

## Purpose and scope

`@a-i/web` is the repository's only deployable application. It uses Next.js App Router for delivery, app-local Bounded
Contexts for product behavior, and Fumadocs for public documentation.

## Prerequisites and quick start

- Use the Node.js and pnpm versions declared by the repository.
- Install dependencies from the repository root.

```sh
pnpm install --frozen-lockfile
pnpm --filter @a-i/web dev
```

Open the URL printed by Next.js. Public documentation is served below `/docs`; authenticated product routes are grouped
below `src/app/(console)`.

## Common commands

| Task    | Command from repository root   |
| ------- | ------------------------------ |
| Develop | `pnpm --filter @a-i/web dev`   |
| Test    | `pnpm --filter @a-i/web test`  |
| Check   | `pnpm --filter @a-i/web check` |
| Build   | `pnpm --filter @a-i/web build` |

## Structure and dependency flow

```text
content/docs/       public Fumadocs source
src/app/            Next.js delivery adapters and private delivery helpers
src/composition/    server-only cross-Context composition
src/modules/        Domain Group / Bounded Context runtime
```

```text
UI / Infrastructure -> Application -> Domain
```

Start with the nearest `README.md` for knowledge and `AGENTS.md` for scoped modification rules. Internal canonical
product and architecture knowledge remains under the repository root `docs/`.
