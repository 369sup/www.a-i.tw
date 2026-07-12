import {
  triageNotification,
  type Notification,
} from "../../../domain/notifications/entities/notification";
export interface NotificationStore {
  list(recipient: string): Promise<Notification[]>;
  find(id: string): Promise<Notification | undefined>;
  save(value: Notification): Promise<void>;
}
export function createNotificationsService(
  store: NotificationStore,
  nextId: () => string,
  now: () => Date,
) {
  return {
    list: (id: string) => store.list(id),
    async notify(input: Omit<Notification, "id" | "state" | "createdAt">) {
      const value: Notification = {
        ...input,
        id: nextId(),
        state: "unread",
        createdAt: now().toISOString(),
      };
      await store.save(value);
      return value;
    },
    async triage(id: string, state: Notification["state"]) {
      const value = await store.find(id);
      if (!value) throw new Error("Notification not found.");
      const updated = triageNotification(value, state);
      await store.save(updated);
      return updated;
    },
  };
}
