export type Project = Readonly<{
  id: string;
  ownerAccountId: string;
  title: string;
  visibility: "public" | "private";
  items: readonly ProjectItem[];
}>;
export type ProjectItem =
  | Readonly<{ itemId: string; type: "issue"; issueId: string }>
  | Readonly<{ itemId: string; type: "draft"; title: string; body?: string }>;
export function createProject(input: Omit<Project, "items">): Project {
  if (!input.title.trim()) throw new Error("Project title is required.");
  return { ...input, title: input.title.trim(), items: [] };
}
export function addProjectItem(project: Project, item: ProjectItem): Project {
  if (!item.itemId) throw new Error("Project item identity is required.");
  const duplicate = project.items.some(
    (candidate) =>
      candidate.itemId === item.itemId ||
      (candidate.type === "issue" &&
        item.type === "issue" &&
        candidate.issueId === item.issueId),
  );
  return duplicate ? project : { ...project, items: [...project.items, item] };
}
