import { describe, expect, it } from "vitest";
import { InMemoryEnterpriseStore } from "../../adapters/outbound/persistence/in-memory-enterprise-store";
import { InvalidEnterpriseNameError } from "../../domain/enterprise-account/errors/invalid-enterprise-name-error";

describe("InMemoryEnterpriseStore", () => {
  it("rehydrates seed records through Domain construction", () => {
    expect(
      () => new InMemoryEnterpriseStore([{ id: "enterprise-1", name: "" }]),
    ).toThrow(InvalidEnterpriseNameError);
  });
});
