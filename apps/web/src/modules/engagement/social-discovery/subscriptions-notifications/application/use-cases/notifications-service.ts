import type { NotificationStore } from "../ports/outbound/notification-store.port";
import {
  createNotification,
  triageNotification,
  type Notification,
} from "../../domain/subscriptions-notifications/aggregates/notification";
import { NotificationNotFoundError } from "../../domain/subscriptions-notifications/errors/notification-not-found.error";
import type { NotificationTriageAction } from "../../domain/subscriptions-notifications/value-objects/notification-triage";

export function createNotificationsService(
  store: NotificationStore,
  nextId: () => string,
  now: () => Date,
) {
  async function findOwned(id: string, recipientPrincipalId: string) {
    const value = await store.find(id);
    if (!value || value.recipientPrincipalId !== recipientPrincipalId)
      throw new NotificationNotFoundError();
    return value;
  }

  return {
    async listInbox(recipientPrincipalId: string) {
      return (await store.list(recipientPrincipalId)).filter(
        (value) => value.triage.inboxState === "active",
      );
    },
    async notify(input: Omit<Notification, "id" | "triage" | "createdAt">) {
      const value = createNotification({
        ...input,
        id: nextId(),
        createdAt: now().toISOString(),
      });
      await store.save(value);
      return value;
    },
    async triage(
      id: string,
      recipientPrincipalId: string,
      action: NotificationTriageAction,
    ) {
      const value = await findOwned(id, recipientPrincipalId);
      const updated = triageNotification(value, action);
      await store.save(updated);
      return updated;
    },
    findOwned,
  };
}
