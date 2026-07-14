import { describe, expect, it } from "vitest";
import {
  archiveRepository,
  configureRepositoryWiki,
  createRepository,
  renameRepository,
} from "../../domain/repository-governance/aggregates/repository";

describe("repository governance", () => {
  const repository = createRepository({
    id: "r-1",
    owner: { accountId: "a-1", login: "ada", kind: "personal" },
    name: "Ideas",
    description: "",
    visibility: "private",
  });
  it("prevents mutation after archive", () => {
    expect(() =>
      renameRepository(archiveRepository(repository), "new-name"),
    ).toThrow("Archived repositories");
  });
  it("owns Wiki feature availability without owning Wiki pages", () => {
    expect(repository.features.wikiEnabled).toBe(true);
    expect(
      configureRepositoryWiki(repository, false).features.wikiEnabled,
    ).toBe(false);
    expect(() =>
      configureRepositoryWiki(archiveRepository(repository), false),
    ).toThrow("cannot change Wiki availability");
  });
});
