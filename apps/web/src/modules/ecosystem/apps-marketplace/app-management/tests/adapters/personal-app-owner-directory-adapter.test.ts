import { describe, expect, it, vi } from "vitest";

import { createPersonalAppOwnerDirectoryAdapter } from "../../adapters/outbound/integrations/personal-app-owner-directory-adapter";

describe("Personal App owner directory adapter", () => {
  it("maps Account Published Language without leaking profile facts", async () => {
    const resolveByPrincipal = vi.fn(async () => ({
      accountId: "account-ada",
      handle: "ada",
      displayName: "Ada Lovelace",
      kind: "personal" as const,
      status: "active" as const,
      personalPrincipalId: "principal-ada",
    }));
    const adapter = createPersonalAppOwnerDirectoryAdapter({
      resolve: vi.fn(),
      resolveByPrincipal,
      eligibility: vi.fn(),
    });

    await expect(adapter.resolveByPrincipal("principal-ada")).resolves.toEqual({
      accountId: "account-ada",
      handle: "ada",
      status: "active",
    });
  });
});
