# Strategic principles

狀態：Current / architecture baseline

- 以業務能力與語言切分，不以 UI、資料表或 SDK 切分。
- Principal、Account、Repository 不可折疊成泛稱 `User`。
- Account kind 必須明確為 personal、organization 或 enterprise；enterprise 治理 organization，不可被當成 Principal、Repository Role 或隱含的全域管理員。
- 一項概念只有一個 Context data owner；其他 Context 只消費 versioned facts。
- Repository 只建模非 code 的資源容器語意；code-related capabilities 需獨立決策。
- Modular Monolith 中仍以 Published Language、ACL 與 application boundary 隔離 Context。
- GitHub 是產品語意的研究來源；任何差異化規則都必須由本產品 owner 核准後才成為規格。
- `UI / Infrastructure → Application → Domain` 是不可倒置的依賴方向。
