"use server";

import { revalidatePath } from "next/cache";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";
import {
  addDraftToProjectFromForm,
  addIssueToProjectFromForm,
  createProjectFromForm,
} from "@/src/modules/collaboration/repository-work/work-planning/public-api";

export async function createProjectAction(formData: FormData) {
  const { projects } = getProductComposition();
  const session = await requireConsoleAuthentication();
  await createProjectFromForm(
    projects,
    session.principal.principalId,
    formData,
  );
  revalidatePath("/projects");
}

export async function addProjectDraftAction(formData: FormData) {
  const { projects } = getProductComposition();
  const session = await requireConsoleAuthentication();
  await addDraftToProjectFromForm(
    projects,
    session.principal.principalId,
    formData,
  );
  revalidatePath("/projects");
}

export async function addProjectIssueAction(formData: FormData) {
  const { projects } = getProductComposition();
  const session = await requireConsoleAuthentication();
  await addIssueToProjectFromForm(
    projects,
    session.principal.principalId,
    formData,
  );
  revalidatePath("/projects");
}
