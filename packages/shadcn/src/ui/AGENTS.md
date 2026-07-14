# shadcn UI primitive rules

- This directory owns source-controlled shadcn primitives installed by the shadcn CLI.
- Components here may be synchronized with the CLI or customized to fit the shared design tokens.
- Keep primitives generic, accessible, keyboard-friendly, and free of product or bounded-context language.
- Imports may use package dependencies and package-local `#lib/*` utilities. Do not import from `custom`, an app, or a bounded context.
- Preserve the generated component contract unless a deliberate design-system change requires an explicit review.
- Do not add data fetching, navigation, route handlers, domain rules, or product-specific callbacks.
