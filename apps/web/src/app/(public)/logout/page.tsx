import Link from "next/link";
import { logoutAction } from "@/src/app/(public)/_actions/auth";
import { currentAuthentication } from "@/src/presentation/authentication/browser-session";

export default async function LogoutPage() {
  const authentication = await currentAuthentication();
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <section className="w-full max-w-md rounded-xl border bg-background p-6">
        <h1 className="text-2xl font-semibold">Logout</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {authentication
            ? `將撤銷 @${authentication.principal.handle} 的目前 browser Session。`
            : "目前沒有有效的登入 Session。"}
        </p>
        <div className="mt-6 flex gap-3">
          {authentication ? (
            <form action={logoutAction}>
              <button className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background">
                Confirm logout
              </button>
            </form>
          ) : null}
          <Link className="rounded-md border px-4 py-2 text-sm" href="/">
            返回首頁
          </Link>
        </div>
      </section>
    </main>
  );
}
