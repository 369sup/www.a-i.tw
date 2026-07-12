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
  dependencies(): Promise<IssueDependency[]>;
}
export interface IssueDirectory {
  find(id: string): Promise<{ id: string; repositoryId: string } | undefined>;
}
export function createIssueCollaborationService(
  store: IssueCollaborationStore,
  issues: IssueDirectory,
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
      const [blocked, blocking] = await Promise.all([
        issues.find(blockedIssueId),
        issues.find(blockingIssueId),
      ]);
      if (!blocked || !blocking)
        throw new Error("Both Issues must exist before creating a dependency.");
      if (blocked.repositoryId !== blocking.repositoryId)
        throw new Error("Issue dependencies must share a Repository scope.");
      const value = createIssueDependency(blockedIssueId, blockingIssueId);
      const dependencies = await store.dependencies();
      if (
        dependencies.some(
          (item) =>
            item.blockedIssueId === blockedIssueId &&
            item.blockingIssueId === blockingIssueId,
        )
      )
        throw new Error("Issue dependency already exists.");
      const graph = new Map<string, string[]>();
      for (const item of dependencies) {
        const edges = graph.get(item.blockedIssueId) ?? [];
        edges.push(item.blockingIssueId);
        graph.set(item.blockedIssueId, edges);
      }
      const reachesBlocked = (
        current: string,
        visited = new Set<string>(),
      ): boolean => {
        if (current === blockedIssueId) return true;
        if (visited.has(current)) return false;
        visited.add(current);
        return (graph.get(current) ?? []).some((next) =>
          reachesBlocked(next, visited),
        );
      };
      if (reachesBlocked(blockingIssueId))
        throw new Error("Issue dependency would create a cycle.");
      await store.saveDependency(value);
      return value;
    },
  };
}
