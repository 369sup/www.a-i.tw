import { describe, expect, it } from "vitest";

import { createRepositoryAccessGrant } from "../../domain/repository-governance/aggregates/repository-access-grant";
import { decideRepositoryAccess } from "../../domain/repository-governance/policies/decide-repository-access";
import { createRepositoryRole } from "../../domain/repository-governance/value-objects/repository-role";

const repository = {
  repositoryId: "repository-1",
  visibility: "private" as const,
  status: "active" as const,
};

describe("Repository authorization policy", () => {
  it("constructs only predefined Repository Roles and complete grants", () => {
    expect(createRepositoryRole("triage")).toBe("triage");
    expect(() => createRepositoryRole("super-admin")).toThrow(
      "Repository Role",
    );
    expect(() =>
      createRepositoryAccessGrant({
        repositoryId: " ",
        subject: { type: "principal", principalId: "principal-1" },
        role: "read",
      }),
    ).toThrow("Repository id is required");
  });

  it("keeps Account ownership separate from Repository grants", () => {
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-owner",
        ownerPrincipalId: "principal-owner",
        action: "repository:manage-access",
        grants: [],
      }),
    ).toEqual({ allowed: true, reason: "owner", effectiveRole: "admin" });
  });

  it("uses the highest direct or Team grant", () => {
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-member",
        action: "issue:manage",
        teamIds: ["team-research"],
        grants: [
          createRepositoryAccessGrant({
            repositoryId: repository.repositoryId,
            subject: {
              type: "principal",
              principalId: "principal-member",
            },
            role: "read",
          }),
          createRepositoryAccessGrant({
            repositoryId: repository.repositoryId,
            subject: { type: "team", teamId: "team-research" },
            role: "write",
          }),
        ],
      }),
    ).toEqual({
      allowed: true,
      reason: "team-grant",
      effectiveRole: "write",
    });
  });

  it("maps non-Code Issue actions to official Repository Role boundaries", () => {
    const grant = createRepositoryAccessGrant({
      repositoryId: repository.repositoryId,
      subject: { type: "principal", principalId: "principal-triager" },
      role: "triage",
    });
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-triager",
        action: "issue:comment",
        grants: [grant],
      }).allowed,
    ).toBe(true);
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-triager",
        action: "issue:manage",
        grants: [grant],
      }),
    ).toEqual({
      allowed: false,
      reason: "insufficient-access",
      effectiveRole: "triage",
    });
  });

  it("requires triage for Discussion moderation while readers can participate", () => {
    const readGrant = createRepositoryAccessGrant({
      repositoryId: repository.repositoryId,
      subject: { type: "principal", principalId: "principal-reader" },
      role: "read",
    });
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-reader",
        action: "discussion:comment",
        grants: [readGrant],
      }).allowed,
    ).toBe(true);
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-reader",
        action: "discussion:triage",
        grants: [readGrant],
      }).allowed,
    ).toBe(false);
  });

  it("requires write access to modify Wiki while read access can view it", () => {
    const readGrant = createRepositoryAccessGrant({
      repositoryId: repository.repositoryId,
      subject: { type: "principal", principalId: "principal-reader" },
      role: "read",
    });
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-reader",
        action: "wiki:read",
        grants: [readGrant],
      }).allowed,
    ).toBe(true);
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-reader",
        action: "wiki:write",
        grants: [readGrant],
      }).allowed,
    ).toBe(false);
  });

  it("requires admin to manage Interaction Limits and write to interact through one", () => {
    const writeGrant = createRepositoryAccessGrant({
      repositoryId: repository.repositoryId,
      subject: { type: "principal", principalId: "principal-writer" },
      role: "write",
    });
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-writer",
        action: "community-safety:interact",
        grants: [writeGrant],
      }).allowed,
    ).toBe(true);
    expect(
      decideRepositoryAccess({
        repository,
        principalId: "principal-writer",
        action: "community-safety:manage",
        grants: [writeGrant],
      }).allowed,
    ).toBe(false);
  });

  it("fails closed for disabled and archived Repository facts", () => {
    expect(
      decideRepositoryAccess({
        repository: { ...repository, status: "disabled" },
        principalId: "principal-owner",
        ownerPrincipalId: "principal-owner",
        action: "repository:read",
        grants: [],
      }),
    ).toEqual({ allowed: false, reason: "disabled" });
    expect(
      decideRepositoryAccess({
        repository: { ...repository, status: "archived" },
        principalId: "principal-owner",
        ownerPrincipalId: "principal-owner",
        action: "issue:create",
        grants: [],
      }),
    ).toEqual({ allowed: false, reason: "archived" });
  });
});
