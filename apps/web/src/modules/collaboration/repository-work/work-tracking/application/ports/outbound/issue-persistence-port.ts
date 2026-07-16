import type { Issue } from "../../../domain/work-tracking/aggregates/issue";
import type { Label } from "../../../domain/work-tracking/entities/label";

export interface IssueDirectory {
  find(id: string): Promise<{ id: string; repositoryId: string } | undefined>;
}

export interface IssueStore extends IssueDirectory {
  list(repositoryId: string): Promise<Issue[]>;
  find(id: string): Promise<Issue | undefined>;
  save(issue: Issue): Promise<void>;
}

export interface LabelStore {
  list(repositoryId: string): Promise<Label[]>;
  find(id: string): Promise<Label | undefined>;
  findByName(repositoryId: string, name: string): Promise<Label | undefined>;
  save(label: Label): Promise<void>;
}

export interface IssueNumberSequence {
  next(repositoryId: string): Promise<number>;
}
