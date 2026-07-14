# Repository 文件地圖

## 目的與範圍

`docs/` 是 repository 內部 canonical knowledge base，服務開發者、維運者與 AI agent。公開網站內容位於 `apps/web/content/docs/`；兩者不可共用 source tree，也不可用文件宣稱尚未存在的 runtime。

下列直接子目錄與 root 文件構成封閉 topology，並由 `pnpm arch:topology` 機械驗證；新增、刪除或改名必須同步更新 owner、checker、正反向測試與導航。

## 文件責任

| 文件類型                  | 擁有內容                                 | 不擁有內容            |
| ------------------------- | ---------------------------------------- | --------------------- |
| Context map / domain docs | language、ownership、relationship        | implementation detail |
| ADR                       | decision、reason、trade-off、consequence | 完整操作手冊          |
| Contract                  | HTTP、event、port、schema compatibility  | 內部演算法            |
| Runbook                   | 可執行操作、驗證、rollback               | product semantics     |
| Evidence / status         | 有日期的結果與 closure state             | 永久規範              |
| README                    | 目錄 topology、入口與使用順序            | 重複 canonical truth  |

## 結構樹

```text
apps/
└── web/                # deployable Next.js + Fumadocs application
packages/
├── shadcn/            # reusable shadcn primitives and presentation tokens
├── testing-kit/       # context-neutral test utilities
├── eslint-config/     # shared lint config
└── typescript-config/ # shared TS config
scripts/
├── architecture/      # architecture boundary and package-workspace checks
└── validation/        # documentation, release, environment, and task gates
docs/
├── product/           # 長期產品模型、能力與 roadmap
├── strategy/          # 領域願景、能力地圖與 build/buy/integrate
├── domains/           # 語言、邊界、context map 與 machine map
├── application/       # use case、command/query 與 authorization policy
├── architecture/      # 系統結構、依賴規則與技術約束
├── decisions/         # Architecture Decision Records
├── contracts/         # HTTP、event、port 與 schema contract
├── data/              # data ownership、transaction 與 consistency
├── governance/        # ownership、naming、review 與 fitness functions
├── experience/        # UX、內容與 accessibility
├── engineering/       # 開發、測試、遷移與 release 方法
├── operations/        # 可觀測性、營運與 release 管理
├── runbooks/          # 可執行的逐步操作程序
├── initiatives/       # 有生命週期的工作與研究紀錄
├── evidence/          # 驗證結果，不放規範
├── status/            # 有日期的現況快照與 closure gate
├── roadmap/           # Context 與 modularization 的演進順序
└── templates/         # 文件模板
```

## 使用與維護流程

1. 從 [`ai-index.md`](ai-index.md) 路由問題，只讀對應 owner 文件。
2. 穩定知識依長期 ownership 歸檔；有開始與結束的工作放在 `initiatives/`。
3. 使用清楚且穩定的 kebab-case 檔名；狀態與 evidence 檔案包含日期。
4. 明確標示 Current、Proposed、Transitional、Deprecated 或 Historical。
5. 跨 Context 或 public contract 變更同步更新 owner、ADR／contract 與驗證證據。
6. 路徑或 ownership 改變時更新導航，不複製 owner 內容。

## 驗證與詳細入口

- 文件修改：`pnpm docs:check`
- 文件 topology 或架構邊界修改：另執行 `pnpm arch:check`
- 完整 canonical 清冊：[`architecture-document-catalog.md`](architecture-document-catalog.md)
- 架構標準：[`architecture/ddd-hexagonal-standard.md`](architecture/ddd-hexagonal-standard.md)
- Context relationships：[`domains/context-map.md`](domains/context-map.md)
