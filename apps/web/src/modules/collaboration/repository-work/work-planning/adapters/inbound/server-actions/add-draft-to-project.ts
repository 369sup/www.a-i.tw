import type { ProjectsService } from "../../../application/use-cases/projects-service";

function requiredValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required.`);
  return value;
}

export function addDraftToProjectFromForm(
  projects: ProjectsService,
  actorPrincipalId: string,
  formData: FormData,
) {
  const body = String(formData.get("body") ?? "").trim();
  return projects.addDraft({
    projectId: requiredValue(formData, "projectId"),
    title: requiredValue(formData, "title"),
    body: body || undefined,
    actorPrincipalId,
  });
}
