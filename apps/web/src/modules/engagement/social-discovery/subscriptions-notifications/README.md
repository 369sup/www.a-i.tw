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

<!-- BEGIN:context-governance -->

## Complete semantic governance

### Product meaning and scope

Represent recipient attention and Inbox triage independently of source resource truth.

This directory is the declared local ownership boundary for `ActivitySubscription`, `Notification`, `NotificationTriage`. Its physical presence proves portfolio placement only; runtime completeness is determined separately by `lifecycle`, `runtimeEvidence`, implemented use cases and verification.

### Lifecycle and principal use case

- Lifecycle: `approved`.
- Runtime evidence: `current`.
- Principal use case: Deliver assignment, participation, and watching notifications to a recipient Inbox and triage them.

### Source of truth

- `ActivitySubscription`
- `Notification`
- `NotificationTriage`

### Language and invariants

Ubiquitous language:

- Watch Subscription
- Conversation Subscription
- Notification Thread
- Notification Reason
- Inbox State

Required invariants:

- Subscription is recipient intent; Notification is a derived recipient-specific update.
- Read, saved and done state cannot mutate the source conversation.

### Collaboration

- No cross-Context runtime relationship is declared in this manifest; do not infer one from navigation, UI, route or storage proximity.

Navigation hierarchy is not a runtime dependency. Only versioned Published Language and consumer-owned Ports may cross a Context boundary.

### Explicit exclusions

- source resource lifecycle
- Follow or Star
- Webhook Delivery
- authorization grant

Exclude notifications whose only source is Code, Pull Requests, Actions or code-security activity.

### Official evidence

- Evidence status: Confirmed.
- Evidence IDs: `N1`, `N2`, `N3`.
- Canonical ledger: `docs/product/github-non-code-semantic-model.md#official-evidence-ledger`.

Official evidence establishes product semantics and candidate ownership only. It does not approve runtime implementation, persistence, contracts or dependencies.
<!-- END:context-governance -->
