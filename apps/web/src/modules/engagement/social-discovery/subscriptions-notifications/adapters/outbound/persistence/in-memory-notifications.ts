import type { NotificationStore } from "../../../application/ports/outbound/notification-store.port";
import type { Notification } from "../../../domain/subscriptions-notifications/aggregates/notification";
export class InMemoryNotificationStore implements NotificationStore {
  private readonly items = new Map<string, Notification>();
  async list(id: string) {
    return Array.from(this.items.values()).filter(
      (x) => x.recipientPrincipalId === id,
    );
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async save(v: Notification) {
    this.items.set(v.id, v);
  }
}
