import {
  applyNotificationTriage,
  createNotificationTriage,
  type NotificationTriage,
  type NotificationTriageAction,
} from "../value-objects/notification-triage";

export type Notification = Readonly<{
  id: string;
  recipientPrincipalId: string;
  subjectRef: string;
  threadRef: string;
  reason: "assign" | "participating" | "watching";
  title: string;
  href: string;
  triage: NotificationTriage;
  createdAt: string;
}>;

export function createNotification(
  input: Omit<Notification, "triage">,
): Notification {
  if (
    !input.id.trim() ||
    !input.recipientPrincipalId.trim() ||
    !input.subjectRef.trim() ||
    !input.threadRef.trim() ||
    !input.title.trim() ||
    !input.href.trim()
  )
    throw new Error("Notification requires identity, recipient and subject.");
  return { ...input, triage: createNotificationTriage() };
}

export function triageNotification(
  value: Notification,
  action: NotificationTriageAction,
): Notification {
  return { ...value, triage: applyNotificationTriage(value.triage, action) };
}
