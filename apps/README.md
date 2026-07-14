# Applications

## Purpose and scope

`apps/` contains deployable product applications. [`web`](web/) is the only current deployable app; reusable context-neutral technology belongs in `packages/`.

## Structure

```text
apps/
└── web/
    ├── content/docs/       # public Fumadocs content
    └── src/
        ├── app/            # Next.js delivery
        ├── modules/        # Domain Groups and Bounded Contexts
        ├── presentation/   # cross-Context inbound experiences
        └── server/composition/ # concrete server-only wiring
```

## Entry points and commands

| Need              | Command                        |
| ----------------- | ------------------------------ |
| Local development | `pnpm dev`                     |
| Unit tests        | `pnpm --filter @a-i/web test`  |
| App checks        | `pnpm --filter @a-i/web check` |
| Production build  | `pnpm --filter @a-i/web build` |
| Start built app   | `pnpm --filter @a-i/web start` |

Environment configuration is runtime-specific and must remain outside versioned secret values. Add or change an environment requirement only with an explicit owner, validation, and matching operational documentation.

## Dependency model

```text
Next.js delivery / Infrastructure -> Application -> Domain
```

Continue with [`web/AGENTS.md`](web/AGENTS.md) and the closest module instructions before changing runtime behavior.
