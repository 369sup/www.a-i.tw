# Subdomains

狀態：Current baseline / extensions proposed

Primary subdomain classification is canonical in
[`subdomain-classification.md`](subdomain-classification.md). Identity policy、
Account ownership、Repository governance 與 Template management 分別由其 Context
擁有。

Master Template declares `sub-template` as an internal supporting subdomain in
`context.json.internalSubdomains`; its runtime structure is
the `sub-template` directory under each applicable layer. Internal subdomain is not automatically a new
Bounded Context and may not publish cross-context contracts without a boundary ADR.
