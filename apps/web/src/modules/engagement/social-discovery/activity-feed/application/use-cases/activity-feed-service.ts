import {
  createFeedItem,
  type FeedItem,
} from "../../domain/activity-feed/entities/feed-item";
export interface FeedStore {
  list(recipient: string): Promise<FeedItem[]>;
  append(value: FeedItem): Promise<void>;
}
export function createActivityFeedService(
  store: FeedStore,
  nextId: () => string,
  now: () => Date,
) {
  return {
    list: (id: string) => store.list(id),
    async record(input: Omit<FeedItem, "id" | "occurredAt">) {
      const value = createFeedItem({
        ...input,
        id: nextId(),
        occurredAt: now().toISOString(),
      });
      await store.append(value);
      return value;
    },
  };
}
