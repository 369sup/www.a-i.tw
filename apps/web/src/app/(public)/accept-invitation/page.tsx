import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import { acceptMembershipInvitationAction } from "../membership-invitation-command-composition";
import { currentPublicAuthentication } from "../public-session-composition";

export default async function AcceptInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; invitationId?: string }>;
}) {
  const [authentication, { error, invitationId }] = await Promise.all([
    currentPublicAuthentication(),
    searchParams,
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>接受 Organization 邀請</CardTitle>
          <CardDescription>
            Membership owner 會驗證受邀 Principal、邀請狀態與期限。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              邀請不存在、已過期、已處理，或不屬於目前登入的 User。
            </p>
          ) : null}
          {!invitationId ? (
            <p className="text-sm text-muted-foreground">
              缺少 invitationId。請使用邀請訊息提供的完整網址。
            </p>
          ) : !authentication ? (
            <div>
              <p className="text-sm text-muted-foreground">
                先登入受邀的 User，再回到這個邀請網址完成接受。
              </p>
              <Button asChild className="mt-6">
                <Link href="/sign-in">前往登入</Link>
              </Button>
            </div>
          ) : (
            <form action={acceptMembershipInvitationAction}>
              <input name="invitationId" type="hidden" value={invitationId} />
              <p className="text-sm text-muted-foreground">
                目前登入為 @{authentication.principal.handle}。接受後會建立該
                Organization 的 active Membership。
              </p>
              <Button className="mt-6" type="submit">
                接受邀請
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
