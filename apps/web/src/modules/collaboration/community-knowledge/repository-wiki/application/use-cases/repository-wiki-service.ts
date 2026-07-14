import type { WikiPageV1 } from "../../contracts/v1/public";
import {
  addWikiPage,
  createWiki,
  findWikiPage,
} from "../../domain/repository-wiki/aggregates/wiki";
import type { RepositoryWikiPrincipal } from "../ports/inbound/repository-wiki-principal";
import type { RepositoryWikiParticipation } from "../ports/outbound/repository-wiki-participation.port";
import type { WikiStore } from "../ports/outbound/wiki-store.port";

export interface KnowledgeWikiService {
  createPage(input: {
    repositoryId: string;
    pageId: string;
    title: string;
    content: string;
    principal: RepositoryWikiPrincipal;
  }): Promise<WikiPageV1>;
  getPage(input: {
    repositoryId: string;
    pageId: string;
    principal: RepositoryWikiPrincipal;
  }): Promise<WikiPageV1 | undefined>;
}

function toContract(page: {
  pageId: string;
  title: { value: string };
  content: string;
  publicationState: "published";
}): WikiPageV1 {
  return {
    pageId: page.pageId,
    title: page.title.value,
    content: page.content,
    publicationState: page.publicationState,
  };
}

async function requireAvailable(
  repositories: RepositoryWikiParticipation,
  repositoryId: string,
  mutation: boolean,
) {
  const scope = await repositories.scope(repositoryId);
  if (!scope) throw new Error("Repository Wiki is unavailable.");
  if (!scope.wikiEnabled) throw new Error("Repository Wiki is disabled.");
  if (scope.status === "disabled") throw new Error("Repository is disabled.");
  if (mutation && scope.status === "archived")
    throw new Error("Archived Repository Wiki is read-only.");
}

export function createRepositoryWikiService(
  store: WikiStore,
  repositories: RepositoryWikiParticipation,
): KnowledgeWikiService {
  return {
    async createPage(input) {
      await requireAvailable(repositories, input.repositoryId, true);
      if (input.principal.status !== "active")
        throw new Error("Active Principal is required.");
      if (
        !(await repositories.allowed({
          repositoryId: input.repositoryId,
          principal: input.principal,
          action: "write",
        }))
      )
        throw new Error("Wiki write access denied.");
      const current =
        (await store.findByRepositoryId(input.repositoryId)) ??
        createWiki(input.repositoryId);
      const result = addWikiPage(current, input);
      await store.save(result.wiki);
      return toContract(result.page);
    },
    async getPage(input) {
      await requireAvailable(repositories, input.repositoryId, false);
      if (input.principal.status !== "active") return undefined;
      if (
        !(await repositories.allowed({
          repositoryId: input.repositoryId,
          principal: input.principal,
          action: "read",
        }))
      )
        return undefined;
      const wiki = await store.findByRepositoryId(input.repositoryId);
      const page = wiki && findWikiPage(wiki, input.pageId);
      return page && toContract(page);
    },
  };
}
