import { describe, expect, it } from "vitest";
import type { PersonalAccountRefV1 } from "../../contracts/v1/public";

describe("PersonalAccountRefV1", () => {
  it("publishes active Account identity without provisioning state", () => {
    const account = {
      accountId: "account-1",
      handle: "ada",
      kind: "personal",
      status: "active",
      personalPrincipalId: "principal-1",
    } satisfies PersonalAccountRefV1;
    expect(account.status).toBe("active");
    expect(account).not.toHaveProperty("displayName");
  });
});
