import { describe, expect, it } from "vitest";
import {
  createSearchDocument,
  matchesSearch,
} from "../../domain/search-discovery/entities/search-document";
import { InvalidSearchDocumentError } from "../../domain/search-discovery/errors/invalid-search-document.error";
import { createSearchQuery } from "../../domain/search-discovery/value-objects/search-query";

describe("Search Document projection", () => {
  it("normalizes searchable text without owning the source resource", () => {
    const document = createSearchDocument({
      resourceId: "repository-1",
      resourceType: "repository",
      title: "Design Notes",
      body: "Architecture decisions",
      href: "/repositories?repository=repository-1",
      ownerLabel: "Ada",
    });

    expect(document.documentId).toBe("repository:repository-1");
    expect(matchesSearch(document, createSearchQuery("architecture"))).toBe(
      true,
    );
  });

  it("rejects invalid navigation projections", () => {
    expect(() =>
      createSearchDocument({
        resourceId: "repository-1",
        resourceType: "repository",
        title: "Design Notes",
        href: "https://example.com/repository-1",
        ownerLabel: "Ada",
      }),
    ).toThrow(InvalidSearchDocumentError);
  });
});
