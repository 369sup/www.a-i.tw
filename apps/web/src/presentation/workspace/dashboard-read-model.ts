export type DashboardReadModel = Readonly<{
  actor: { principalId: string; displayName: string };
  accounts: readonly {
    accountId: string;
    handle: string;
    kind: "personal" | "organization";
  }[];
  repositories: readonly {
    repositoryId: string;
    name: string;
    visibility: "public" | "private";
  }[];
  inboxUnreadCount: number;
  feed: readonly { verb: string; subjectRef: string; occurredAt: string }[];
}>;

export interface DashboardSources {
  accounts(principalId: string): Promise<DashboardReadModel["accounts"]>;
  repositories(
    principalId: string,
  ): Promise<DashboardReadModel["repositories"]>;
  inboxUnreadCount(principalId: string): Promise<number>;
  feed(principalId: string): Promise<DashboardReadModel["feed"]>;
}

export async function composeDashboard(
  actor: DashboardReadModel["actor"],
  sources: DashboardSources,
): Promise<DashboardReadModel> {
  const [accounts, repositories, inboxUnreadCount, feed] = await Promise.all([
    sources.accounts(actor.principalId),
    sources.repositories(actor.principalId),
    sources.inboxUnreadCount(actor.principalId),
    sources.feed(actor.principalId),
  ]);
  return { actor, accounts, repositories, inboxUnreadCount, feed };
}
