# Custom design-system component rules

- This directory owns project-authored, cross-application design-system components.
- Components must remain generic presentation components and must not encode a bounded context, product workflow, or business rule.
- Custom components may compose primitives from `#ui/*` and shared presentation utilities from `#lib/*`.
- Keep accessibility, semantic HTML, focus behavior, keyboard interaction, and Tailwind design tokens intact.
- Do not import from apps, bounded contexts, routes, server code, data clients, or infrastructure.
- Prefer stable, generic props and composition slots over product-specific names or data-fetching behavior.
