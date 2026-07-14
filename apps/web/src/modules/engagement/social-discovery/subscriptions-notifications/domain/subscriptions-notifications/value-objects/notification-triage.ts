export type NotificationReadState = "unread" | "read";
export type NotificationInboxState = "active" | "done";

export type NotificationTriage = Readonly<{
  readState: NotificationReadState;
  inboxState: NotificationInboxState;
  saved: boolean;
}>;

export type NotificationTriageAction =
  "mark-read" | "mark-unread" | "save" | "unsave" | "mark-done";

export function createNotificationTriage(): NotificationTriage {
  return { readState: "unread", inboxState: "active", saved: false };
}

export function applyNotificationTriage(
  value: NotificationTriage,
  action: NotificationTriageAction,
): NotificationTriage {
  if (action === "mark-read") return { ...value, readState: "read" };
  if (action === "mark-unread") return { ...value, readState: "unread" };
  if (action === "save") return { ...value, saved: true };
  if (action === "unsave") return { ...value, saved: false };
  return { ...value, inboxState: "done" };
}
