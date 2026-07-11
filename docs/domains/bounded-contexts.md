# Bounded contexts

狀態：Current / approved for in-memory vertical slice

Identity & Access、Account 與 Repository 由 `www.a-i.tw Product Team` 擁有，並已核准為本產品第一批 runtime Bounded Context。Account 第一階段包含 personal 與 organization 兩個 kind；enterprise governance 延後。第一階段只交付可操作的 in-memory 產品垂直切片，Repository 僅涵蓋資源擁有、可見性、存取授權與生命週期，不包含 Git 或程式碼功能。

每個 context 必須記錄 responsibility、owner、in/out scope、aggregates、use cases、ports、contracts、upstream/downstream 與 boundary debt。
