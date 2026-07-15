import {
  createConversationSubscription,
  createRepositoryWatch,
  type RepositoryWatchMode,
  type WatchEventType,
} from "../../domain/subscriptions-notifications/aggregates/subscription";
import type { SubscriptionStore } from "../ports/outbound/subscription-store-port";

export type SubscriptionRecipient = Readonly<{
  principalId: string;
  reason: "participating" | "watching";
}>;

export function createSubscriptionsService(store: SubscriptionStore) {
  return {
    async watchRepository(input: {
      principalId: string;
      repositoryId: string;
      mode: RepositoryWatchMode;
      eventTypes?: readonly WatchEventType[];
    }) {
      const watch = createRepositoryWatch({
        ...input,
        eventTypes: input.eventTypes ?? [],
      });
      await store.saveWatch(watch);
      return watch;
    },
    async participate(principalId: string, subjectRef: string) {
      const value = createConversationSubscription({ principalId, subjectRef });
      await store.saveConversation(value);
      return value;
    },
    async unsubscribeConversation(input: {
      principalId: string;
      subjectRef: string;
    }) {
      await store.saveConversation({ ...input, active: false });
    },
    async resolveRecipients(input: {
      repositoryId: string;
      subjectRef: string;
      eventType: WatchEventType;
      actorPrincipalId: string;
    }): Promise<readonly SubscriptionRecipient[]> {
      const recipients = new Map<string, SubscriptionRecipient>();
      for (const subscription of await store.listConversation(input.subjectRef))
        if (
          subscription.active &&
          subscription.principalId !== input.actorPrincipalId
        )
          recipients.set(subscription.principalId, {
            principalId: subscription.principalId,
            reason: "participating",
          });
      for (const watch of await store.listWatches(input.repositoryId)) {
        const watchesEvent =
          watch.mode === "all" ||
          (watch.mode === "custom" &&
            watch.eventTypes.includes(input.eventType));
        if (
          watchesEvent &&
          watch.principalId !== input.actorPrincipalId &&
          !recipients.has(watch.principalId)
        )
          recipients.set(watch.principalId, {
            principalId: watch.principalId,
            reason: "watching",
          });
      }
      return [...recipients.values()];
    },
  };
}
