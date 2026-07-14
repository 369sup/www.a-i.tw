# ADR 0002: App-local Bounded Context scaffold

## 狀態

Superseded — 2026-07-12

## 決策

本 ADR 原決策以 `modules/<bounded-context>` 作為獨立 pnpm workspace。實際 application
composition、module template 與既有 runtime 都採 app-local Context，造成 generator 與
fitness function 不一致。此決策由 ADR 0004 取代。

保留的原則是每個 Context 必須有 `context.json`，並與
`docs/domains/context-map.json` 完全相同；其他 Context 只能消費 published contracts。

## 後果

- 不再使用獨立 workspace package 表達 app 內 Context 邊界。
- 詳細替代方案與後果見 ADR 0004。
