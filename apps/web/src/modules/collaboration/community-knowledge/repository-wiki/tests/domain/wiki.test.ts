import { describe, expect, it } from "vitest";
import {
  addWikiPage,
  createWiki,
} from "../../domain/repository-wiki/aggregates/wiki";

describe("Knowledge Wiki domain", () => {
  it("normalizes a title and publishes the first non-empty page", () => {
    const result = addWikiPage(createWiki("repository-1"), {
      pageId: "page-1",
      title: "  Getting   Started ",
      content: "Welcome",
    });

    expect(result.page).toMatchObject({
      pageId: "page-1",
      title: { value: "Getting Started", comparisonKey: "getting started" },
      publicationState: "published",
    });
    expect(result.wiki.pages).toHaveLength(1);
  });

  it("rejects empty content and duplicate normalized titles", () => {
    expect(() =>
      addWikiPage(createWiki("repository-1"), {
        pageId: "page-1",
        title: "Home",
        content: "   ",
      }),
    ).toThrow("content must not be empty");

    const first = addWikiPage(createWiki("repository-1"), {
      pageId: "page-1",
      title: "Getting Started",
      content: "First",
    }).wiki;
    expect(() =>
      addWikiPage(first, {
        pageId: "page-2",
        title: " getting   started ",
        content: "Second",
      }),
    ).toThrow("title already exists");
  });
});
