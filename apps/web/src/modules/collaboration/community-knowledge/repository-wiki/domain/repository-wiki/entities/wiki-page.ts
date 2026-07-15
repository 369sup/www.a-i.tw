import { InvalidWikiPageError } from "../errors/invalid-wiki-page-error";
import {
  createWikiPageContent,
  type WikiPageContent,
} from "../value-objects/wiki-page-content";
import {
  createWikiPageTitle,
  type WikiPageTitle,
} from "../value-objects/wiki-page-title";

export type WikiPage = Readonly<{
  pageId: string;
  title: WikiPageTitle;
  content: WikiPageContent;
  publicationState: "published";
}>;

export function createWikiPage(input: {
  pageId: string;
  title: string;
  content: string;
}): WikiPage {
  const pageId = input.pageId.trim();
  if (!pageId)
    throw new InvalidWikiPageError("Wiki page identity must not be empty.");
  return {
    pageId,
    title: createWikiPageTitle(input.title),
    content: createWikiPageContent(input.content),
    publicationState: "published",
  };
}
