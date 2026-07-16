import { describe, expect, it } from "vitest";
import { createAuditEntry } from "../../domain/audit-compliance/entities/audit-entry";

const validEntry = {
  id: "audit-1",
  actorPrincipalId: "principal-ada",
  action: "browser_session.established",
  targetRef: "principal:principal-ada",
  result: "success" as const,
  occurredAt: new Date(0).toISOString(),
};

describe("AuditEntry", () => {
  it("requires identity, actor, action, target and occurrence time", () => {
    expect(() =>
      createAuditEntry({ ...validEntry, actorPrincipalId: " " }),
    ).toThrow("Audit identity, actor, action and target are required.");
    expect(() =>
      createAuditEntry({ ...validEntry, occurredAt: "not-a-date" }),
    ).toThrow("Audit occurrence time is invalid.");
  });

  it("returns an immutable canonical observation", () => {
    const entry = createAuditEntry({
      ...validEntry,
      action: " browser_session.established ",
    });

    expect(entry.action).toBe("browser_session.established");
    expect(Object.isFrozen(entry)).toBe(true);
  });
});
