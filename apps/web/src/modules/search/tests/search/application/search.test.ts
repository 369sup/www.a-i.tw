import { describe, expect, it } from "vitest";
import { createSearchService } from "../../../application/search/use-cases/search-service";
import { InMemorySearchIndex } from "../../../infrastructure/search/repositories/in-memory-search";
describe("search", () =>
  it("filters results by viewer visibility", async () => {
    const s = createSearchService(
      new InMemorySearchIndex(),
      async (x) => x.visibility === "public",
    );
    await s.index({
      id: "1",
      type: "issue",
      title: "Roadmap",
      body: "",
      visibility: "public",
    });
    await s.index({
      id: "2",
      type: "issue",
      title: "Roadmap private",
      body: "",
      visibility: "restricted",
    });
    await expect(s.search("roadmap")).resolves.toHaveLength(1);
  }));
