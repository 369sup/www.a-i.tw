import type { ProjectsService } from "../../../application/use-cases/projects-service";

function requiredValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required.`);
  return value;
}

export function createProjectFromForm(
  projects: ProjectsService,
  actorPrincipalId: string,
  formData: FormData,
) {
  return projects.create({
    ownerAccountId: requiredValue(formData, "ownerAccountId"),
    actorPrincipalId,
    title: requiredValue(formData, "title"),
    visibility:
      String(formData.get("visibility")) === "public" ? "public" : "private",
  });
}
