import { describe, expect, it } from "vitest";
import { mapUpdateRepositoryPolicyForm } from "../../adapters/inbound/server-actions/update-repository-policy";

describe("repository policy form adapter", () => {
  it("maps policy fields without leaking FormData into the application boundary", () => {
    const data = new FormData();
    data.set("enterpriseId", "enterprise-acme");
    data.set("publicRepositoryCreation", "forbidden");
    data.set("publicVisibilityChange", "allowed");

    expect(mapUpdateRepositoryPolicyForm(data)).toEqual({
      enterpriseId: "enterprise-acme",
      policy: {
        publicRepositoryCreation: "forbidden",
        publicVisibilityChange: "allowed",
      },
    });
  });
});
