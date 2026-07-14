import { describe, expect, it } from "vitest";
import { createBrowserRequestEnvelope } from "./browser-request-envelope";

describe("Request envelope", () => {
  it("carries Actor and Scope references without resource or policy state", () => {
    const envelope = createBrowserRequestEnvelope({
      authentication: {
        principal: {
          principalId: "principal-1",
          handle: "ada",
          displayName: "Ada",
          status: "active",
        },
        authenticatedAt: "2026-07-12T00:00:00.000Z",
      },
      correlationId: "request-1",
      activeScope: { type: "organization", accountId: "account-org" },
    });

    expect(envelope.actor.principalId).toBe("principal-1");
    expect(envelope.activeScope).toEqual({
      type: "organization",
      accountId: "account-org",
    });
    expect(envelope).not.toHaveProperty("resource");
    expect(envelope).not.toHaveProperty("relationships");
    expect(envelope).not.toHaveProperty("permissions");
    expect(envelope).not.toHaveProperty("policies");
  });
});
