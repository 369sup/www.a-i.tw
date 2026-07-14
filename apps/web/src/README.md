# Web source ownership

```text
src/
├── app/                 # Next.js delivery and route classification
├── modules/             # Domain Group / Bounded Context runtime
├── presentation/        # cross-Context inbound presentation
└── server/composition/  # concrete server-side wiring
```

Each subtree owns one responsibility. Routes and presentation invoke Application capabilities; only server composition
wires concrete outbound adapters.
