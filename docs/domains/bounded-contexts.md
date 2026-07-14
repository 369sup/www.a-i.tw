# Bounded contexts

狀態：Current / approved for in-memory vertical slice

Identity & Access、Account、Authorization & Policy 與 Repository 由 `www.a-i.tw Product Team` 擁有，並已核准為 runtime Bounded Context。Account 發布 Membership 與 Team facts；Authorization & Policy 擁有 Repository Access Grant／Role／Permission／decision；Repository 只透過 consumer Port／ACL 使用決策，核心仍只擁有資源 identity、Account owner、profile、visibility、state、feature configuration 與 lifecycle。

Issue、Label 與 Assignment 已由 `Issues` Bounded Context 擁有並具有 in-memory runtime；
其 ADR、contract 與 Context Map edge
核准前，不建立 runtime folder 或 manifest。

每個 context 必須記錄 responsibility、owner、in/out scope、aggregates、use cases、ports、contracts、upstream/downstream 與 boundary debt。
