export type Notification = Readonly<{
  id: string;
  recipientPrincipalId: string;
  subjectRef: string;
  reason: "mention" | "assigned" | "subscribed" | "watching";
  state: "unread" | "read" | "saved" | "done";
  createdAt: string;
}>;
export function triageNotification(
  value: Notification,
  state: Notification["state"],
): Notification {
  return { ...value, state };
}
