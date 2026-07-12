import "server-only";

import {
  createAccountService,
  createMembershipService,
  createTeamService,
} from "@/src/modules/account/src/public";
import {
  InMemoryAccountStore,
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
  InMemoryTeamStore,
} from "@/src/modules/account/src/composition";
import { createIdentityAccessService } from "@/src/modules/identity-access/src/public";
import {
  InMemoryPrincipalStore,
  InMemorySessionStore,
} from "@/src/modules/identity-access/src/composition";
import { createRepositoryService } from "@/src/modules/repository/src/public";
import {
  InMemoryAccessGrantStore,
  InMemoryRepositoryStore,
} from "@/src/modules/repository/src/composition";
import { createWorkManagementService } from "@/src/modules/work-management/src/public";
import {
  InMemoryIssueNumberSequence,
  InMemoryIssueStore,
  InMemoryLabelStore,
} from "@/src/modules/work-management/src/composition";

function createProductWorkspace() {
  let sequence = 100;
  const nextId = (prefix: string) => () => `${prefix}-${++sequence}`;
  const identity = createIdentityAccessService(
    new InMemoryPrincipalStore([
      {
        id: "principal-ada",
        handle: "ada",
        displayName: "Ada Lovelace",
        status: "active",
      },
      {
        id: "principal-grace",
        handle: "grace",
        displayName: "Grace Hopper",
        status: "active",
      },
      {
        id: "principal-linus",
        handle: "linus",
        displayName: "Linus Torvalds",
        status: "active",
      },
    ]),
    new InMemorySessionStore(),
    () => new Date(),
  );
  const accountStore = new InMemoryAccountStore([
    {
      id: "account-ada",
      handle: "ada",
      displayName: "Ada Lovelace",
      kind: "personal",
      status: "active",
      ownerPrincipalId: "principal-ada",
    },
    {
      id: "account-analytical",
      handle: "analytical-engine",
      displayName: "Analytical Engine",
      kind: "organization",
      status: "active",
      ownerPrincipalId: "principal-ada",
    },
    {
      id: "account-grace",
      handle: "grace",
      displayName: "Grace Hopper",
      kind: "personal",
      status: "active",
      ownerPrincipalId: "principal-grace",
    },
  ]);
  const accounts = createAccountService(accountStore, nextId("account"));
  const memberships = createMembershipService(
    accountStore,
    new InMemoryMembershipStore(),
    new InMemoryMembershipInvitationStore(),
    nextId("membership"),
    nextId("invitation"),
    () => new Date(),
  );
  const teams = createTeamService(
    accountStore,
    memberships,
    new InMemoryTeamStore(),
    nextId("team"),
  );
  const repositories = createRepositoryService(
    new InMemoryRepositoryStore([
      {
        id: "repository-notes",
        ownerAccountId: "account-ada",
        ownerHandle: "ada",
        name: "research-notes",
        description: "A private space for early product research.",
        visibility: "private",
        status: "active",
      },
      {
        id: "repository-roadmap",
        ownerAccountId: "account-analytical",
        ownerHandle: "analytical-engine",
        name: "product-roadmap",
        description: "Planning and governance for the organization.",
        visibility: "public",
        status: "active",
      },
    ]),
    new InMemoryAccessGrantStore(),
    {
      eligibility: (id) => accounts.eligibility(id),
      membership: (accountId, principalId) =>
        memberships.membership(accountId, principalId),
      teamMemberships: (accountId, principalId) =>
        teams.memberships(accountId, principalId),
    },
    nextId("repository"),
  );
  const workManagement = createWorkManagementService(
    new InMemoryIssueStore(),
    new InMemoryLabelStore(),
    new InMemoryIssueNumberSequence(),
    {
      scope: (repositoryId) => repositories.collaborationScope(repositoryId),
      allowed: async ({ repositoryId, principal, action }) =>
        (await repositories.participation({ repositoryId, principal, action }))
          .allowed,
    },
    nextId("issue"),
    nextId("label"),
  );
  return {
    identity,
    accounts,
    memberships,
    teams,
    repositories,
    workManagement,
  };
}

type ProductWorkspace = ReturnType<typeof createProductWorkspace>;
const globalForProduct = globalThis as typeof globalThis & {
  productWorkspace?: ProductWorkspace;
};

export async function getProductWorkspace() {
  globalForProduct.productWorkspace ??= createProductWorkspace();
  const workspace = globalForProduct.productWorkspace;
  if (!(await workspace.identity.currentPrincipal()))
    await workspace.identity.authenticate("principal-ada");
  return workspace;
}
