import { describe, expect, it, vi } from "vitest";
import { InMemoryNotificationStore } from "../../adapters/outbound/persistence/in-memory-notifications";
import { createUnsubscribeNotificationProcess } from "../../application/process-managers/unsubscribe-notification";
import { createNotificationsService } from "../../application/use-cases/notifications-service";

function createFixture() {
  const store = new InMemoryNotificationStore();
  const service = createNotificationsService(
    store,
    () => "n1",
    () => new Date(0),
  );
  return { store, service };
}

describe("Notifications", () => {
  it("triages read, saved and Inbox state independently", async () => {
    const { service } = createFixture();
    const notification = await service.notify({
      recipientPrincipalId: "u",
      subjectRef: "issue:1",
      threadRef: "issue:1",
      reason: "assign",
      title: "Assigned to Roadmap",
      href: "/repositories?repository=repository-1",
    });

    await expect(
      service.triage(notification.id, "u", "mark-read"),
    ).resolves.toMatchObject({ triage: { readState: "read", saved: false } });
    await expect(
      service.triage(notification.id, "u", "save"),
    ).resolves.toMatchObject({
      triage: { readState: "read", inboxState: "active", saved: true },
    });
    await expect(
      service.triage(notification.id, "u", "mark-done"),
    ).resolves.toMatchObject({
      triage: { readState: "read", inboxState: "done", saved: true },
    });
    await expect(service.listInbox("u")).resolves.toEqual([]);
    await expect(
      service.triage(notification.id, "other", "mark-read"),
    ).rejects.toThrow("Notification not found");
  });

  it("unsubscribes from the Notification-owned subject before marking done", async () => {
    const { store, service } = createFixture();
    const unsubscribeConversation = vi.fn().mockResolvedValue(undefined);
    const process = createUnsubscribeNotificationProcess(store, {
      unsubscribeConversation,
    });
    const notification = await service.notify({
      recipientPrincipalId: "u",
      subjectRef: "discussion:1",
      threadRef: "repository:1",
      reason: "participating",
      title: "New comment",
      href: "/repositories?repository=repository-1",
    });

    await expect(process(notification.id, "u")).resolves.toMatchObject({
      triage: { inboxState: "done" },
    });
    expect(unsubscribeConversation).toHaveBeenCalledWith({
      principalId: "u",
      subjectRef: "discussion:1",
    });
  });

  it("fails closed without changing Inbox state when unsubscribe fails", async () => {
    const { store, service } = createFixture();
    const process = createUnsubscribeNotificationProcess(store, {
      unsubscribeConversation: vi.fn().mockRejectedValue(new Error("offline")),
    });
    const notification = await service.notify({
      recipientPrincipalId: "u",
      subjectRef: "discussion:1",
      threadRef: "repository:1",
      reason: "participating",
      title: "New comment",
      href: "/repositories?repository=repository-1",
    });

    await expect(process(notification.id, "u")).rejects.toThrow("offline");
    await expect(store.find(notification.id)).resolves.toMatchObject({
      triage: { inboxState: "active" },
    });
  });
});
