import type { ProjectsService } from "../../../application/use-cases/projects-service";

function requiredValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  if (!value) throw new Error(`${key} is required.`);
  return value;
}

export function addIssueToProjectFromForm(
  projects: ProjectsService,
  actorPrincipalId: string,
  formData: FormData,
) {
  return projects.addIssue({
    projectId: requiredValue(formData, "projectId"),
    issueId: requiredValue(formData, "issueId"),
    actorPrincipalId,
  });
}
