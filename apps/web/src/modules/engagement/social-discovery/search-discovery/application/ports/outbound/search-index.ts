import type { SearchDocumentProjection } from "../../../domain/search-discovery/entities/search-document";

export interface SearchIndex {
  replaceForViewer(
    viewerId: string,
    documents: readonly SearchDocumentProjection[],
  ): Promise<void>;
  allForViewer(viewerId: string): Promise<readonly SearchDocumentProjection[]>;
}
