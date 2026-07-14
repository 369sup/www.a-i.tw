# Domains

狀態：Accepted baseline / extensions proposed

專案採 Domain-Driven Modular Monolith。Identity & Access、Account 與 Repository 已是
app-local runtime Context，具備可驗證的 in-memory baseline。Enterprise governance、
production authentication、durable persistence 與 Repository transfer 等仍是 Proposed
extension。不得從 route、資料表或 UI 推導新 Domain；新增 Domain 或 internal subdomain
前需建立 owner、classification、manifest 與 Context Map 證據。
