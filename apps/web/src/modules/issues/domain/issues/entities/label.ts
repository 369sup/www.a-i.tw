export type Label = Readonly<{
  id: string;
  repositoryId: string;
  name: string;
  color: string;
  description: string;
}>;
export function normalizeLabelName(value: string) {
  const name = value.trim().toLowerCase();
  if (!name || name.length > 50) throw new Error("Label name is invalid.");
  return name;
}
export function createLabel(
  input: Omit<Label, "name" | "color" | "description"> & {
    name: string;
    color: string;
    description: string;
  },
): Label {
  const color = input.color.trim().replace(/^#/, "").toLowerCase();
  if (!/^[0-9a-f]{6}$/.test(color)) throw new Error("Label color is invalid.");
  return {
    ...input,
    name: normalizeLabelName(input.name),
    color,
    description: input.description.trim(),
  };
}
