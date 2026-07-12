import type { IssueCollaborationStore } from "../../../application/issues/use-cases/issues-collaboration-service";
import type {
  IssueComment,
  IssueDependency,
  Milestone,
} from "../../../domain/issues/entities/issue-collaboration";
export class InMemoryIssueCollaborationStore implements IssueCollaborationStore {
  readonly commentItems: IssueComment[] = [];
  readonly milestones: Milestone[] = [];
  readonly dependencies: IssueDependency[] = [];
  async comments(id: string) {
    return this.commentItems.filter((x) => x.issueId === id);
  }
  async saveComment(v: IssueComment) {
    this.commentItems.push(v);
  }
  async saveMilestone(v: Milestone) {
    this.milestones.push(v);
  }
  async saveDependency(v: IssueDependency) {
    this.dependencies.push(v);
  }
}
