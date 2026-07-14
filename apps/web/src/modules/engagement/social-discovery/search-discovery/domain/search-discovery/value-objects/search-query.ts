import { InvalidSearchQueryError } from "../errors/invalid-search-query.error";

export type SearchQuery = Readonly<{
  value: string;
  comparisonText: string;
}>;

export function createSearchQuery(value: string): SearchQuery {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized)
    throw new InvalidSearchQueryError("Search Query must not be empty.");
  return {
    value: normalized,
    comparisonText: normalized.toLocaleLowerCase(),
  };
}
