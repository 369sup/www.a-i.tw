# 建立 Bounded Context

使用 `$scaffold-bounded-context`。先完成 Serena Session Guard（僅語意程式任務時啟用，未就緒才 handshake/init），確認 owner、Domain、Subdomain、classification、problem、
first use case 與 source-of-truth models 已核准；缺少任一值就停止並詢問。只能執行 `pnpm generate:context`，
不得手建部分目錄。建立後檢查 Context Map diff 並執行 `pnpm arch:check`。
