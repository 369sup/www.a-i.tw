import {
  addProjectItem,
  createProject,
  type Project,
} from "../../domain/work-planning/aggregates/project";
import type { ProjectSummaryV1 } from "../../contracts/v1/public";
import type { AccountOwnerDirectory } from "../ports/outbound/account-owner-directory.port";
import type { IssueDirectory } from "../ports/outbound/issue-directory.port";
export interface ProjectStore {
  list(ownerAccountId: string): Promise<Project[]>;
  find(id: string): Promise<Project | undefined>;
  save(project: Project): Promise<void>;
}
export interface ProjectsService {
  create(input: {
    ownerAccountId: string;
    actorPrincipalId: string;
    title: string;
    visibility: "public" | "private";
  }): Promise<ProjectSummaryV1>;
  addIssue(input: {
    projectId: string;
    issueId: string;
    actorPrincipalId: string;
  }): Promise<ProjectSummaryV1>;
  addDraft(input: {
    projectId: string;
    title: string;
    body?: string;
    actorPrincipalId: string;
  }): Promise<ProjectSummaryV1>;
  list(ownerAccountId: string): Promise<ProjectSummaryV1[]>;
}
export function createProjectsService(
  store: ProjectStore,
  accountOwners: AccountOwnerDirectory,
  issueDirectory: IssueDirectory,
  nextId: () => string,
): ProjectsService {
  const summary = (project: Project): ProjectSummaryV1 => ({
    projectId: project.id,
    ownerAccountId: project.ownerAccountId,
    title: project.title,
    visibility: project.visibility,
    items: project.items,
  });
  const requireOwner = async (accountId: string, principalId: string) => {
    if (!(await accountOwners.isOwner({ accountId, principalId })))
      throw new Error("Project owner authorization denied.");
  };
  const requiredProject = async (projectId: string) => {
    const project = await store.find(projectId);
    if (!project) throw new Error("Project not found.");
    return project;
  };
  return {
    async list(owner) {
      return (await store.list(owner)).map(summary);
    },
    async create(input) {
      await requireOwner(input.ownerAccountId, input.actorPrincipalId);
      const project = createProject({
        id: nextId(),
        ownerAccountId: input.ownerAccountId,
        title: input.title,
        visibility: input.visibility,
      });
      await store.save(project);
      return summary(project);
    },
    async addIssue(input) {
      const project = await requiredProject(input.projectId);
      await requireOwner(project.ownerAccountId, input.actorPrincipalId);
      if (!(await issueDirectory.find(input.issueId)))
        throw new Error("Issue reference not found.");
      const updated = addProjectItem(project, {
        itemId: nextId(),
        type: "issue",
        issueId: input.issueId,
      });
      await store.save(updated);
      return summary(updated);
    },
    async addDraft(input) {
      const project = await requiredProject(input.projectId);
      await requireOwner(project.ownerAccountId, input.actorPrincipalId);
      const title = input.title.trim();
      if (!title) throw new Error("Draft item title is required.");
      const updated = addProjectItem(project, {
        itemId: nextId(),
        type: "draft",
        title,
        body: input.body,
      });
      await store.save(updated);
      return summary(updated);
    },
  };
}
