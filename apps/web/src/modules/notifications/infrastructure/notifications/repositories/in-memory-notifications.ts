import type { NotificationStore } from "../../../application/notifications/use-cases/notifications-service";
import type { Notification } from "../../../domain/notifications/entities/notification";
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
