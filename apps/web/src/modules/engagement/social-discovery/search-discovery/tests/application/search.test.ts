import { describe, expect, it } from "vitest";
import { createSearchService } from "../../application/use-cases/search-service";
import { InMemorySearchIndex } from "../../adapters/outbound/persistence/in-memory-search";

describe("Search application", () => {
  it("queries only the authenticated viewer's indexed projections", async () => {
    const search = createSearchService(new InMemorySearchIndex());
    await search.replaceViewerIndex("viewer-1", [
      {
        resourceId: "issue-1",
        resourceType: "issue",
        title: "Roadmap",
        href: "/repositories?repository=1",
        ownerLabel: "ada",
      },
    ]);
    await search.replaceViewerIndex("viewer-2", [
      {
        resourceId: "issue-2",
        resourceType: "issue",
        title: "Roadmap private",
        href: "/repositories?repository=2",
        ownerLabel: "grace",
      },
    ]);

    await expect(search.search("viewer-1", "roadmap")).resolves.toEqual([
      {
        id: "issue-1",
        type: "issue",
        title: "Roadmap",
        href: "/repositories?repository=1",
        ownerLabel: "ada",
      },
    ]);
  });

  it("replaces a viewer snapshot so stale projections are not returned", async () => {
    const search = createSearchService(new InMemorySearchIndex());
    await search.replaceViewerIndex("viewer-1", [
      {
        resourceId: "repository-1",
        resourceType: "repository",
        title: "Legacy notes",
        href: "/repositories?repository=1",
        ownerLabel: "ada",
      },
    ]);
    await search.replaceViewerIndex("viewer-1", []);

    await expect(search.search("viewer-1", "legacy")).resolves.toEqual([]);
  });
});
