import type { Notification } from "../../../domain/subscriptions-notifications/aggregates/notification";

export interface NotificationStore {
  find(id: string): Promise<Notification | undefined>;
  list(recipientPrincipalId: string): Promise<readonly Notification[]>;
  save(value: Notification): Promise<void>;
}
