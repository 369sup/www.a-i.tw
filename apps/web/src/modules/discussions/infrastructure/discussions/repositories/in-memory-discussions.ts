import type { DiscussionStore } from "../../../application/discussions/use-cases/discussions-service";
import type { Discussion } from "../../../domain/discussions/aggregates/discussion";
export class InMemoryDiscussionStore implements DiscussionStore {
  private readonly items = new Map<string, Discussion>();
  async list(id: string) {
    return Array.from(this.items.values()).filter((x) => x.repositoryId === id);
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async save(v: Discussion) {
    this.items.set(v.id, v);
  }
}
