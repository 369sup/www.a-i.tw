export type Project = Readonly<{
  id: string;
  ownerAccountId: string;
  title: string;
  visibility: "public" | "private";
  itemIds: readonly string[];
}>;
export function createProject(input: Omit<Project, "itemIds">): Project {
  if (!input.title.trim()) throw new Error("Project title is required.");
  return { ...input, title: input.title.trim(), itemIds: [] };
}
export function addProjectItem(project: Project, itemId: string): Project {
  if (!itemId) throw new Error("Project item reference is required.");
  return project.itemIds.includes(itemId)
    ? project
    : { ...project, itemIds: [...project.itemIds, itemId] };
}
