# 模組模板

```text
modules/<context>/
├── context.json       # machine-verifiable owner and subdomain declaration
├── src/
│   ├── domain/        # entity、value object、domain service、policy
│   ├── application/   # use case、port、DTO
│   ├── contracts/     # versioned published language only
│   ├── infrastructure/# repository、external adapter、mapper
│   ├── public.ts      # application facade export
│   └── composition.ts # module factory export
├── tests/             # colocated Domain/Application tests begin here
└── README.md          # owner、boundary、公開語言、驗證方式
```

只有 `@a-i/<context>/contracts` 可以跨模組；禁止 UI、Context 或 adapter 直接讀另一
Context 的 application、composition、domain 或 infrastructure internals。使用
`pnpm generate:context` 建立此結構，避免複製未宣告 owner 的範例。
