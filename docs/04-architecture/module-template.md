# 模組模板

```text
modules/<context>/
├── domain/          # entity、value object、domain service、policy
├── application/     # use case、command/query、port、DTO
├── infrastructure/  # repository、external adapter、mapper
├── ui/              # route、component、view model
└── README.md        # owner、boundary、公開語言、驗證方式
```

只有 application contract、port 或 published language 可以跨模組；禁止 UI 直接讀另一模組的 infrastructure 或 domain internals。
