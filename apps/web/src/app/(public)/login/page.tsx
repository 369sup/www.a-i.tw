import { redirect } from "next/navigation";
import { loginAction } from "@/src/app/(public)/authentication-command-composition";
import { currentPublicAuthentication } from "@/src/app/(public)/public-session-composition";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await currentPublicAuthentication()) redirect("/repositories");
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <section className="w-full max-w-sm rounded-xl border bg-background p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          a-i.tw
        </p>
        <h1 className="mt-3 text-2xl font-semibold">登入</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          驗證 user 身分並建立 Session；Organization 與 Enterprise 不會成為登入
          Actor。
        </p>
        {error ? (
          <p className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            登入名稱或密碼不正確。
          </p>
        ) : null}
        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Login
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              name="login"
              autoComplete="username"
              required
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background">
            Login
          </button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          Mock access: admin or grace / 123456
        </p>
      </section>
    </main>
  );
}
