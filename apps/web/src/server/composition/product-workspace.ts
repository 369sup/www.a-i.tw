import "server-only";

import {
  createAccountService,
  createMembershipService,
  createProfileService,
  createTeamService,
} from "@/src/modules/account/public-api";
import {
  InMemoryAccountStore,
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
  InMemoryProfileStore,
  InMemoryTeamStore,
} from "@/src/modules/account/composition";
import { createIdentityAccessService } from "@/src/modules/identity-access/public-api";
import {
  InMemoryPrincipalStore,
  InMemorySessionStore,
  MockCredentialVerifier,
} from "@/src/modules/identity-access/composition";
import { createRepositoryService } from "@/src/modules/repository/public-api";
import {
  AccountDirectoryAdapter,
  EnterpriseRepositoryGovernanceAdapter,
  InMemoryAccessGrantStore,
  InMemoryRepositoryStore,
} from "@/src/modules/repository/composition";
import { createEnterpriseGovernanceService } from "@/src/modules/enterprise-governance/public-api";
import {
  InMemoryEnterpriseStore,
  OrganizationDirectoryAdapter,
} from "@/src/modules/enterprise-governance/composition";
import { createIssuesService } from "@/src/modules/issues/public-api";
import {
  InMemoryIssueNumberSequence,
  InMemoryIssueStore,
  InMemoryLabelStore,
  RepositoryParticipationAdapter,
} from "@/src/modules/issues/composition";
import { createProjectsService } from "@/src/modules/projects/public-api";
import {
  AccountOwnerDirectoryAdapter,
  InMemoryProjectStore,
  IssueDirectoryAdapter,
} from "@/src/modules/projects/composition";
import { createDiscussionsService } from "@/src/modules/discussions/public-api";
import { InMemoryDiscussionStore } from "@/src/modules/discussions/composition";
import { createNotificationsService } from "@/src/modules/notifications/public-api";
import { InMemoryNotificationStore } from "@/src/modules/notifications/composition";
import { createSearchService } from "@/src/modules/search/public-api";
import { InMemorySearchIndex } from "@/src/modules/search/composition";
import { createActivityFeedService } from "@/src/modules/activity-feed/public-api";
import { InMemoryFeedStore } from "@/src/modules/activity-feed/composition";
import { createAuditService } from "@/src/modules/audit/public-api";
import { InMemoryAuditStore } from "@/src/modules/audit/composition";

function createProductWorkspace() {
  let sequence = 100;
  const nextId = (prefix: string) => () => `${prefix}-${++sequence}`;
  const identity = createIdentityAccessService(
    new InMemoryPrincipalStore([
      {
        id: "principal-ada",
        kind: "user",
        status: "active",
      },
      {
        id: "principal-grace",
        kind: "user",
        status: "active",
      },
      {
        id: "principal-linus",
        kind: "user",
        status: "active",
      },
    ]),
    new MockCredentialVerifier(),
    new InMemorySessionStore(),
    nextId("session"),
    () => new Date(),
  );
  const accountStore = new InMemoryAccountStore([
    {
      id: "account-ada",
      handle: "ada",
      kind: "personal",
      status: "active",
      principalId: "principal-ada",
    },
    {
      id: "account-analytical",
      handle: "analytical-engine",
      kind: "organization",
      status: "active",
    },
    {
      id: "account-grace",
      handle: "grace",
      kind: "personal",
      status: "active",
      principalId: "principal-grace",
    },
  ]);
  const profileStore = new InMemoryProfileStore([
    {
      accountId: "account-ada",
      displayName: "Ada Lovelace",
      bio: "Exploring product semantics and collaborative systems.",
      location: "London",
      websiteUrl: "https://www.a-i.tw",
    },
    {
      accountId: "account-analytical",
      displayName: "Analytical Engine",
      bio: "Organization governance and product planning.",
    },
    {
      accountId: "account-grace",
      displayName: "Grace Hopper",
      bio: "Building reliable collaborative systems.",
    },
  ]);
  const membershipStore = new InMemoryMembershipStore([
    {
      id: "membership-analytical-ada",
      accountId: "account-analytical",
      principalId: "principal-ada",
      role: "owner",
      status: "active",
      joinedAt: new Date(0).toISOString(),
    },
  ]);
  const accounts = createAccountService(
    accountStore,
    profileStore,
    membershipStore,
    nextId("account"),
    nextId("membership"),
    () => new Date(),
  );
  const profiles = createProfileService(accountStore, profileStore);
  const memberships = createMembershipService(
    accountStore,
    membershipStore,
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
  const accountDirectoryApi = {
    eligibility: (id: string) => accounts.eligibility(id),
    membership: (accountId: string, principalId: string) =>
      memberships.membership(accountId, principalId),
    teamMemberships: (accountId: string, principalId: string) =>
      teams.memberships(accountId, principalId),
  };
  const enterpriseGovernance = createEnterpriseGovernanceService(
    new InMemoryEnterpriseStore(),
    new OrganizationDirectoryAdapter(accountDirectoryApi),
    nextId("enterprise"),
    () => new Date(),
  );
  const repositories = createRepositoryService(
    new InMemoryRepositoryStore([
      {
        id: "repository-notes",
        ownerAccountId: "account-ada",
        name: "research-notes",
        description: "A private space for early product research.",
        visibility: "private",
        status: "active",
      },
      {
        id: "repository-roadmap",
        ownerAccountId: "account-analytical",
        name: "product-roadmap",
        description: "Planning and governance for the organization.",
        visibility: "public",
        status: "active",
      },
    ]),
    new InMemoryAccessGrantStore(),
    new AccountDirectoryAdapter(accountDirectoryApi),
    new EnterpriseRepositoryGovernanceAdapter(enterpriseGovernance),
    nextId("repository"),
  );
  const issues = createIssuesService(
    new InMemoryIssueStore(),
    new InMemoryLabelStore(),
    new InMemoryIssueNumberSequence(),
    new RepositoryParticipationAdapter(repositories),
    nextId("issue"),
    nextId("label"),
  );
  const projects = createProjectsService(
    new InMemoryProjectStore(),
    new AccountOwnerDirectoryAdapter(accountDirectoryApi),
    new IssueDirectoryAdapter(issues),
    nextId("project"),
  );
  const discussions = createDiscussionsService(
    new InMemoryDiscussionStore(),
    nextId("discussion"),
  );
  const notifications = createNotificationsService(
    new InMemoryNotificationStore(),
    nextId("notification"),
    () => new Date(),
  );
  const search = createSearchService(
    new InMemorySearchIndex(),
    async (document) => document.visibility === "public",
  );
  const activityFeed = createActivityFeedService(
    new InMemoryFeedStore(),
    nextId("feed"),
    () => new Date(),
  );
  const audit = createAuditService(
    new InMemoryAuditStore(),
    nextId("audit"),
    () => new Date(),
  );
  return {
    identity,
    accounts,
    profiles,
    memberships,
    teams,
    enterpriseGovernance,
    repositories,
    issues,
    projects,
    discussions,
    notifications,
    search,
    activityFeed,
    audit,
  };
}

type ProductWorkspace = ReturnType<typeof createProductWorkspace>;
const globalForProduct = globalThis as typeof globalThis & {
  productWorkspace?: ProductWorkspace;
};

export function getProductWorkspace() {
  globalForProduct.productWorkspace ??= createProductWorkspace();
  return globalForProduct.productWorkspace;
}
