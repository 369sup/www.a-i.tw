# Technical packages

`packages/` contains reusable technical capabilities that have no product business owner:

| Package             | Responsibility                                     |
| ------------------- | -------------------------------------------------- |
| `ui`                | reusable shadcn primitives and presentation tokens |
| `testing-kit`       | context-neutral test utilities                     |
| `eslint-config`     | lint policy                                        |
| `typescript-config` | TypeScript compiler policy                         |

Domain, Application, published Contracts and Infrastructure adapters stay inside their owning Bounded Context under `apps/web/src/modules/<context>`.
See [repository topology](../docs/architecture/repository-topology.md).
