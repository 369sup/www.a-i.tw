# Bounded contexts

狀態：Current / approved for in-memory vertical slice

Identity & Access、Account 與 Repository 由 `www.a-i.tw Product Team` 擁有，並已核准為本產品第一批 runtime Bounded Context。Account 下一個核准切片是在既有 personal／organization kind 上加入 organization Membership invitation、acceptance 與 removal；Team 與 enterprise governance 延後。Repository 僅涵蓋資源擁有、可見性、存取授權與生命週期，不包含 Git 或程式碼功能。

每個 context 必須記錄 responsibility、owner、in/out scope、aggregates、use cases、ports、contracts、upstream/downstream 與 boundary debt。
