# Bounded contexts

狀態：Current / approved for in-memory vertical slice

Runtime ownership is declared by the 20 manifests mirrored in `context-map.json`; the 37 physical descriptors are a
portfolio taxonomy, not 37 implemented capabilities. User、Organization、Enterprise、Profile and Organization
Participation are separate Contexts. Membership／Team facts come from `organization-participation`; Account directory
contracts publish Account identity and eligibility only.

Issue、Label 與 Assignment由 `work-tracking` 擁有。Planned descriptors不得進入 Context Map、被 composition
組裝或包含 runtime directories；每個新 slice 仍須先通過 owner、first use case 與 source-of-truth gates。

每個 context 必須記錄 responsibility、owner、in/out scope、aggregates、use cases、ports、contracts、upstream/downstream 與 boundary debt。
