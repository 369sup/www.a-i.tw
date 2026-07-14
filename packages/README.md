# Technical packages

## Purpose and scope

`packages/` contains reusable technology with no product business owner. Product Domain, Application, Published Language, policies, and adapters remain under `apps/web/src/modules/<domain-group>/<bounded-context>`.

The package set below is closed and machine-enforced by `pnpm arch:topology`; a new package is not permitted merely to avoid choosing a product owner.

## Package map

| Workspace package        | Responsibility                                     | Public entry points                                    |
| ------------------------ | -------------------------------------------------- | ------------------------------------------------------ |
| `@a-i/shadcn`            | reusable shadcn primitives and presentation tokens | `.`, `./ui/*`, `./custom/*`, `./lib/*`, `./hooks/*`    |
| `@a-i/testing-kit`       | context-neutral test utilities                     | `.`                                                    |
| `@a-i/eslint-config`     | lint policy                                        | `./base`, `./next`                                     |
| `@a-i/typescript-config` | TypeScript policy                                  | `./base.json`, `./nextjs.json`, `./react-library.json` |

Workspace package names use the `@a-i/<capability>` form. Consumers import only declared `package.json` exports, never another package's internal files.

## Commands

```sh
pnpm --filter @a-i/shadcn test
pnpm --filter @a-i/shadcn check
pnpm arch:workspaces
pnpm arch:exports
```

Replace `@a-i/shadcn` with the target workspace package while iterating, then run the workspace and export checks when dependency or public-entry behavior changes. See [repository topology](../docs/architecture/repository-topology.md).
