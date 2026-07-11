# Domain context map

目前專案尚處於初始化階段，尚未宣告具體 bounded context。未來每個 context 必須在此列出：目的、owner language、資料 owner、公開 contract、上游/下游與 anti-corruption layer。

## 初始策略

- `Product`：產品問題、需求與驗收語意。
- `Identity`：使用者、登入與授權語意（尚未實作）。
- `Experience`：Next.js route、shadcn UI 與 view model（presentation owner）。
- `Platform`：部署、可觀測性與交付工具（operations owner）。

以上是規劃中的 strategic map，不是 runtime 實作證明；新增 context 前必須補 ADR 與 application contract。
