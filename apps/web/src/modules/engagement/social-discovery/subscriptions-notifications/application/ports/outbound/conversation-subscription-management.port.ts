export interface ConversationSubscriptionManagement {
  unsubscribeConversation(input: {
    principalId: string;
    subjectRef: string;
  }): Promise<void>;
}
