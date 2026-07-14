import type { IssueCollaborationStore } from "../../../application/use-cases/issues-collaboration-service";
import type {
  IssueComment,
  IssueDependency,
  Milestone,
} from "../../../domain/work-tracking/entities/issue-collaboration";
export class InMemoryIssueCollaborationStore implements IssueCollaborationStore {
  readonly commentItems: IssueComment[] = [];
  readonly milestones: Milestone[] = [];
  readonly dependencyItems: IssueDependency[] = [];
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
    this.dependencyItems.push(v);
  }
  async dependencies() {
    return [...this.dependencyItems];
  }
}
