import { describe, expect, it } from "vitest";
import { createAuditService } from "../../application/use-cases/audit-service";
import { InMemoryAuditStore } from "../../adapters/outbound/persistence/in-memory-audit";
describe("audit", () =>
  it("queries immutable observations", async () => {
    const s = createAuditService(
      new InMemoryAuditStore(),
      () => "a1",
      () => new Date(0),
    );
    await s.record({
      actorPrincipalId: "u",
      action: "issue.create",
      targetRef: "issue:1",
      result: "success",
    });
    await expect(s.query({ actorPrincipalId: "u" })).resolves.toHaveLength(1);
  }));
