import type { Notification } from "../aggregates/notification";

export function notificationRetentionUntil(value: Notification): string | null {
  if (value.triage.saved) return null;
  const deadline = new Date(value.createdAt);
  deadline.setUTCMonth(deadline.getUTCMonth() + 5);
  return deadline.toISOString();
}
