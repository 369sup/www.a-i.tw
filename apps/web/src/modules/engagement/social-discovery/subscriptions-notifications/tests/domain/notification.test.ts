import { describe, expect, it } from "vitest";
import {
  createNotification,
  triageNotification,
} from "../../domain/subscriptions-notifications/aggregates/notification";
import { notificationRetentionUntil } from "../../domain/subscriptions-notifications/policies/notification-retention";

describe("Notification", () => {
  it("keeps triage dimensions orthogonal and saved retention indefinite", () => {
    const notification = createNotification({
      id: "notification-1",
      recipientPrincipalId: "principal-1",
      subjectRef: "discussion:1",
      threadRef: "repository:1",
      reason: "watching",
      title: "New discussion",
      href: "/repositories?repository=repository-1",
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    const read = triageNotification(notification, "mark-read");
    const saved = triageNotification(read, "save");

    expect(saved.triage).toEqual({
      readState: "read",
      inboxState: "active",
      saved: true,
    });
    expect(notificationRetentionUntil(saved)).toBeNull();
    expect(notificationRetentionUntil(notification)).toBe(
      "2026-06-01T00:00:00.000Z",
    );
  });
});
