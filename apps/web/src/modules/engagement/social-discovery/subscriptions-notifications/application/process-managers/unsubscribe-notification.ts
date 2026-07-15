import type { ConversationSubscriptionManagement } from "../ports/outbound/conversation-subscription-management-port";
import type { NotificationStore } from "../ports/outbound/notification-store-port";
import { triageNotification } from "../../domain/subscriptions-notifications/aggregates/notification";
import { NotificationNotFoundError } from "../../domain/subscriptions-notifications/errors/notification-not-found-error";

export function createUnsubscribeNotificationProcess(
  store: NotificationStore,
  subscriptions: ConversationSubscriptionManagement,
) {
  return async function unsubscribeNotification(
    id: string,
    recipientPrincipalId: string,
  ) {
    const value = await store.find(id);
    if (!value || value.recipientPrincipalId !== recipientPrincipalId)
      throw new NotificationNotFoundError();

    await subscriptions.unsubscribeConversation({
      principalId: recipientPrincipalId,
      subjectRef: value.subjectRef,
    });
    const updated = triageNotification(value, "mark-done");
    await store.save(updated);
    return updated;
  };
}
