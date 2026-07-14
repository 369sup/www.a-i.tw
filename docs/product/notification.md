# Subscription and Notification

狀態：Current / separate Subscriptions and Notifications Bounded Contexts; Inbox unsubscribe slice approved

```text
Repository Watch / Conversation Subscription
                    ↓ recipient resolution
             Matching Activity Event
                    ↓
               Notification
                    ↓
         Read State / Inbox State / Saved
```

GitHub 的產品語意要求兩個獨立 owner：

- `subscriptions` 擁有持續的接收關係與偏好，包括 Repository Watch、Conversation Subscription、
  unsubscribe 與 recipient resolution。
- `notifications` 擁有某次匹配活動對 recipient 產生的 update，以及 Inbox triage、retention 與注意力狀態。

`Watch` 是 Repository-level subscription；conversation subscription 可以因 participation、explicit subscribe 或
mention 等原因形成。`Notification` 是 subscription 或其他 supported reason 匹配活動後產生的 recipient update，
不是 Subscription 本身。

## Approved Inbox model

Inbox triage 是正交維度，不得壓成單一互斥 enum：

```text
Notification
├── readState: unread | read
├── inboxState: active | done
└── saved: boolean
```

- `Read`／`Unread` 只改變閱讀狀態。
- `Done` 將 Notification 移出 active Inbox，但不改變 Subscription。
- `Saved` 是 retention flag；saved Notification 無限期保留。
- 未 saved 的 Notification 保留五個月；超過五個月的 saved Notification 被 unsave 後會在一天內離開 Inbox。
- `Unsubscribe` 同時移除目前 Notification 並停止 conversation future updates，直到新的 mention 等官方重新訂閱原因發生。

## First cross-Context use case

> Authenticated recipient selects Unsubscribe on an owned Notification. Notifications validates ownership, requests
> Subscriptions to deactivate the matching Conversation Subscription, then marks the Notification done. The route invokes
> one Notifications Application use case and does not coordinate two Context writes directly.

### Invariants

1. 只有 Notification recipient 可以 triage 或 unsubscribe 該 Notification。
2. `Done` 與 `Unsubscribe` 是不同 command；Done 不得產生 Subscription side effect。
3. Unsubscribe 必須使用 Notification-owned `subjectRef`，不得信任 route 傳入另一個 subject。
4. Unsubscribe 與 mark-done 必須 idempotent。
5. Subscription failure 時不得先將 Notification 標記 done；操作 fail closed。
6. Notifications 只能透過 consumer-owned Port、ACL 與 Subscriptions `contracts/v1/public.ts` 協作。

## Out of scope

- Email、mobile、scheduled reminder 與 delivery provider。
- Pull Request、review、Actions、release 與 security alert 等 Code-oriented notification types。
- Durable outbox、retry scheduler 與 five-month cleanup job。
- Mention-driven automatic re-subscription；本切片只保留未來 policy extension point。

官方來源：

- <https://docs.github.com/en/subscriptions-and-notifications/concepts/about-notifications>
- <https://docs.github.com/en/subscriptions-and-notifications/get-started/configuring-notifications>
- <https://docs.github.com/en/subscriptions-and-notifications/how-tos/viewing-and-triaging-notifications/managing-notifications-from-your-inbox>
- <https://docs.github.com/en/subscriptions-and-notifications/how-tos/managing-subscriptions-for-activity-on-github/managing-your-subscriptions>
- <https://docs.github.com/en/rest/activity/watching>
