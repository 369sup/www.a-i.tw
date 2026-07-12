import { describe, expect, it } from "vitest";

import { ResourceName } from "../../../domain/template-management/value-objects/resource-name";

describe("ResourceName", () => {
  it("normalizes valid names", () => {
    const result = ResourceName.create(" Design-System ");

    expect(result).toEqual({
      ok: true,
      value: expect.objectContaining({ value: "design-system" }),
    });
  });

  it("rejects reserved names", () => {
    expect(ResourceName.create("new")).toEqual({
      ok: false,
      reason: "reserved",
    });
  });
});
