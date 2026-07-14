import { describe, expect, it } from "vitest";
import { createActivityFeedService } from "../../application/use-cases/activity-feed-service";
import { InMemoryFeedStore } from "../../adapters/outbound/persistence/in-memory-activity-feed";
describe("activity feed", () =>
  it("lists recipient activity", async () => {
    const s = createActivityFeedService(
      new InMemoryFeedStore(),
      () => "f1",
      () => new Date(0),
    );
    await s.record({
      recipientPrincipalId: "u",
      actorPrincipalId: "a",
      verb: "created",
      subjectRef: "issue:1",
    });
    await expect(s.list("u")).resolves.toHaveLength(1);
  }));
