import { describe, expect, it } from "vitest";
import { InMemorySubscriptionStore } from "../../adapters/outbound/persistence/in-memory-subscription-store";
import { createSubscriptionsService } from "../../application/use-cases/subscriptions-service";

describe("Subscriptions", () => {
  it("prefers participation and suppresses the actor", async () => {
    const service = createSubscriptionsService(new InMemorySubscriptionStore());
    await service.watchRepository({
      principalId: "watcher",
      repositoryId: "repository-1",
      mode: "all",
    });
    await service.participate("participant", "discussion:1");
    await service.participate("actor", "discussion:1");
    await expect(
      service.resolveRecipients({
        repositoryId: "repository-1",
        subjectRef: "discussion:1",
        eventType: "discussions",
        actorPrincipalId: "actor",
      }),
    ).resolves.toEqual([
      { principalId: "participant", reason: "participating" },
      { principalId: "watcher", reason: "watching" },
    ]);
  });

  it("stops conversation notifications after unsubscribe", async () => {
    const service = createSubscriptionsService(new InMemorySubscriptionStore());
    await service.participate("participant", "issue:1");
    await service.unsubscribeConversation({
      principalId: "participant",
      subjectRef: "issue:1",
    });
    await expect(
      service.resolveRecipients({
        repositoryId: "repository-1",
        subjectRef: "issue:1",
        eventType: "issues",
        actorPrincipalId: "actor",
      }),
    ).resolves.toEqual([]);
  });
});
