export type SubTemplate = Readonly<{
  id: string;
  title: string;
  content: string;
  status: "draft" | "active";
}>;

export function createSubTemplate(input: SubTemplate): SubTemplate {
  const id = input.id.trim().toLowerCase();
  const title = input.title.trim();
  if (!/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/.test(id)) {
    throw new Error("Sub-template id is invalid.");
  }
  if (!title) throw new Error("Sub-template title is required.");
  return { ...input, id, title };
}
