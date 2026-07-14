# Web source ownership

```text
src/
├── app/                 # Next.js delivery and route classification
├── modules/             # Domain Group / Bounded Context runtime
└── composition/         # concrete server-side wiring
```

Each subtree owns one responsibility. Context inbound adapters own product UI and delivery mapping; routes perform only
final named composition and invoke Application capabilities. Only `composition/` wires concrete outbound adapters.
