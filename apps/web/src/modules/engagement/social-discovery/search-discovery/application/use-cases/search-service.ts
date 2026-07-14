import type { SearchResult } from "../dto/search-result";
import type { SearchIndex } from "../ports/outbound/search-index";
import {
  createSearchDocument,
  matchesSearch,
  type SearchDocumentInput,
} from "../../domain/search-discovery/entities/search-document";
import { createSearchQuery } from "../../domain/search-discovery/value-objects/search-query";

function requireViewerId(value: string): string {
  const viewerId = value.trim();
  if (!viewerId) throw new Error("Search viewer identity must not be empty.");
  return viewerId;
}

export function createSearchService(index: SearchIndex) {
  return {
    async replaceViewerIndex(
      viewerId: string,
      inputs: readonly SearchDocumentInput[],
    ): Promise<void> {
      await index.replaceForViewer(
        requireViewerId(viewerId),
        inputs.map(createSearchDocument),
      );
    },
    async search(viewerId: string, query: string): Promise<SearchResult[]> {
      const documents = await index.allForViewer(requireViewerId(viewerId));
      const searchQuery = createSearchQuery(query);
      return documents
        .filter((document) => matchesSearch(document, searchQuery))
        .map((document) => ({
          id: document.resourceId,
          type: document.resourceType,
          title: document.title,
          href: document.href,
          ownerLabel: document.ownerLabel,
        }));
    },
  };
}
