# Repository 文件地圖

這是 repository 的內部 canonical knowledge base，服務開發者、維運者與 AI agent；公開網站文件位於 `apps/web/content/docs/`，兩者不可共用 source tree。每份文件只擁有一種語意：context map 講 ownership，ADR 講決策，contract 講介面，runbook 講操作。

## 結構樹

```text
apps/
└── web/                # deployable Next.js + Fumadocs application
packages/
├── ui/                 # shared shadcn primitives
├── eslint-config/      # shared lint config
└── typescript-config/  # shared TS config
scripts/                # repository checks and release gates
docs/
├── product/             # 長期產品模型、能力與 roadmap
├── strategy/            # 領域願景、能力地圖與 build/buy/integrate
├── domains/             # 語言、邊界、context map 與 machine map
├── application/         # use case、command/query 與 authorization policy
├── architecture/        # 系統結構、依賴規則與技術約束
├── decisions/           # Architecture Decision Records
├── contracts/           # HTTP、event、port 與 schema contract
├── data/                # data ownership、transaction、consistency 與 read model
├── governance/          # ownership、naming、review 與 fitness functions
├── experience/          # UX、內容與 accessibility
├── engineering/         # 開發、測試、遷移與 release 方法
├── operations/          # 可觀測性、營運與 release 管理
├── runbooks/            # 可執行的逐步操作程序
├── initiatives/         # 有生命週期的工作與研究紀錄
├── evidence/            # 驗證結果，不放規範
├── status/              # 有日期的現況快照與 closure gate
├── roadmap/             # Context 與 modularization 的演進順序
└── templates/           # 可重用文件模板
```

## 使用順序

1. 從 [`ai-index.md`](ai-index.md) 路由問題，再讀對應 owner 文件。
2. 穩定知識依長期 ownership 歸檔；有開始與結束的工作放在 `initiatives/`。
3. 跨 context 或 public contract 變更必須補 ADR、contract 與驗證證據。
4. 不以文件宣稱尚未存在的 runtime；狀態文件要標註日期與證據。
5. 完整戰略文件的索引與 canonical 位置見 [`architecture-document-catalog.md`](architecture-document-catalog.md)。
