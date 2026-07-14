import "server-only";

import {
  createUserAccountService,
  InMemoryUserAccountStore,
} from "@/src/modules/platform-governance/accounts-profile/user-account/composition";
import {
  createProfileService,
  InMemoryProfileStore,
} from "@/src/modules/platform-governance/accounts-profile/profile-presence/composition";
import {
  createAccountService,
  InMemoryAccountStore,
} from "@/src/modules/platform-governance/accounts-profile/organization-account/composition";
import {
  createFoundingMembershipWriter,
  createMembershipService,
  createTeamService,
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
  InMemoryTeamStore,
} from "@/src/modules/platform-governance/participation-teams/organization-participation/composition";
import {
  createIdentityAccessService,
  InMemoryPrincipalStore,
  InMemorySessionStore,
  MockCredentialVerifier,
} from "@/src/modules/platform-governance/authentication-identity/authentication-security/composition";
import {
  AccountAuthorizationDirectoryAdapter,
  AccountDirectoryAdapter,
  createRepositoryAuthorizationService,
  createRepositoryService,
  EnterpriseRepositoryGovernanceAdapter,
  IdentityDirectoryAdapter,
  InMemoryRepositoryAccessGrantStore,
  InMemoryRepositoryStore,
} from "@/src/modules/collaboration/repository-work/repository-governance/composition";
import {
  createEnterpriseAccountService,
  InMemoryEnterpriseStore,
  OrganizationAccountDirectoryAdapter,
} from "@/src/modules/platform-governance/accounts-profile/enterprise-account/composition";
import {
  createAdministrativeAccessService,
  InMemoryEnterpriseOwnerStore,
} from "@/src/modules/platform-governance/access-policy/administrative-access-control/composition";
import {
  createPolicyGovernanceService,
  InMemoryRepositoryPolicyStore,
} from "@/src/modules/platform-governance/access-policy/policy-governance/composition";
import {
  CommunityInteractionSafetyAdapter as IssueCommunityInteractionSafetyAdapter,
  createIssueCollaborationService,
  createIssuesService,
  InMemoryIssueCollaborationStore,
  InMemoryIssueNumberSequence,
  InMemoryIssueStore,
  InMemoryLabelStore,
  RepositoryParticipationAdapter,
} from "@/src/modules/collaboration/repository-work/work-tracking/composition";
import {
  AccountOwnerDirectoryAdapter,
  createProjectsService,
  InMemoryProjectStore,
  IssueDirectoryAdapter,
} from "@/src/modules/collaboration/repository-work/work-planning/composition";
import {
  CommunityInteractionSafetyAdapter as DiscussionCommunityInteractionSafetyAdapter,
  createDiscussionsService,
  InMemoryDiscussionCategoryStore,
  InMemoryDiscussionStore,
  RepositoryDiscussionParticipationAdapter,
} from "@/src/modules/collaboration/community-knowledge/discussions/composition";
import {
  createKnowledgeWikiComposition,
  createRepositoryWikiParticipationAdapter,
} from "@/src/modules/collaboration/community-knowledge/repository-wiki/composition";
import {
  createCommunitySafetyComposition,
  createRepositorySafetyParticipationAdapter,
} from "@/src/modules/collaboration/community-knowledge/community-safety/composition";
import {
  createRepositoryStarParticipationAdapter,
  createSocialCurationComposition,
} from "@/src/modules/engagement/social-discovery/social-curation/composition";
import {
  createNotificationsService,
  createUnsubscribeNotificationProcess,
  createSubscriptionsService,
  InMemoryNotificationStore,
  InMemorySubscriptionStore,
} from "@/src/modules/engagement/social-discovery/subscriptions-notifications/composition";
import {
  createSearchService,
  InMemorySearchIndex,
  type SearchDocumentInput,
} from "@/src/modules/engagement/social-discovery/search-discovery/composition";
import {
  createActivityFeedService,
  InMemoryFeedStore,
} from "@/src/modules/engagement/social-discovery/activity-feed/composition";
import {
  createAuditService,
  InMemoryAuditStore,
} from "@/src/modules/business-operations/assurance-support/audit-compliance/composition";
import {
  createAppManagementComposition,
  createPersonalAppOwnerDirectoryAdapter,
} from "@/src/modules/ecosystem/apps-marketplace/app-management/composition";

function createProductComposition() {
  let sequence = 100;
  const nextId = (prefix: string) => () => `${prefix}-${++sequence}`;
  const identity = createIdentityAccessService(
    new InMemoryPrincipalStore([
      {
        id: "principal-ada",
        kind: "human",
        status: "active",
      },
      {
        id: "principal-grace",
        kind: "human",
        status: "active",
      },
      {
        id: "principal-linus",
        kind: "human",
        status: "active",
      },
    ]),
    new MockCredentialVerifier(),
    new InMemorySessionStore(),
    nextId("session"),
    nextId("browser-session"),
    () => new Date(),
  );
  const profileStore = new InMemoryProfileStore([
    {
      accountId: "account-ada",
      displayName: "Ada Lovelace",
      bio: "Exploring product semantics and collaborative systems.",
      location: "London",
      websiteUrl: "https://www.a-i.tw",
    },
    {
      accountId: "account-grace",
      displayName: "Grace Hopper",
      bio: "Building reliable collaborative systems.",
    },
    {
      accountId: "account-analytical",
      displayName: "Analytical Engine",
      bio: "Organization governance and product planning.",
    },
  ]);
  const profileDirectoryApi = {
    resolve: (accountId: string) => profileStore.find(accountId),
    save: (profile: Parameters<typeof profileStore.save>[0]) =>
      profileStore.save(profile),
  };
  const personalAccounts = createUserAccountService(
    new InMemoryUserAccountStore([
      {
        id: "account-ada",
        handle: "ada",
        principalId: "principal-ada",
      },
      {
        id: "account-grace",
        handle: "grace",
        principalId: "principal-grace",
      },
    ]),
    profileDirectoryApi,
    nextId("account"),
  );
  const accountStore = new InMemoryAccountStore([
    {
      id: "account-analytical",
      handle: "analytical-engine",
      kind: "organization",
      status: "active",
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
  const organizations = createAccountService(
    accountStore,
    profileDirectoryApi,
    createFoundingMembershipWriter(membershipStore),
    nextId("account"),
    nextId("membership"),
    () => new Date(),
  );
  const organizationDirectoryForParticipation = {
    resolve: (accountId: string) => organizations.resolve(accountId),
  };
  const memberships = createMembershipService(
    organizationDirectoryForParticipation,
    membershipStore,
    new InMemoryMembershipInvitationStore(),
    nextId("membership"),
    nextId("invitation"),
    () => new Date(),
  );
  const teams = createTeamService(
    organizationDirectoryForParticipation,
    memberships,
    new InMemoryTeamStore(),
    nextId("team"),
  );
  const accountProfiles = createProfileService(
    {
      async exists(accountId) {
        return Boolean(
          (await personalAccounts.resolve(accountId)) ??
          (await organizations.resolve(accountId)),
        );
      },
    },
    profileStore,
  );
  const personalAccountDirectoryApi = {
    resolve: (id: string) => personalAccounts.resolve(id),
    resolveByPrincipal: (principalId: string) =>
      personalAccounts.resolveByPrincipal(principalId),
    eligibility: (id: string) => personalAccounts.eligibility(id),
  };
  const organizationAccountDirectoryApi = {
    resolve: (id: string) => organizations.resolve(id),
    eligibility: (id: string) => organizations.eligibility(id),
  };
  const organizationParticipationApi = {
    membership: (accountId: string, principalId: string) =>
      memberships.membership(accountId, principalId),
    teamMemberships: (accountId: string, principalId: string) =>
      teams.memberships(accountId, principalId),
    team: async (accountId: string, teamId: string) =>
      (await teams.list(accountId)).find((team) => team.teamId === teamId),
  };
  const accounts = {
    async listAccounts() {
      return [
        ...(await personalAccounts.listAccounts()),
        ...(await organizations.listAccounts()),
      ];
    },
    async resolve(id: string) {
      return (
        (await personalAccounts.resolve(id)) ??
        (await organizations.resolve(id))
      );
    },
    async eligibility(id: string) {
      return (
        (await personalAccounts.eligibility(id)) ??
        (await organizations.eligibility(id))
      );
    },
    async create(input: {
      principal: { principalId: string; status: "active" | "disabled" };
      handle: string;
      displayName: string;
      kind: "personal" | "organization";
    }) {
      return input.kind === "personal"
        ? personalAccounts.create({
            principalId: input.principal.principalId,
            handle: input.handle,
            displayName: input.displayName,
          })
        : organizations.create({ ...input, kind: "organization" });
    },
  };
  const profiles = {
    async resolve(id: string) {
      return await accountProfiles.resolve(id);
    },
  };
  const enterpriseAccounts = createEnterpriseAccountService(
    new InMemoryEnterpriseStore(),
    new OrganizationAccountDirectoryAdapter(organizationAccountDirectoryApi),
    nextId("enterprise"),
    () => new Date(),
  );
  const administrativeAccess = createAdministrativeAccessService(
    new InMemoryEnterpriseOwnerStore(),
    () => new Date(),
  );
  const policyGovernance = createPolicyGovernanceService(
    new InMemoryRepositoryPolicyStore(),
    enterpriseAccounts,
  );
  const enterpriseGovernance = {
    async create(input: { name: string; actorPrincipalId: string }) {
      const enterprise = await enterpriseAccounts.create({ name: input.name });
      await administrativeAccess.assignFoundingOwner(
        enterprise.enterpriseId,
        input.actorPrincipalId,
      );
      await policyGovernance.initialize(enterprise.enterpriseId);
      return {
        ...enterprise,
        repositoryVisibilityPolicy: await policyGovernance.get(
          enterprise.enterpriseId,
        ),
      };
    },
    async affiliateOrganization(input: {
      enterpriseId: string;
      organizationAccountId: string;
      actorPrincipalId: string;
    }) {
      await administrativeAccess.requireEnterpriseOwner(
        input.enterpriseId,
        input.actorPrincipalId,
      );
      const enterprise = await enterpriseAccounts.affiliateOrganization(input);
      return {
        ...enterprise,
        repositoryVisibilityPolicy: await policyGovernance.get(
          enterprise.enterpriseId,
        ),
      };
    },
    async setRepositoryVisibilityPolicy(input: {
      enterpriseId: string;
      policy: {
        publicRepositoryCreation: "allowed" | "forbidden";
        publicVisibilityChange: "allowed" | "forbidden";
      };
      actorPrincipalId: string;
    }) {
      await administrativeAccess.requireEnterpriseOwner(
        input.enterpriseId,
        input.actorPrincipalId,
      );
      await policyGovernance.set(input.enterpriseId, input.policy);
      const enterprise = await enterpriseAccounts.resolve(input.enterpriseId);
      if (!enterprise) throw new Error("Enterprise not found.");
      return { ...enterprise, repositoryVisibilityPolicy: input.policy };
    },
    constraintsForOrganization: (organizationAccountId: string) =>
      policyGovernance.constraintsForOrganization(organizationAccountId),
  };
  const appManagement = createAppManagementComposition(
    createPersonalAppOwnerDirectoryAdapter(personalAccountDirectoryApi),
    nextId("github-app"),
  );
  const authorization = createRepositoryAuthorizationService(
    new InMemoryRepositoryAccessGrantStore(),
    new AccountAuthorizationDirectoryAdapter(
      personalAccountDirectoryApi,
      organizationParticipationApi,
    ),
    new IdentityDirectoryAdapter(identity),
  );
  const repositories = createRepositoryService(
    new InMemoryRepositoryStore([
      {
        id: "repository-notes",
        owner: { accountId: "account-ada", login: "ada", kind: "personal" },
        name: "research-notes",
        description: "A private space for early product research.",
        visibility: "private",
      },
      {
        id: "repository-roadmap",
        owner: {
          accountId: "account-analytical",
          login: "analytical-engine",
          kind: "organization",
        },
        name: "product-roadmap",
        description: "Planning and governance for the organization.",
        visibility: "public",
      },
    ]),
    new AccountDirectoryAdapter(
      personalAccountDirectoryApi,
      organizationAccountDirectoryApi,
      organizationParticipationApi,
    ),
    new EnterpriseRepositoryGovernanceAdapter(enterpriseGovernance),
    authorization,
    nextId("repository"),
  );
  const communitySafety = createCommunitySafetyComposition(
    createRepositorySafetyParticipationAdapter(repositories),
  );
  const socialCuration = createSocialCurationComposition(
    createRepositoryStarParticipationAdapter(repositories),
  );
  const issueService = createIssuesService(
    new InMemoryIssueStore(),
    new InMemoryLabelStore(),
    new InMemoryIssueNumberSequence(),
    new RepositoryParticipationAdapter(repositories),
    new IssueCommunityInteractionSafetyAdapter(communitySafety),
    nextId("issue"),
    nextId("label"),
  );
  const issueCollaboration = createIssueCollaborationService(
    new InMemoryIssueCollaborationStore(),
    {
      async find(issueId) {
        const issue = await issueService.findIssueRef(issueId);
        return issue && { id: issue.issueId, repositoryId: issue.repositoryId };
      },
    },
    new IssueCommunityInteractionSafetyAdapter(communitySafety),
    nextId("issue-comment"),
    () => new Date(),
  );
  const issues = { ...issueService, ...issueCollaboration };
  const projects = createProjectsService(
    new InMemoryProjectStore(),
    new AccountOwnerDirectoryAdapter(
      personalAccountDirectoryApi,
      organizationParticipationApi,
    ),
    new IssueDirectoryAdapter(issues),
    nextId("project"),
  );
  const discussions = createDiscussionsService(
    new InMemoryDiscussionStore(),
    new InMemoryDiscussionCategoryStore([
      {
        id: "discussion-category-notes-q-and-a",
        repositoryId: "repository-notes",
        slug: "q-and-a",
        name: "Q&A",
        acceptsAnswers: true,
      },
      {
        id: "discussion-category-roadmap-q-and-a",
        repositoryId: "repository-roadmap",
        slug: "q-and-a",
        name: "Q&A",
        acceptsAnswers: true,
      },
    ]),
    new RepositoryDiscussionParticipationAdapter(repositories),
    new DiscussionCommunityInteractionSafetyAdapter(communitySafety),
    nextId("discussion"),
    nextId("discussion-comment"),
  );
  const knowledgeWiki = createKnowledgeWikiComposition(
    createRepositoryWikiParticipationAdapter(repositories),
  );
  const subscriptions = createSubscriptionsService(
    new InMemorySubscriptionStore(),
  );
  const notificationStore = new InMemoryNotificationStore();
  const notificationService = createNotificationsService(
    notificationStore,
    nextId("notification"),
    () => new Date(),
  );
  const unsubscribeNotification = createUnsubscribeNotificationProcess(
    notificationStore,
    subscriptions,
  );
  const notifications = {
    ...notificationService,
    unsubscribe: unsubscribeNotification,
  };
  const search = createSearchService(new InMemorySearchIndex());
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
    appManagement,
    authorization,
    repositories,
    issues,
    projects,
    discussions,
    communitySafety,
    socialCuration,
    knowledgeWiki,
    notifications,
    subscriptions,
    search,
    activityFeed,
    audit,
  };
}

type ProductComposition = ReturnType<typeof createProductComposition>;
const globalForProduct = globalThis as typeof globalThis & {
  productComposition?: ProductComposition;
};

export function getProductComposition() {
  globalForProduct.productComposition ??= createProductComposition();
  return globalForProduct.productComposition;
}

export async function searchProductResources(
  query: string,
  principal: Readonly<{ principalId: string; status: "active" | "disabled" }>,
) {
  const composition = getProductComposition();
  const index = new InMemorySearchIndex();
  const search = createSearchService(index);
  const documents: SearchDocumentInput[] = [];
  const accounts = await composition.accounts.listAccounts();
  const repositories = await composition.repositories.listVisible(principal);

  for (const account of accounts)
    documents.push({
      resourceId: account.accountId,
      resourceType: "account",
      title: account.displayName,
      body: account.handle,
      href: `/repositories?account=${account.accountId}`,
      ownerLabel:
        account.kind === "organization" ? "Organization" : "Personal account",
    });

  for (const repository of repositories) {
    const owner = accounts.find(
      (account) => account.accountId === repository.ownerAccountId,
    );
    const repositoryHref = `/repositories?account=${repository.ownerAccountId}&repository=${repository.repositoryId}`;
    documents.push({
      resourceId: repository.repositoryId,
      resourceType: "repository",
      title: repository.name,
      body: repository.description,
      href: repositoryHref,
      ownerLabel: owner?.handle ?? repository.ownerAccountId,
    });
    const [work, conversation] = await Promise.all([
      composition.issues.list(repository.repositoryId, principal),
      composition.discussions.list(repository.repositoryId, principal),
    ]);
    for (const issue of work.issues)
      documents.push({
        resourceId: issue.issueId,
        resourceType: "issue",
        title: issue.title,
        body: issue.body,
        href: repositoryHref,
        ownerLabel: `${owner?.handle ?? repository.ownerAccountId}/${repository.name}#${issue.number}`,
      });
    for (const discussion of conversation.discussions)
      documents.push({
        resourceId: discussion.discussionId,
        resourceType: "discussion",
        title: discussion.title,
        body: discussion.body,
        href: repositoryHref,
        ownerLabel: `${owner?.handle ?? repository.ownerAccountId}/${repository.name}`,
      });
  }

  for (const account of accounts) {
    const isOwner =
      ("personalPrincipalId" in account &&
        account.personalPrincipalId === principal.principalId) ||
      (
        await composition.memberships.membership(
          account.accountId,
          principal.principalId,
        )
      )?.role === "owner";
    for (const project of await composition.projects.list(account.accountId)) {
      if (project.visibility !== "public" && !isOwner) continue;
      documents.push({
        resourceId: project.projectId,
        resourceType: "project",
        title: project.title,
        body: "",
        href: `/repositories?account=${account.accountId}`,
        ownerLabel: account.handle,
      });
    }
  }
  await search.replaceViewerIndex(principal.principalId, documents);
  return search.search(principal.principalId, query);
}
