# Dependency rules

狀態：Target baseline

依賴方向為 `Presentation → Application → Domain`，`Infrastructure → Application Port → Domain`。Domain 不依賴 Next.js、React、資料庫、Vercel 或外部 SDK；跨 Bounded Context 只能經由公開 contract、port、event 或 published language。

目前 runtime 尚未建立 `apps/web/src/modules` bounded context；此文件是架構基線，不宣稱已有實作證據。
