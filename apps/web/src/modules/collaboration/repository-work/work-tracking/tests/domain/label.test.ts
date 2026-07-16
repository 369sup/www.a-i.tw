import { describe, expect, it } from "vitest";
import {
  createLabel,
  normalizeLabelName,
} from "../../domain/work-tracking/entities/label";

describe("Label", () => {
  it("normalizes the repository-scoped name, color and description", () => {
    expect(
      createLabel({
        id: "label-1",
        repositoryId: "repository-1",
        name: "  Needs Review  ",
        color: "  #A1B2C3  ",
        description: "  Requires attention  ",
      }),
    ).toEqual({
      id: "label-1",
      repositoryId: "repository-1",
      name: "needs review",
      color: "a1b2c3",
      description: "Requires attention",
    });
  });

  it.each(["", " ".repeat(5), "a".repeat(51)])(
    "rejects invalid Label names",
    (name) => {
      expect(() => normalizeLabelName(name)).toThrow("Label name is invalid.");
    },
  );

  it.each(["fff", "gggggg", "#12345g"])(
    "rejects invalid Label colors",
    (color) => {
      expect(() =>
        createLabel({
          id: "label-1",
          repositoryId: "repository-1",
          name: "bug",
          color,
          description: "",
        }),
      ).toThrow("Label color is invalid.");
    },
  );
});
