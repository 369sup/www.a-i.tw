import type { SearchIndex } from "../../../application/search/use-cases/search-service";
import type { SearchDocument } from "../../../domain/search/entities/search-document";
export class InMemorySearchIndex implements SearchIndex {
  private readonly items = new Map<string, SearchDocument>();
  async all() {
    return Array.from(this.items.values());
  }
  async upsert(v: SearchDocument) {
    this.items.set(v.id, v);
  }
}
