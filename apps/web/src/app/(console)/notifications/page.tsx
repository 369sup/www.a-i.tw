import Link from "next/link";
import { Archive, Bookmark, Check, MailOpen, Undo2 } from "lucide-react";
import { Badge } from "@a-i/shadcn/ui/badge";
import { Button } from "@a-i/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@a-i/shadcn/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@a-i/shadcn/ui/empty";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";
import {
  triageNotificationAction,
  unsubscribeNotificationAction,
} from "./notification-command-composition";

export default async function NotificationsPage() {
  const authentication = await requireConsoleAuthentication();
  const notifications = await getProductComposition().notifications.listInbox(
    authentication.principal.principalId,
  );
  return (
    <main className="mx-auto min-h-screen max-w-4xl p-6 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Inbox</p>
          <h1 className="text-3xl font-semibold">Notifications</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
      {notifications.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>All caught up</EmptyTitle>
            <EmptyDescription>
              Watching and participating activity will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={
                notification.triage.readState === "unread"
                  ? "border-primary/40"
                  : undefined
              }
            >
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">
                    <Link href={notification.href as never}>
                      {notification.title}
                    </Link>
                  </CardTitle>
                  <Badge className="mt-2" variant="secondary">
                    {notification.reason}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {notification.triage.readState}
                  {notification.triage.saved ? " · saved" : ""}
                </span>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <form action={triageNotificationAction}>
                  <input
                    name="notificationId"
                    type="hidden"
                    value={notification.id}
                  />
                  <input
                    name="operation"
                    type="hidden"
                    value={
                      notification.triage.readState === "unread"
                        ? "mark-read"
                        : "mark-unread"
                    }
                  />
                  <Button size="sm" type="submit" variant="outline">
                    {notification.triage.readState === "unread" ? (
                      <MailOpen />
                    ) : (
                      <Undo2 />
                    )}
                    {notification.triage.readState === "unread"
                      ? "Mark read"
                      : "Mark unread"}
                  </Button>
                </form>
                <form action={triageNotificationAction}>
                  <input
                    name="notificationId"
                    type="hidden"
                    value={notification.id}
                  />
                  <input
                    name="operation"
                    type="hidden"
                    value={notification.triage.saved ? "unsave" : "save"}
                  />
                  <Button
                    size="sm"
                    type="submit"
                    variant={
                      notification.triage.saved ? "secondary" : "outline"
                    }
                  >
                    <Bookmark />
                    {notification.triage.saved ? "Unsave" : "Save"}
                  </Button>
                </form>
                <form action={triageNotificationAction}>
                  <input
                    name="notificationId"
                    type="hidden"
                    value={notification.id}
                  />
                  <input name="operation" type="hidden" value="mark-done" />
                  <Button size="sm" type="submit" variant="outline">
                    <Check />
                    Done
                  </Button>
                </form>
                <form action={unsubscribeNotificationAction}>
                  <input
                    name="notificationId"
                    type="hidden"
                    value={notification.id}
                  />
                  <Button size="sm" type="submit" variant="ghost">
                    <Archive />
                    Unsubscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
