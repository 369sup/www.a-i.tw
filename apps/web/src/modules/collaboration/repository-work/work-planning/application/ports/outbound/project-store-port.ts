import type { Project } from "../../../domain/work-planning/aggregates/project";

export interface ProjectStore {
  list(ownerAccountId: string): Promise<Project[]>;
  find(id: string): Promise<Project | undefined>;
  save(project: Project): Promise<void>;
}
