import { describe, expect, it } from "vitest";
import { createRepositoryCapabilityContextResolver } from "./repository-capability-context";

const principal = {
  principalId: "principal-1",
  handle: "ada",
  displayName: "Ada",
  status: "active" as const,
};

describe("Repository capability context", () => {
  it("resolves an Organization scope and delegates the decision", async () => {
    const resolve = createRepositoryCapabilityContextResolver(
      {
        resolve: async () => ({
          accountId: "account-org",
          handle: "org",
          displayName: "Organization",
          kind: "organization",
          status: "active",
        }),
      },
      {
        resolve: async () => ({
          repositoryId: "repository-1",
          ownerAccountId: "account-org",
          ownerHandle: "org",
          name: "planning",
          description: "",
          visibility: "private",
          status: "active",
        }),
        authorize: async (input) => ({
          repositoryId: input.repositoryId,
          principalId: input.principal.principalId,
          action: input.action,
          allowed: true,
          reason: "owner",
        }),
      },
    );

    const context = await resolve({
      authentication: {
        principal,
        authenticatedAt: "2026-07-12T00:00:00.000Z",
      },
      activeScopeAccountId: "account-org",
      repositoryId: "repository-1",
      capabilityKey: "issue.create",
      correlationId: "request-1",
    });

    expect(context.envelope.actor).toBe(principal);
    expect(context.organization?.accountId).toBe("account-org");
    expect(context.requestedAction).toBe("issue:create");
    expect(context.authorizationDecision.allowed).toBe(true);
    expect(context.envelope).not.toHaveProperty("sessionToken");
  });

  it("fails closed when the Repository is outside the active scope", async () => {
    const resolve = createRepositoryCapabilityContextResolver(
      { resolve: async () => undefined },
      {
        resolve: async () => ({
          repositoryId: "repository-1",
          ownerAccountId: "account-other",
          ownerHandle: "other",
          name: "planning",
          description: "",
          visibility: "private",
          status: "active",
        }),
        authorize: async () => {
          throw new Error("must not authorize");
        },
      },
    );

    await expect(
      resolve({
        authentication: {
          principal,
          authenticatedAt: "2026-07-12T00:00:00.000Z",
        },
        activeScopeAccountId: "account-selected",
        repositoryId: "repository-1",
        capabilityKey: "issue.read",
        correlationId: "request-2",
      }),
    ).rejects.toThrow("outside the active Account scope");
  });
});
