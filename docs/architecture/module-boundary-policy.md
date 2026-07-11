# Module boundary policy

狀態：Accepted baseline

- A module maps to one approved Bounded Context, not a UI route or data table.
- Only its application facade, versioned contracts and composition factory may be exported.
- Cross-context imports of domain, application, infrastructure or persistence internals are forbidden.
- A Context may share only an explicitly approved Shared Kernel; generic utilities cannot hide domain ownership.

The generated layout is specified by [`module-template.md`](module-template.md).
