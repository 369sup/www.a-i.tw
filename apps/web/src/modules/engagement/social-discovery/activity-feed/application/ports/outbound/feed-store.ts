import type { FeedItem } from "../../../domain/activity-feed/entities/feed-item";

export interface FeedStore {
  list(recipientPrincipalId: string): Promise<FeedItem[]>;
  append(value: FeedItem): Promise<void>;
}
