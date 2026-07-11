# Domain context map

目前專案尚處於初始化階段，尚未宣告 runtime bounded context。未來每個 context 必須在此列出：目的、owner language、資料 owner、公開 contract、上游/下游與 anti-corruption layer。

## 初始策略

- `Product`：產品問題、需求與驗收語意。
- `Identity & Access`：Principal、驗證、session、access decision 與 grant 語意（尚未實作）。
- `Account`：個人／組織帳戶、命名空間與成員關係語意（尚未實作）。
- `Repository`：受控工作空間、可見性與協作政策語意（尚未實作）。
- `Experience`：Next.js route、shadcn UI 與 view model（presentation owner）。
- `Platform`：部署、可觀測性與交付工具（operations owner）。

### 策略關係

```text
Account ──publishes membership facts──> Identity & Access
Account ──owns namespace for──────────> Repository
Repository ──publishes scope + policy─> Identity & Access
Identity & Access ──returns decision──> Experience / application use cases
```

以上是規劃中的 strategic map，不是 runtime 實作證明；新增 context 前必須補 ADR、application contract 與 owner。詳細領域策略見 [`../domains/README.md`](../domains/README.md)。

機器可驗證的 runtime Context Map 位於 [`context-map.json`](context-map.json)。它目前為空，
直到第一個已核准的 bounded context 透過 generator 建立為止。
