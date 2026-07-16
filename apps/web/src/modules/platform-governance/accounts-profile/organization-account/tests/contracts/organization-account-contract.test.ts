import { describe, expect, it } from "vitest";
import type { OrganizationRefV1 } from "../../contracts/v1/public";

describe("OrganizationRefV1", () => {
  it("publishes Account identity without Profile or Membership ownership", () => {
    const account = {
      accountId: "organization-1",
      handle: "example",
      kind: "organization",
      status: "active",
    } satisfies OrganizationRefV1;
    expect(account.kind).toBe("organization");
    expect(account).not.toHaveProperty("displayName");
  });
});
