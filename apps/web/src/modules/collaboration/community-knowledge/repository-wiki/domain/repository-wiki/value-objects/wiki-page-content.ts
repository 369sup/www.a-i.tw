import { InvalidWikiPageError } from "../errors/invalid-wiki-page.error";

export type WikiPageContent = string & { readonly __brand: "WikiPageContent" };

export function createWikiPageContent(value: string): WikiPageContent {
  if (!value.trim())
    throw new InvalidWikiPageError("Wiki page content must not be empty.");
  return value as WikiPageContent;
}
