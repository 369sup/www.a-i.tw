import { describe, expect, it } from "vitest";
import {
  activateOrganizationAccount,
  createOrganizationAccount,
  resumeOrganizationAccountProvisioning,
} from "../../domain/organization-account/aggregates/organization-account";

describe("OrganizationAccount", () => {
  it("starts provisioning and activates only after provisioning completes", () => {
    const account = createOrganizationAccount({
      id: "org-1",
      handle: "Example",
    });
    expect(account).toMatchObject({
      handle: "example",
      status: "provisioning",
    });
    expect(activateOrganizationAccount(account).status).toBe("active");
  });

  it("resumes only the same canonical handle", () => {
    const account = createOrganizationAccount({
      id: "org-1",
      handle: "Example",
    });
    expect(
      resumeOrganizationAccountProvisioning(account, { handle: "example" }),
    ).toBe(account);
    expect(() =>
      resumeOrganizationAccountProvisioning(account, { handle: "different" }),
    ).toThrow("cannot change its handle");
  });
});
