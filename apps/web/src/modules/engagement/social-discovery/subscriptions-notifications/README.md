# Notifications

- Domain: Notifications
- Subdomain: notifications (supporting)
- Owner: www.a-i.tw Product Team
- First cross-Context use case: unsubscribe from an owned Inbox Notification.

Owns `Notification`, recipient attention, `readState`, `inboxState`, `saved` and retention decisions. It does not own
Repository Watch or Conversation Subscription truth. Cross-Context subscription changes use the Notifications-owned
`ConversationSubscriptionManagement` Port and ACL against Subscriptions `contracts/v1/public.ts`.

# Subscriptions: subscriptions

Strategic subdomain `subscriptions` (`supporting`); owner www.a-i.tw Product Team.
