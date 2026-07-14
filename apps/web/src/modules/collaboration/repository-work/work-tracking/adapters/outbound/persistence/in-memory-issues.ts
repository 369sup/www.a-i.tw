import type {
  IssueNumberSequence,
  IssueStore,
  LabelStore,
} from "../../../application/use-cases/issues-service";
import type { Issue } from "../../../domain/work-tracking/aggregates/issue";
import type { Label } from "../../../domain/work-tracking/entities/label";
export class InMemoryIssueStore implements IssueStore {
  private readonly items = new Map<string, Issue>();
  async list(repositoryId: string) {
    return Array.from(this.items.values()).filter(
      (item) => item.repositoryId === repositoryId,
    );
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async save(issue: Issue) {
    this.items.set(issue.id, issue);
  }
}
export class InMemoryLabelStore implements LabelStore {
  private readonly items = new Map<string, Label>();
  async list(repositoryId: string) {
    return Array.from(this.items.values()).filter(
      (item) => item.repositoryId === repositoryId,
    );
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async findByName(repositoryId: string, name: string) {
    return Array.from(this.items.values()).find(
      (item) => item.repositoryId === repositoryId && item.name === name,
    );
  }
  async save(label: Label) {
    this.items.set(label.id, label);
  }
}
export class InMemoryIssueNumberSequence implements IssueNumberSequence {
  private readonly values = new Map<string, number>();
  async next(repositoryId: string) {
    const value = (this.values.get(repositoryId) ?? 0) + 1;
    this.values.set(repositoryId, value);
    return value;
  }
}
