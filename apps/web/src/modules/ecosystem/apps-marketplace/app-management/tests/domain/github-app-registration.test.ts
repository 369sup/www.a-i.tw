import { describe, expect, it } from "vitest";

import { createGitHubAppRegistration } from "../../domain/app-registration/aggregates/github-app-registration";
import { InvalidAppRegistrationError } from "../../domain/app-registration/errors/invalid-app-registration.error";

describe("GitHub App Registration", () => {
  it("creates a private Personal Account-owned registration", () => {
    expect(
      createGitHubAppRegistration({
        id: " github-app-1 ",
        ownerAccountId: " account-ada ",
        name: " Product Guide ",
        description: " Product documentation assistant ",
        homepageUrl: "https://example.com/app",
        callbackUrl: "https://example.com/callback",
        createdAt: new Date("2026-07-14T12:00:00.000Z"),
      }),
    ).toEqual({
      id: "github-app-1",
      ownerAccountId: "account-ada",
      name: "Product Guide",
      description: "Product documentation assistant",
      homepageUrl: "https://example.com/app",
      callbackUrl: "https://example.com/callback",
      availability: "private",
      createdAt: "2026-07-14T12:00:00.000Z",
    });
  });

  it("rejects invalid names and non-HTTP URLs", () => {
    expect(() =>
      createGitHubAppRegistration({
        id: "github-app-1",
        ownerAccountId: "account-ada",
        name: "x".repeat(35),
        homepageUrl: "https://example.com",
        createdAt: new Date(),
      }),
    ).toThrow(InvalidAppRegistrationError);
    expect(() =>
      createGitHubAppRegistration({
        id: "github-app-1",
        ownerAccountId: "account-ada",
        name: "Product Guide",
        homepageUrl: "javascript:alert(1)",
        createdAt: new Date(),
      }),
    ).toThrow("HTTP(S)");
  });
});
