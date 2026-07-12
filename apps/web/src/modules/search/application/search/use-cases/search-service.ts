import {
  matchesSearch,
  type SearchDocument,
} from "../../../domain/search/entities/search-document";
export interface SearchIndex {
  all(): Promise<SearchDocument[]>;
  upsert(value: SearchDocument): Promise<void>;
}
export function createSearchService(
  index: SearchIndex,
  canView: (value: SearchDocument, viewer?: string) => Promise<boolean>,
) {
  return {
    index: (value: SearchDocument) => index.upsert(value),
    async search(query: string, viewer?: string) {
      const found = (await index.all()).filter((x) => matchesSearch(x, query));
      const visible = [];
      for (const item of found)
        if (await canView(item, viewer)) visible.push(item);
      return visible;
    },
  };
}
