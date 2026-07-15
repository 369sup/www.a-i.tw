import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import { Input } from "@a-i/shadcn/ui/input";
import { Label } from "@a-i/shadcn/ui/label";
import { loginAction } from "@/src/app/(public)/authentication-command-composition";
import { currentPublicAuthentication } from "@/src/app/(public)/public-session-composition";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await currentPublicAuthentication()) redirect("/dashboard");
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            a-i.tw
          </p>
          <CardTitle className="text-2xl">登入</CardTitle>
          <CardDescription>
            驗證 User 身分並建立 Session。Organization 與 Enterprise
            不會成為登入 Actor。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              登入名稱或密碼不正確。
            </p>
          ) : null}
          <form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Login</Label>
              <Input autoComplete="username" id="login" name="login" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                  href="/forgot-password"
                >
                  忘記密碼？
                </Link>
              </div>
              <Input
                autoComplete="current-password"
                id="password"
                name="password"
                required
                type="password"
              />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Mock access: admin or grace / 123456
          </p>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          還沒有帳號？&nbsp;
          <Link
            className="font-medium text-foreground hover:underline"
            href="/sign-up"
          >
            查看註冊狀態
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
