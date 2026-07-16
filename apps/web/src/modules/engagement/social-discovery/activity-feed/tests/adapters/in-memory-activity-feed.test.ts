import { describe, expect, it } from "vitest";
import { InMemoryFeedStore } from "../../adapters/outbound/persistence/in-memory-activity-feed";

describe("InMemoryFeedStore", () => {
  it("reconstructs, recipient-filters and orders feed projections", async () => {
    const store = new InMemoryFeedStore([
      {
        id: "feed-old",
        recipientPrincipalId: "principal-ada",
        actorPrincipalId: "principal-grace",
        verb: "created",
        subjectRef: "repository:one",
        occurredAt: new Date(0).toISOString(),
      },
      {
        id: "feed-new",
        recipientPrincipalId: "principal-ada",
        actorPrincipalId: "principal-grace",
        verb: "updated",
        subjectRef: "repository:two",
        occurredAt: new Date(1).toISOString(),
      },
      {
        id: "feed-other",
        recipientPrincipalId: "principal-grace",
        actorPrincipalId: "principal-ada",
        verb: "updated",
        subjectRef: "repository:three",
        occurredAt: new Date(2).toISOString(),
      },
    ]);

    const items = await store.list("principal-ada");

    expect(items.map((item) => item.id)).toEqual(["feed-new", "feed-old"]);
  });
});
