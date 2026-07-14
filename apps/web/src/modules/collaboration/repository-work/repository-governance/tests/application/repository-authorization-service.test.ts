import { describe, expect, it } from "vitest";

import { InMemoryRepositoryAccessGrantStore } from "../../adapters/outbound/persistence/in-memory-repository-access-grant-store";
import { createRepositoryAuthorizationService } from "../../application/use-cases/repository-authorization-service";

const repository = {
  repositoryId: "repository-1",
  ownerAccountId: "organization-1",
  visibility: "private" as const,
  status: "active" as const,
};
const owner = { principalId: "principal-owner", status: "active" as const };
const member = { principalId: "principal-member", status: "active" as const };

function fixture() {
  const grants = new InMemoryRepositoryAccessGrantStore();
  const service = createRepositoryAuthorizationService(
    grants,
    {
      membership: async (accountId, principalId) =>
        accountId === repository.ownerAccountId &&
        principalId === owner.principalId
          ? { principalId, role: "owner", status: "active" }
          : principalId === member.principalId
            ? { principalId, role: "member", status: "active" }
            : undefined,
      teamIds: async (_accountId, principalId) =>
        principalId === member.principalId ? ["team-1"] : [],
      team: async (accountId, teamId) =>
        accountId === repository.ownerAccountId && teamId === "team-1"
          ? { accountId, teamId }
          : undefined,
    },
    {
      principal: async (principalId) =>
        [owner.principalId, member.principalId].includes(principalId)
          ? { principalId, status: "active" }
          : undefined,
    },
  );
  return { grants, service };
}

describe("Authorization Policy service", () => {
  it("lets an Account owner grant and then resolves Principal access", async () => {
    const { service } = fixture();
    await service.grantRepositoryAccess({
      repository,
      actor: owner,
      subject: { type: "principal", principalId: member.principalId },
      role: "triage",
    });
    await expect(
      service.decideRepositoryAccess({
        repository,
        principal: member,
        action: "issue:triage",
      }),
    ).resolves.toEqual({
      allowed: true,
      reason: "direct-grant",
      effectiveRole: "triage",
    });
  });

  it("rejects unknown Principal and out-of-owner Team grants", async () => {
    const { service } = fixture();
    await expect(
      service.grantRepositoryAccess({
        repository,
        actor: owner,
        subject: { type: "principal", principalId: "missing" },
        role: "read",
      }),
    ).rejects.toThrow("active Principal");
    await expect(
      service.grantRepositoryAccess({
        repository,
        actor: owner,
        subject: { type: "team", teamId: "other-team" },
        role: "read",
      }),
    ).rejects.toThrow("Repository owner Account");
  });

  it("fails closed for a disabled actor", async () => {
    const { service } = fixture();
    await expect(
      service.grantRepositoryAccess({
        repository,
        actor: { ...owner, status: "disabled" },
        subject: { type: "principal", principalId: member.principalId },
        role: "read",
      }),
    ).rejects.toThrow("unauthenticated");
  });
});
