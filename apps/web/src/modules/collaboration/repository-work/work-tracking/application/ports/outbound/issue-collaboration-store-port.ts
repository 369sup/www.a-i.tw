import type {
  IssueComment,
  IssueDependency,
  Milestone,
} from "../../../domain/work-tracking/entities/issue-collaboration";

export interface IssueCollaborationStore {
  comments(issueId: string): Promise<IssueComment[]>;
  saveComment(value: IssueComment): Promise<void>;
  saveMilestone(value: Milestone): Promise<void>;
  saveDependency(value: IssueDependency): Promise<void>;
  dependencies(): Promise<IssueDependency[]>;
}
