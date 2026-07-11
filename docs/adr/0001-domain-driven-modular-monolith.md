# ADR 0001: Domain-Driven Modular Monolith

## 狀態

Accepted — 初始化基線

## 決策

以 bounded context 組織單一 deployable application，並在模組內採 Hexagonal Architecture。這讓 domain invariants 可測試、外部依賴可替換，並保留未來拆分服務的邊界。

## 代價

需要明確 contract、adapter 與 dependency checks；不能用方便的跨層 import 取代 ownership 設計。
