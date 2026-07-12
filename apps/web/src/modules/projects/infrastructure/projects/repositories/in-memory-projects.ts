import type { ProjectStore } from "../../../application/projects/use-cases/projects-service";
import type { Project } from "../../../domain/projects/aggregates/project";
export class InMemoryProjectStore implements ProjectStore {
  private readonly items = new Map<string, Project>();
  async list(owner: string) {
    return Array.from(this.items.values()).filter(
      (x) => x.ownerAccountId === owner,
    );
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async save(value: Project) {
    this.items.set(value.id, value);
  }
}
