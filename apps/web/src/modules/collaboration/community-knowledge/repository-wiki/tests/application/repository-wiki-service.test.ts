import { describe, expect, it } from "vitest";
import { createInMemoryWikiStore } from "../../adapters/outbound/persistence/in-memory-wiki-store";
import { createRepositoryWikiService } from "../../application/use-cases/repository-wiki-service";
import {
  addWikiPage,
  createWiki,
} from "../../domain/repository-wiki/aggregates/wiki";

const principal = { principalId: "principal-1", status: "active" } as const;

function createFixture(input?: {
  status?: "active" | "archived" | "disabled";
  wikiEnabled?: boolean;
  allowed?: boolean;
}) {
  const store = createInMemoryWikiStore();
  const service = createRepositoryWikiService(store, {
    async scope(repositoryId) {
      return {
        repositoryId,
        status: input?.status ?? "active",
        wikiEnabled: input?.wikiEnabled ?? true,
      };
    },
    async allowed() {
      return input?.allowed ?? true;
    },
  });
  return { service, store };
}

describe("Knowledge Wiki application", () => {
  it("creates and reads a page through Knowledge-owned state", async () => {
    const { service } = createFixture();
    await expect(
      service.createPage({
        repositoryId: "repository-1",
        pageId: "page-1",
        title: "Home",
        content: "Welcome",
        principal,
      }),
    ).resolves.toMatchObject({ pageId: "page-1", title: "Home" });
    await expect(
      service.getPage({
        repositoryId: "repository-1",
        pageId: "page-1",
        principal,
      }),
    ).resolves.toMatchObject({ content: "Welcome" });
  });

  it("fails closed when Wiki is disabled or write access is denied", async () => {
    const disabled = createFixture({ wikiEnabled: false }).service;
    await expect(
      disabled.createPage({
        repositoryId: "repository-1",
        pageId: "page-1",
        title: "Home",
        content: "Welcome",
        principal,
      }),
    ).rejects.toThrow("Wiki is disabled");

    const denied = createFixture({ allowed: false }).service;
    await expect(
      denied.createPage({
        repositoryId: "repository-1",
        pageId: "page-1",
        title: "Home",
        content: "Welcome",
        principal,
      }),
    ).rejects.toThrow("write access denied");
  });

  it("allows reads but rejects writes for an archived Repository", async () => {
    const { service, store } = createFixture({ status: "archived" });
    await store.save(addSeedPage("repository-1", "page-1", "Home", "Welcome"));
    await expect(
      service.getPage({
        repositoryId: "repository-1",
        pageId: "page-1",
        principal,
      }),
    ).resolves.toMatchObject({ title: "Home" });
    await expect(
      service.createPage({
        repositoryId: "repository-1",
        pageId: "page-2",
        title: "Second",
        content: "No",
        principal,
      }),
    ).rejects.toThrow("read-only");
  });
});

function addSeedPage(
  repositoryId: string,
  pageId: string,
  title: string,
  content: string,
) {
  return addWikiPage(createWiki(repositoryId), { pageId, title, content }).wiki;
}
