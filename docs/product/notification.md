# Notification

狀態：Current in-memory Inbox triage vertical slice

```text
Subscription × Matching Activity Event × Delivery Preference
                              ↓
                         Notification
                              ↓
                     Inbox Item / Channel
```

- Subscription 是持續關係；Notification 是某次匹配事件的結果。
- Watch 是 Repository-level subscription；Subscribe 是 conversation-level subscription。
- Read／Unread、Saved、Done 是 inbox triage 維度；Done 不等於 Unsubscribe。
- Saved notification 可長期保留；Done notification 目前保留五個月。
- Enterprise policy 可以限制 delivery，但不因此擁有個人 Subscription。

Notification 是事件衍生的注意力投影，不是 Repository 子物件，也不是 Audit Event。它需要獨立
owner、subscription model、delivery policy、retention 與 inbox state；本 repository 尚未核准。

官方來源：

- <https://docs.github.com/en/subscriptions-and-notifications/how-tos/viewing-and-triaging-notifications/managing-notifications-from-your-inbox>
- <https://docs.github.com/en/subscriptions-and-notifications/how-tos/managing-subscriptions-for-activity-on-github/managing-your-subscriptions>
