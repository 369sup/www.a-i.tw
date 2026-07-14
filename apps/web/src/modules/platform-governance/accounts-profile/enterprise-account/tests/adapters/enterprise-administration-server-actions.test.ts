import { describe, expect, it } from "vitest";
import { mapAffiliateOrganizationForm } from "../../adapters/inbound/server-actions/affiliate-organization";
import { mapCreateEnterpriseForm } from "../../adapters/inbound/server-actions/create-enterprise";

describe("enterprise administration form adapter", () => {
  it("maps create and affiliation forms into transport-neutral inputs", () => {
    expect(mapCreateEnterpriseForm(formData({ name: "  Acme  " }))).toEqual({
      name: "Acme",
    });
    expect(
      mapAffiliateOrganizationForm(
        formData({
          enterpriseId: "enterprise-acme",
          organizationAccountId: "organization-tools",
        }),
      ),
    ).toEqual({
      enterpriseId: "enterprise-acme",
      organizationAccountId: "organization-tools",
    });
  });

  it("rejects missing required values at the inbound boundary", () => {
    expect(() => mapCreateEnterpriseForm(formData({ name: " " }))).toThrow(
      "name is required.",
    );
  });
});

function formData(values: Record<string, string>) {
  const data = new FormData();
  for (const [name, value] of Object.entries(values)) data.set(name, value);
  return data;
}
