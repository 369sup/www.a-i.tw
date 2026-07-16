import { getProductComposition } from "@/src/composition/product-composition";
import { requireConsoleAuthentication } from "../console-session-composition";

export async function currentDashboard() {
  const authentication = await requireConsoleAuthentication();
  const composition = getProductComposition();
  const [repositories, notifications, activity] = await Promise.all([
    composition.repositories.listVisible(authentication.principal),
    composition.notifications.listInbox(authentication.principal.principalId),
    composition.activityFeed.list(authentication.principal.principalId),
  ]);

  return {
    principal: authentication.principal,
    repositoryCount: repositories.length,
    notificationCount: notifications.length,
    activityCount: activity.length,
    recentActivity: activity.slice(0, 5),
    recentRepositories: repositories.slice(0, 5),
  } as const;
}
