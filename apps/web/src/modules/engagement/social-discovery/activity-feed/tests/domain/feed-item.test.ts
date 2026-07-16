import { describe, expect, it } from "vitest";
import { createFeedItem } from "../../domain/activity-feed/entities/feed-item";

const validItem = {
  id: "feed-1",
  recipientPrincipalId: "principal-ada",
  actorPrincipalId: "principal-grace",
  verb: "updated",
  subjectRef: "repository:repository-roadmap",
  occurredAt: new Date(0).toISOString(),
};

describe("FeedItem", () => {
  it("requires the recipient-scoped projection fields", () => {
    expect(() =>
      createFeedItem({ ...validItem, recipientPrincipalId: " " }),
    ).toThrow(
      "Feed identity, recipient, actor, verb and subject are required.",
    );
    expect(() =>
      createFeedItem({ ...validItem, occurredAt: "not-a-date" }),
    ).toThrow("Feed occurrence time is invalid.");
  });

  it("returns an immutable canonical projection", () => {
    const item = createFeedItem({ ...validItem, verb: " updated " });

    expect(item.verb).toBe("updated");
    expect(Object.isFrozen(item)).toBe(true);
  });
});
