import { describe, expect, it } from "vitest";
import {
  activateRepositoryInteractionLimit,
  isRepositoryInteractionLimitActive,
  removeRepositoryInteractionLimit,
} from "../../domain/community-safety/aggregates/repository-interaction-limit";

describe("RepositoryInteractionLimit", () => {
  it("expires one day after activation and can be removed earlier", () => {
    const activatedAt = new Date("2026-07-14T00:00:00.000Z");
    const limit = activateRepositoryInteractionLimit({
      repositoryId: "repository-1",
      kind: "collaborators_only",
      expiry: "one_day",
      activatedAt,
    });
    expect(limit.expiresAt).toBe("2026-07-15T00:00:00.000Z");
    expect(isRepositoryInteractionLimitActive(limit, activatedAt)).toBe(true);
    expect(
      isRepositoryInteractionLimitActive(
        limit,
        new Date("2026-07-15T00:00:00.000Z"),
      ),
    ).toBe(false);
    expect(
      isRepositoryInteractionLimitActive(
        removeRepositoryInteractionLimit(
          limit,
          new Date("2026-07-14T01:00:00.000Z"),
        ),
        new Date("2026-07-14T02:00:00.000Z"),
      ),
    ).toBe(false);
  });
});
