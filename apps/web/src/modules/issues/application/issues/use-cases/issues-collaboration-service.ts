import {
  createIssueComment,
  createIssueDependency,
  createMilestone,
  type IssueComment,
  type IssueDependency,
  type Milestone,
} from "../../../domain/issues/entities/issue-collaboration";
export interface IssueCollaborationStore {
  comments(issueId: string): Promise<IssueComment[]>;
  saveComment(value: IssueComment): Promise<void>;
  saveMilestone(value: Milestone): Promise<void>;
  saveDependency(value: IssueDependency): Promise<void>;
}
export function createIssueCollaborationService(
  store: IssueCollaborationStore,
  nextId: () => string,
  now: () => Date,
) {
  return {
    comments: (id: string) => store.comments(id),
    async comment(input: {
      issueId: string;
      authorPrincipalId: string;
      body: string;
    }) {
      const value = createIssueComment({
        ...input,
        id: nextId(),
        createdAt: now().toISOString(),
      });
      await store.saveComment(value);
      return value;
    },
    async createMilestone(input: {
      repositoryId: string;
      title: string;
      dueOn?: string;
    }) {
      const value = createMilestone({ ...input, id: nextId() });
      await store.saveMilestone(value);
      return value;
    },
    async block(blockedIssueId: string, blockingIssueId: string) {
      const value = createIssueDependency(blockedIssueId, blockingIssueId);
      await store.saveDependency(value);
      return value;
    },
  };
}
