## 摘要

## 架構影響

- [ ] 不涉及邊界或資料所有權
- [ ] 已更新必要的 ADR / context map / contract
- [ ] Domain / Application / Infrastructure 依賴方向已檢查

## 驗證

- [ ] `pnpm check`
- [ ] `pnpm build`
- [ ] `pnpm task:verify:all`

## 風險與回滾

## Semantic development gates

- [ ] G0: Serena handshake、project rules、worktree 與 runtime evidence 已確認
- [ ] G1: problem、actor、owner、language、Aggregate、use case 與 invariants 已核准
- [ ] G2: canonical product／strategy／domain／contract／data／ADR 文件已更新
- [ ] G3: Context、path、public contract、Ports、Adapters 與 composition owner 已確認
- [ ] G4: 若需 scaffold，只使用 repository generator；不適用時已說明
- [ ] G5: Domain → Application／Ports → Contracts → Infrastructure 已 inside-out 完成
- [ ] G6: concrete adapters 只由 server composition root 接線；inbound adapter 無 business rule
- [ ] G7: diagnostics、check、docs、architecture、build、Semgrep 與 acceptance evidence 已附上
