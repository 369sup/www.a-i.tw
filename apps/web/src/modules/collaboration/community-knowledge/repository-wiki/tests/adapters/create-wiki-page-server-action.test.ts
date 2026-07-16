import { describe, expect, it, vi } from "vitest";
import { createWikiPageFromForm } from "../../adapters/inbound/server-actions/create-wiki-page";
import type { KnowledgeWikiService } from "../../application/use-cases/repository-wiki-service";

function formData(values: Readonly<Record<string, string>>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe("Create Wiki Page Server Action adapter", () => {
  it("maps FormData and the authenticated Principal to the use case", async () => {
    const wiki = {
      createPage: vi.fn(),
      getPage: vi.fn(),
    } satisfies KnowledgeWikiService;

    await createWikiPageFromForm(
      wiki,
      { principalId: "principal-1", status: "active" },
      formData({
        repositoryId: "repository-1",
        pageId: "home",
        title: " Home ",
        content: " Welcome ",
      }),
    );

    expect(wiki.createPage).toHaveBeenCalledWith({
      repositoryId: "repository-1",
      pageId: "home",
      title: "Home",
      content: "Welcome",
      principal: { principalId: "principal-1", status: "active" },
    });
  });

  it("rejects incomplete transport input", () => {
    const wiki = {
      createPage: vi.fn(),
      getPage: vi.fn(),
    } satisfies KnowledgeWikiService;

    expect(() =>
      createWikiPageFromForm(
        wiki,
        { principalId: "principal-1", status: "active" },
        formData({
          repositoryId: "repository-1",
          pageId: "home",
          title: "Home",
        }),
      ),
    ).toThrow("content is required.");
    expect(wiki.createPage).not.toHaveBeenCalled();
  });
});
