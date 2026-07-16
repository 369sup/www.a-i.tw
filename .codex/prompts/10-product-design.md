# Product Design：先設計、確認後交付

請使用已安裝的 `@Product Design` 處理：`<目標頁面、使用者流程、URL、截圖或設計 brief>`。

## 第一階段：唯讀設計

此階段不得修改 repository、產生實作 patch、安裝套件、啟動部署或變更外部資料。

1. 確認 Git root 與 `git status --short`，保留所有既有未提交變更。
2. 依 Product Design plugin 的 `user-context` preflight 載入目前任務真正需要的已保存來源，不得預載所有 reference。
3. 讀取根目錄與目標路徑的 `AGENTS.md`，再依問題只讀最小必要 owner：
   - 資訊架構才讀 `docs/experience/information-architecture.md`
   - accessibility 才讀 `docs/experience/accessibility.md`
   - content 或產品語言才讀 `docs/experience/content-guidelines.md`
   - component/token 決策才讀 `packages/shadcn/AGENTS.md`
   - 完全 context-neutral 的跨 app 元件候選才讀 `packages/shadcn/src/custom/AGENTS.md`
4. 確認目標畫面的 audience、任務、owning Bounded Context、既有產品語言、資料狀態與不可變限制。不得從 route、mockup 或鄰近 UI 推測 Domain ownership。
5. 檢查相似 flow、screen、component 與既有 token；從使用者提供的 brief、URL、截圖、本地頁面或明確指定的設計來源蒐集證據。Figma 是可選來源；沒有 Figma 時不得阻塞可由其他輸入完成的工作。
6. 選擇最窄的 Product Design workflow：
   - 單純 audit、critique 或 review：直接使用 `$audit`，依 plugin 規則以本次擷取的 screenshot 為證據；除非使用者同時要求 redesign，否則不強制產生三個方向。
   - 使用者問題與 UX friction 研究：只在確實需要外部使用者證據時使用 `$research`。
   - 新設計、redesign 或視覺探索：先使用 `$get-context` 播放最小 brief，再使用 `$ideate` 產生恰好三個獨立、真正不同的視覺方案。
7. 視覺探索的每個方案必須說明核心概念、layout/component anatomy、主要互動、既有 shadcn primitive/token 重用、限制與風險；給出證據支持的建議後等待使用者選擇。未選定視覺方案前不得進入實作。

## 第二階段：實作 handoff

使用者選定方向後，仍不在此流程直接修改 repository。輸出可交給
[`02-implement.md`](02-implement.md) 的完整 handoff：

- owning Domain Group、Area、Bounded Context 與目標 surface
- 選定方向及不採用其他方向的理由
- 頁面結構、component anatomy、必要內容與產品語言
- default、loading、empty、error、success、disabled 等適用狀態
- keyboard、focus、label、error announcement、contrast 等 accessibility 驗收條件
- desktop、tablet、mobile 的 responsive 驗收條件
- 優先重用的 `@a-i/shadcn` primitives；只有完全 context-neutral 時才建議 `@a-i/shadcn/custom`
- owning Context inbound UI、App Router composition 與 server/client boundary 的預期責任
- 必要的 unit/RTL/Playwright 或視覺驗證情境
- 未確認的資料、風險與實作前 gate

Mockup、prototype 與設計建議只能定義 presentation intent；不得覆蓋 Domain invariants、Context ownership、
public contract、authorization、正式產品語言或 repository architecture。後續實作必須重新讀取目標路徑規則，
以現有 runtime、manifest、test 與 canonical owner 為準。

## 輸出順序

1. 結論與目前使用的最窄 workflow
2. 證據與 audit/research 結果（適用時）
3. 三個視覺方向與建議（使用 `$ideate` 時）
4. 取捨、風險與待驗證事項
5. 使用者選定方向後才輸出實作 handoff
