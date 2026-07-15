import type { SubscriptionStore } from "../../../application/ports/outbound/subscription-store-port";
import type {
  ConversationSubscription,
  RepositoryWatch,
} from "../../../domain/subscriptions-notifications/aggregates/subscription";

export class InMemorySubscriptionStore implements SubscriptionStore {
  private readonly watches = new Map<string, RepositoryWatch>();
  private readonly conversations = new Map<string, ConversationSubscription>();

  async saveWatch(value: RepositoryWatch) {
    this.watches.set(`${value.principalId}:${value.repositoryId}`, value);
  }
  async listWatches(repositoryId: string) {
    return [...this.watches.values()].filter(
      (value) => value.repositoryId === repositoryId,
    );
  }
  async saveConversation(value: ConversationSubscription) {
    this.conversations.set(`${value.principalId}:${value.subjectRef}`, value);
  }
  async listConversation(subjectRef: string) {
    return [...this.conversations.values()].filter(
      (value) => value.subjectRef === subjectRef,
    );
  }
}
