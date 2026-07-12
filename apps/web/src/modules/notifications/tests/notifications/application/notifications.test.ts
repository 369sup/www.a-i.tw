import { describe, expect, it } from "vitest";
import { createNotificationsService } from "../../../application/notifications/use-cases/notifications-service";
import { InMemoryNotificationStore } from "../../../infrastructure/notifications/repositories/in-memory-notifications";
describe("notifications", () =>
  it("triages inbox state", async () => {
    const s = createNotificationsService(
      new InMemoryNotificationStore(),
      () => "n1",
      () => new Date(0),
    );
    const n = await s.notify({
      recipientPrincipalId: "u",
      subjectRef: "issue:1",
      reason: "assigned",
    });
    await expect(s.triage(n.id, "done")).resolves.toMatchObject({
      state: "done",
    });
  }));
