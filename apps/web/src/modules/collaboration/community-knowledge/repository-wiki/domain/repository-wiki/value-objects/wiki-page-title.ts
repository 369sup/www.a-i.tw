import { InvalidWikiPageError } from "../errors/invalid-wiki-page.error";

export type WikiPageTitle = Readonly<{
  value: string;
  comparisonKey: string;
}>;

export function createWikiPageTitle(value: string): WikiPageTitle {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized)
    throw new InvalidWikiPageError("Wiki page title must not be empty.");
  return { value: normalized, comparisonKey: normalized.toLowerCase() };
}
