# Bounded contexts

狀態：Current / approved for in-memory vertical slice

Identity & Access、Account 與 Repository 由 `www.a-i.tw Product Team` 擁有，並已核准為本產品第一批 runtime Bounded Context。Account 已實作 organization Membership 與 Team；Repository 已透過 Account published facts 實作 Team-based access。Enterprise governance 仍延後。Repository 僅涵蓋資源擁有、可見性、存取授權與生命週期，不包含 Git 或程式碼功能。

下一批選定語意為 Issue、Label 與 Assignment。它們具有獨立工作生命週期與語言，先以
`Issues` Bounded Context candidate 進行 G1-G3；在 ADR、contract 與 Context Map edge
核准前，不建立 runtime folder 或 manifest。

每個 context 必須記錄 responsibility、owner、in/out scope、aggregates、use cases、ports、contracts、upstream/downstream 與 boundary debt。
