import { describe, expect, it } from "vitest";
import {
  affiliateOrganization,
  createEnterprise,
} from "../../domain/enterprise-account/aggregates/enterprise";
import { InvalidEnterpriseIdError } from "../../domain/enterprise-account/errors/invalid-enterprise-id-error";
import { InvalidEnterpriseNameError } from "../../domain/enterprise-account/errors/invalid-enterprise-name-error";

describe("Enterprise", () => {
  it("normalizes identity and name and affiliates idempotently", () => {
    const enterprise = createEnterprise({
      id: " enterprise-1 ",
      name: " Example ",
    });
    const affiliated = affiliateOrganization(
      enterprise,
      " organization-1 ",
      "2026-07-16T00:00:00.000Z",
    );
    expect(affiliated).toMatchObject({ id: "enterprise-1", name: "Example" });
    expect(
      affiliateOrganization(
        affiliated,
        "organization-1",
        "2026-07-16T00:00:00.000Z",
      ),
    ).toBe(affiliated);
  });

  it("rejects missing identity and name", () => {
    expect(() => createEnterprise({ id: "", name: "Example" })).toThrow(
      InvalidEnterpriseIdError,
    );
    expect(() => createEnterprise({ id: "enterprise-1", name: "" })).toThrow(
      InvalidEnterpriseNameError,
    );
  });
});
