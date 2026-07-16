import { describe, expect, it } from "vitest";
import { assignEnterpriseOwner } from "../../domain/administrative-access-control/aggregates/enterprise-owner-assignment";

describe("enterprise owner assignment", () => {
  it("keeps the Enterprise, Principal and assignment time as one domain fact", () => {
    const assignment = {
      enterpriseId: "enterprise-1",
      principalId: "principal-1",
      assignedAt: "2026-07-16T00:00:00.000Z",
    };

    expect(assignEnterpriseOwner(assignment)).toEqual(assignment);
  });

  it.each([
    {
      enterpriseId: "",
      principalId: "principal-1",
      assignedAt: "2026-07-16T00:00:00.000Z",
    },
    {
      enterpriseId: "enterprise-1",
      principalId: "",
      assignedAt: "2026-07-16T00:00:00.000Z",
    },
  ])("rejects an assignment without both owned identities", (assignment) => {
    expect(() => assignEnterpriseOwner(assignment)).toThrow(
      "Enterprise and Principal identities are required.",
    );
  });
});
