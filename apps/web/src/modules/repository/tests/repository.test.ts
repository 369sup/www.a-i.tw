import { describe, expect, it } from "vitest";
import { decideRepositoryAccess } from "../src/domain/authorization";
import {
  archiveRepository,
  createRepository,
  renameRepository,
} from "../src/domain/repository";

describe("repository governance", () => {
  const repository = createRepository({
    id: "r-1",
    ownerAccountId: "a-1",
    ownerHandle: "ada",
    name: "Ideas",
    description: "",
    visibility: "private",
  });
  it("keeps owner separate from collaborator grants", () => {
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "p-1",
        ownerPrincipalId: "p-1",
        action: "manage-access",
        grants: [],
      }),
    ).toEqual({ allowed: true, reason: "owner", effectiveRole: "admin" });
  });
  it("prevents mutation after archive", () => {
    expect(() =>
      renameRepository(archiveRepository(repository), "new-name"),
    ).toThrow("Archived repositories");
  });
});
