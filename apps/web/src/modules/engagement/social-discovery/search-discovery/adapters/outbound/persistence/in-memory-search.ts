import type { SearchIndex } from "../../../application/ports/outbound/search-index";
import type { SearchDocumentProjection } from "../../../domain/search-discovery/entities/search-document";

export class InMemorySearchIndex implements SearchIndex {
  private readonly viewers = new Map<
    string,
    Map<string, SearchDocumentProjection>
  >();

  async allForViewer(viewerId: string) {
    return Array.from(this.viewers.get(viewerId)?.values() ?? []);
  }

  async replaceForViewer(
    viewerId: string,
    documents: readonly SearchDocumentProjection[],
  ) {
    this.viewers.set(
      viewerId,
      new Map(documents.map((document) => [document.documentId, document])),
    );
  }
}
