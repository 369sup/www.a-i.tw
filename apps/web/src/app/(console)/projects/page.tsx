import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";
import { ProjectPlanningUi } from "@/src/modules/collaboration/repository-work/work-planning/public-api";
import {
  addProjectDraftAction,
  addProjectIssueAction,
  createProjectAction,
} from "./project-command-composition";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ owner?: string }>;
}) {
  const { accounts, memberships, projects } = getProductComposition();
  const [session, ownerAccounts, query] = await Promise.all([
    requireConsoleAuthentication(),
    accounts.listAccounts(),
    searchParams,
  ]);
  const eligibleOwnerAccounts: typeof ownerAccounts = [];
  for (const account of ownerAccounts) {
    const ownsAccount =
      ("personalPrincipalId" in account &&
        account.personalPrincipalId === session.principal.principalId) ||
      (
        await memberships.membership(
          account.accountId,
          session.principal.principalId,
        )
      )?.role === "owner";
    if (ownsAccount) eligibleOwnerAccounts.push(account);
  }
  const personalAccount = eligibleOwnerAccounts.find(
    (account) =>
      "personalPrincipalId" in account &&
      account.personalPrincipalId === session.principal.principalId,
  );
  const requestedOwner = eligibleOwnerAccounts.find(
    (account) => account.accountId === query.owner,
  );
  const selectedOwner =
    requestedOwner ?? personalAccount ?? eligibleOwnerAccounts[0];
  if (!selectedOwner) throw new Error("Project owner account is required.");

  return (
    <ProjectPlanningUi
      addDraft={addProjectDraftAction}
      addIssue={addProjectIssueAction}
      createProject={createProjectAction}
      owners={eligibleOwnerAccounts.map((account) => ({
        accountId: account.accountId,
        displayName: account.displayName,
      }))}
      projects={await projects.list(selectedOwner.accountId)}
      selectedOwnerAccountId={selectedOwner.accountId}
    />
  );
}
