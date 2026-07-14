import { describe, expect, it } from "vitest";

import { createRepositoryStar } from "../../domain/social-curation/aggregates/repository-star";
import { InvalidRepositoryStarError } from "../../domain/social-curation/errors/invalid-repository-star.error";

describe("Repository Star", () => {
  it("canonicalizes identities and records the creation instant", () => {
    expect(
      createRepositoryStar({
        principalId: " principal-ada ",
        repositoryId: " repository-roadmap ",
        starredAt: new Date("2026-07-14T08:00:00.000Z"),
      }),
    ).toEqual({
      principalId: "principal-ada",
      repositoryId: "repository-roadmap",
      starredAt: "2026-07-14T08:00:00.000Z",
    });
  });

  it("rejects empty identities and invalid timestamps", () => {
    expect(() =>
      createRepositoryStar({
        principalId: " ",
        repositoryId: "repository-roadmap",
        starredAt: new Date(),
      }),
    ).toThrow(InvalidRepositoryStarError);
    expect(() =>
      createRepositoryStar({
        principalId: "principal-ada",
        repositoryId: "repository-roadmap",
        starredAt: new Date(Number.NaN),
      }),
    ).toThrow(InvalidRepositoryStarError);
  });
});
