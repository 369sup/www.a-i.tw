import type {
  ConversationSubscription,
  RepositoryWatch,
} from "../../../domain/subscriptions-notifications/aggregates/subscription";

export interface SubscriptionStore {
  saveWatch(value: RepositoryWatch): Promise<void>;
  listWatches(repositoryId: string): Promise<readonly RepositoryWatch[]>;
  saveConversation(value: ConversationSubscription): Promise<void>;
  listConversation(
    subjectRef: string,
  ): Promise<readonly ConversationSubscription[]>;
}
