import {
  addProjectItem,
  createProject,
  type Project,
} from "../../../domain/projects/aggregates/project";
export interface ProjectStore {
  list(ownerAccountId: string): Promise<Project[]>;
  find(id: string): Promise<Project | undefined>;
  save(project: Project): Promise<void>;
}
export interface ProjectsService {
  create(input: {
    ownerAccountId: string;
    title: string;
    visibility: "public" | "private";
  }): Promise<Project>;
  addItem(input: { projectId: string; itemId: string }): Promise<Project>;
  list(ownerAccountId: string): Promise<Project[]>;
}
export function createProjectsService(
  store: ProjectStore,
  nextId: () => string,
): ProjectsService {
  return {
    list: (owner) => store.list(owner),
    async create(input) {
      const project = createProject({ id: nextId(), ...input });
      await store.save(project);
      return project;
    },
    async addItem(input) {
      const project = await store.find(input.projectId);
      if (!project) throw new Error("Project not found.");
      const updated = addProjectItem(project, input.itemId);
      await store.save(updated);
      return updated;
    },
  };
}
