import {
  createIssueComment,
  createIssueDependency,
  createMilestone,
  type IssueComment,
  type IssueDependency,
  type Milestone,
} from "../../domain/work-tracking/entities/issue-collaboration";
import type { IssuePrincipal } from "../ports/inbound/issue-principal";
import type { CommunityInteractionSafety } from "../ports/outbound/community-interaction-safety-port";
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
  safety: CommunityInteractionSafety,
  nextId: () => string,
  now: () => Date,
) {
  return {
    comments: (id: string) => store.comments(id),
    async comment(input: {
      issueId: string;
      actor: IssuePrincipal;
      body: string;
    }) {
      const issue = await issues.find(input.issueId);
      if (!issue) throw new Error("Issue not found.");
      if (
        !(await safety.allowed({
          repositoryId: issue.repositoryId,
          principal: input.actor,
          action: "issue_comment",
        }))
      )
        throw new Error("Repository interaction limit denied Issue comment.");
      const value = createIssueComment({
        issueId: input.issueId,
        authorPrincipalId: input.actor.principalId,
        body: input.body,
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
