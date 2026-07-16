import type { FeedStore } from "../../../application/ports/outbound/feed-store";
import {
  createFeedItem,
  type FeedItem,
} from "../../../domain/activity-feed/entities/feed-item";

export class InMemoryFeedStore implements FeedStore {
  private readonly items: FeedItem[];

  constructor(initial: readonly FeedItem[] = []) {
    this.items = initial.map((item) => createFeedItem({ ...item }));
  }

  async list(recipientPrincipalId: string) {
    return this.items
      .filter((item) => item.recipientPrincipalId === recipientPrincipalId)
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  }

  async append(value: FeedItem) {
    this.items.push(createFeedItem({ ...value }));
  }
}
