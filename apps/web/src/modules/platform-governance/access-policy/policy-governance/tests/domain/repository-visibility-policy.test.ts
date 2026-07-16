import { describe, expect, it } from "vitest";
import { defaultRepositoryVisibilityPolicy } from "../../domain/policy-governance/aggregates/repository-visibility-policy";

describe("repository visibility policy", () => {
  it("starts with both public Repository operations allowed", () => {
    expect(defaultRepositoryVisibilityPolicy).toEqual({
      publicRepositoryCreation: "allowed",
      publicVisibilityChange: "allowed",
    });
  });

  it("exposes only the two owned public Repository decisions", () => {
    expect(Object.keys(defaultRepositoryVisibilityPolicy).sort()).toEqual([
      "publicRepositoryCreation",
      "publicVisibilityChange",
    ]);
  });
});
