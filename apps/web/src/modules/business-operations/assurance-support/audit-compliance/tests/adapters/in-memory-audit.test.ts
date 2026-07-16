import { describe, expect, it } from "vitest";
import { InMemoryAuditStore } from "../../adapters/outbound/persistence/in-memory-audit";

const entry = {
  id: "audit-1",
  actorPrincipalId: "principal-ada",
  action: "browser_session.established",
  targetRef: "principal:principal-ada",
  result: "success" as const,
  occurredAt: new Date(0).toISOString(),
};

describe("InMemoryAuditStore", () => {
  it("reconstructs and filters initial audit evidence", async () => {
    const store = new InMemoryAuditStore([entry]);

    await expect(
      store.query({ actorPrincipalId: "principal-ada" }),
    ).resolves.toEqual([entry]);
    await expect(
      store.query({ actorPrincipalId: "principal-grace" }),
    ).resolves.toEqual([]);
  });

  it("keeps idempotent appends stable and rejects identity conflicts", async () => {
    const store = new InMemoryAuditStore();

    await store.append(entry);
    await store.append(entry);
    await expect(store.query({})).resolves.toHaveLength(1);
    await expect(
      store.append({ ...entry, action: "browser_session.failed" }),
    ).rejects.toThrow("Audit entry identity conflict.");
  });
});
