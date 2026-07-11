# Context boundary dependency audit

狀態：Current / app-local runtime graph verified

`apps/web/src/modules` 包含 Identity & Access、Account、Repository 與 Master Template。
跨 Context import checker 僅允許 declared relationship 指向 provider 的
`src/contracts/`；dependency-cruiser 驗證 layer direction、禁止 internal imports 與
cycles；Semgrep 驗證 Domain framework independence；architecture fixtures 驗證負向案例。

Master Template 另宣告內部 `sub-template` supporting subdomain，位於
`src/subdomains/sub-template`，並由同一 Context composition 組裝。最近完整驗證日期：
2026-07-12。
