import { describe, expect, it } from "vitest";

import { createRepository } from "../../domain/repository-governance/aggregates/repository";
import { createRepositoryHomepageUrl } from "../../domain/repository-governance/value-objects/repository-homepage-url";
import { createRepositoryName } from "../../domain/repository-governance/value-objects/repository-name";
import { createRepositoryOwnerReference } from "../../domain/repository-governance/value-objects/repository-owner-reference";
import { createRepositoryVisibility } from "../../domain/repository-governance/value-objects/repository-visibility";

describe("Repository core value objects", () => {
  it("canonicalizes Repository name and derives NameWithOwner", () => {
    const repository = createRepository({
      id: "repository-1",
      owner: {
        accountId: "account-1",
        login: "Octo-Org",
        kind: "organization",
      },
      name: "Product Roadmap",
      description: "  Planning without code.  ",
      homepageUrl: "https://example.com/repository",
      visibility: "internal",
    });

    expect(repository).toMatchObject({
      id: "repository-1",
      owner: {
        type: "organization",
        accountId: "account-1",
        login: "octo-org",
      },
      name: "product-roadmap",
      nameWithOwner: "octo-org/product-roadmap",
      description: "Planning without code.",
      homepageUrl: "https://example.com/repository",
      visibility: "internal",
      status: "active",
    });
  });

  it("distinguishes Personal Account and Organization ownership", () => {
    expect(
      createRepositoryOwnerReference({
        accountId: "account-personal",
        login: "octocat",
        kind: "personal",
      }),
    ).toEqual({
      type: "personal-account",
      accountId: "account-personal",
      login: "octocat",
    });
  });

  it("rejects invalid names, visibility, and homepage protocols", () => {
    expect(() => createRepositoryName("bad/name")).toThrow();
    expect(() => createRepositoryVisibility("visible")).toThrow();
    expect(() => createRepositoryHomepageUrl("javascript:alert(1)")).toThrow();
  });

  it("keeps an omitted Repository homepage absent", () => {
    const repository = createRepository({
      id: "repository-without-homepage",
      owner: {
        accountId: "account-personal",
        login: "octocat",
        kind: "personal",
      },
      name: "notes",
      description: "",
      homepageUrl: "   ",
      visibility: "private",
    });

    expect(repository.homepageUrl).toBeUndefined();
  });
});
