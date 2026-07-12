import { describe, expect, it } from "vitest";
import { createRepositoryService } from "../../../application/repository/use-cases/repository-service";
import {
  InMemoryAccessGrantStore,
  InMemoryRepositoryStore,
} from "../../../infrastructure/repository/repositories/in-memory-repository-store";

const principal = { principalId: "principal-owner", status: "active" as const };
const accounts = {
  eligibility: async () => ({
    account: {
      accountId: "account-organization",
      handle: "organization",
      displayName: "Organization",
      kind: "organization" as const,
      status: "active" as const,
    },
    canOwnRepository: true,
  }),
  membership: async () => ({
    accountId: "account-organization",
    principalId: principal.principalId,
    role: "owner" as const,
    status: "active" as const,
  }),
  teamIds: async () => [],
};

describe("enterprise Repository visibility policy", () => {
  it("rejects Public Repository creation when Enterprise policy forbids it", async () => {
    const service = createRepositoryService(
      new InMemoryRepositoryStore(),
      new InMemoryAccessGrantStore(),
      accounts,
      {
        constraintsForOwner: async () => ({
          publicRepositoryCreation: "forbidden",
          publicVisibilityChange: "forbidden",
        }),
      },
      () => "repository-1",
    );
    await expect(
      service.create({
        principal,
        ownerAccountId: "account-organization",
        name: "public-work",
        description: "",
        visibility: "public",
      }),
    ).rejects.toThrow("forbids Public Repository creation");
  });

  it("allows a Private Repository under the same policy", async () => {
    const service = createRepositoryService(
      new InMemoryRepositoryStore(),
      new InMemoryAccessGrantStore(),
      accounts,
      {
        constraintsForOwner: async () => ({
          publicRepositoryCreation: "forbidden",
          publicVisibilityChange: "forbidden",
        }),
      },
      () => "repository-1",
    );
    await expect(
      service.create({
        principal,
        ownerAccountId: "account-organization",
        name: "private-work",
        description: "",
        visibility: "private",
      }),
    ).resolves.toMatchObject({ visibility: "private" });
  });
});
