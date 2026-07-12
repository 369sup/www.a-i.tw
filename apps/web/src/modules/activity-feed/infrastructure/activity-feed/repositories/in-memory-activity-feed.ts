import type { FeedStore } from "../../../application/activity-feed/use-cases/activity-feed-service";
import type { FeedItem } from "../../../domain/activity-feed/entities/feed-item";
export class InMemoryFeedStore implements FeedStore {
  private readonly items: FeedItem[] = [];
  async list(id: string) {
    return this.items
      .filter((x) => x.recipientPrincipalId === id)
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  }
  async append(v: FeedItem) {
    this.items.push(v);
  }
}
