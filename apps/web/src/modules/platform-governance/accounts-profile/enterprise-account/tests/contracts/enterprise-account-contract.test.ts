import { describe, expect, it } from "vitest";
import type { EnterpriseSummaryV1 } from "../../contracts/v1/public";

describe("EnterpriseSummaryV1", () => {
  it("publishes identity and affiliations without policy or role state", () => {
    const enterprise = {
      enterpriseId: "enterprise-1",
      name: "Example",
      organizationAccountIds: ["organization-1"],
    } satisfies EnterpriseSummaryV1;
    expect(enterprise.organizationAccountIds).toEqual(["organization-1"]);
  });
});
