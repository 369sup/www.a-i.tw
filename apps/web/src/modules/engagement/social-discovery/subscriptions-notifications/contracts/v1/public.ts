export type NotificationReasonV1 = "assign" | "participating" | "watching";
export type NotificationReadStateV1 = "unread" | "read";
export type NotificationInboxStateV1 = "active" | "done";
export type NotificationTriageV1 = Readonly<{
  readState: NotificationReadStateV1;
  inboxState: NotificationInboxStateV1;
  saved: boolean;
}>;

export type SubscriptionReasonV1 = "participating" | "watching";
export type SubscriptionRecipientV1 = Readonly<{
  principalId: string;
  reason: SubscriptionReasonV1;
}>;

export interface SubscriptionManagementApiV1 {
  unsubscribeConversation(input: {
    principalId: string;
    subjectRef: string;
  }): Promise<void>;
}
