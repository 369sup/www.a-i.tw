# Identity & Access 策略

狀態：Proposed
Context 候選：`identity-access`
Subdomain：Generic authentication + Supporting authorization

## 任務

確認行為者身分，維護其可用 session，並在明確範圍內判定請求是否可執行。這個 context 擁有「誰可作為 Principal 行動」與「為何該操作被允許」的語意；它不擁有任何協作資源。

## 擁有的模型與不變條件

| 模型                    | 說明與不變條件                                                             |
| ----------------------- | -------------------------------------------------------------------------- |
| Principal               | 穩定、不可重用的主體識別；人類、服務或自動化 actor 可採相同抽象。          |
| Authentication Identity | Principal 與驗證方法／外部提供者的連結；一個 Principal 可有多個 identity。 |
| Session                 | 有效期限、撤銷與驗證狀態皆可審計；session 不承載 Account profile。         |
| Access Grant            | 對 Principal、scope、capability 與效期的明確授與；拒絕優先且預設拒絕。     |
| Access Decision         | 針對一項 capability 的可解釋 allow/deny 結果，須能追溯授與或政策來源。     |

## 邊界與公開語言

- 從 Account 取得 membership facts，從 Repository 取得資源 scope 與協作政策；不直接讀取其 internal storage。
- 向其他 context 發佈最小且不可變的 `PrincipalId`、驗證狀態、capability decision 與必要的 subject claims。不得發佈 credential、session secret 或 provider token。
- Account 與 Repository 不可自行實作登入、token 驗證或角色字串比對；它們透過 authorization port 請求 decision。

## 首批 use case 候選

1. 註冊／連結／解除驗證身分。
2. 建立、更新與撤銷 session。
3. 對 `account:*` 或 `repository:*` scope 評估 capability。
4. 授與、到期或撤銷可審計的 access grant。

## 延後事項

MFA、passkey、SCIM、企業 SSO、delegation、break-glass access 與完整 audit export 均不屬於首切片；它們必須以既有 Principal、grant 與 decision contract 演進。
