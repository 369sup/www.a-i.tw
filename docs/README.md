# 文件地圖：設計到生產

這套文件把產品從探索、需求、設計、架構、交付、品質、營運到生產維護串成單一導航。每份文件只擁有一種語意：context map 講 ownership，ADR 講決策，contract 講介面，runbook 講操作。

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
├── 01-discovery/       # 問題、使用者、研究與假設
├── 02-product/         # vision、PRD、roadmap、驗收條件
├── 03-design/          # UX、UI、內容、accessibility
├── 04-architecture/    # 模組、邊界、資料流、技術決策
├── 05-delivery/        # work orders、release plan、migration
├── 06-quality/         # 測試策略、品質門檻、驗證證據
├── 07-operations/      # observability、incident、capacity
├── 08-production/      # deployment、rollback、release notes
├── adr/                # Architecture Decision Records
├── contracts/          # application/API/event contracts
├── maps/               # strategic maps and ownership maps
├── runbooks/            # executable operational procedures
└── status/              # current, dated status and closure gates
```

## 使用順序

1. 從 [`ai-index.md`](ai-index.md) 路由問題，再讀對應 owner 文件。
2. 新功能通常依序經過 discovery → product → design → architecture → delivery → quality → production。
3. 跨 context 或 public contract 變更必須補 ADR、contract 與驗證證據。
4. 不以文件宣稱尚未存在的 runtime；狀態文件要標註日期與證據。
