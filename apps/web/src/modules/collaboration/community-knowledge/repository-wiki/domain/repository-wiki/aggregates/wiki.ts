import { DuplicateWikiPageTitleError } from "../errors/duplicate-wiki-page-title-error";
import { InvalidWikiPageError } from "../errors/invalid-wiki-page-error";
import { createWikiPage, type WikiPage } from "../entities/wiki-page";

export type Wiki = Readonly<{
  repositoryId: string;
  pages: readonly WikiPage[];
}>;

export function createWiki(repositoryId: string): Wiki {
  const normalized = repositoryId.trim();
  if (!normalized)
    throw new InvalidWikiPageError(
      "Wiki Repository identity must not be empty.",
    );
  return { repositoryId: normalized, pages: [] };
}

export function addWikiPage(
  wiki: Wiki,
  input: { pageId: string; title: string; content: string },
): Readonly<{ wiki: Wiki; page: WikiPage }> {
  const page = createWikiPage(input);
  if (
    wiki.pages.some(
      (existing) => existing.title.comparisonKey === page.title.comparisonKey,
    )
  )
    throw new DuplicateWikiPageTitleError();
  return { wiki: { ...wiki, pages: [...wiki.pages, page] }, page };
}

export function findWikiPage(wiki: Wiki, pageId: string): WikiPage | undefined {
  return wiki.pages.find((page) => page.pageId === pageId);
}
