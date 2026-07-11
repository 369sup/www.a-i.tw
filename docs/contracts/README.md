# Contracts

這裡保存 application/API/event contract 與相容性政策。每個 contract 應標註 owner、版本、輸入輸出、錯誤語意、資料分類、相容性規則與驗證測試。

Identity & Access、Account 與 Repository 已發布 app-local V1 facts，供已登錄的
downstream Context 使用。它們是 in-process Published Language，不是外部 HTTP API。

Template 中的 type 僅示範 application port 與 result；在 owner、版本與資料分類核准前，
它們不是 public contract。

Current contract flow is Identity & Access `PrincipalRefV1` → Account／Repository,
Account eligibility and membership facts → Repository, then Repository decision → Experience.
Raw credentials、session secret、internal Aggregate 與 grant graph 禁止出現在 contract。
