import Link from "next/link";
import { Badge } from "@a-i/shadcn/ui/badge";
import { Button } from "@a-i/shadcn/ui/button";
import { Card, CardContent } from "@a-i/shadcn/ui/card";
import { Input } from "@a-i/shadcn/ui/input";
import { searchForCurrentSession } from "../search-scope-composition";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q?.trim() ?? "";
  const { results, scope } = await searchForCurrentSession(query);
  const authenticated = scope === "authenticated-product";

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {authenticated
              ? "Viewer-visible product scope"
              : "Public documentation scope"}
          </p>
          <h1 className="mt-1 text-4xl font-semibold">Search</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            {authenticated
              ? "目前 Session 只會取得這個 Principal 可見的產品資源。"
              : "尚未登入，因此只搜尋公開文件，不會建立假的匿名 Principal。"}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={authenticated ? "/dashboard" : "/sign-in"}>
            {authenticated ? "Dashboard" : "登入以搜尋產品"}
          </Link>
        </Button>
      </div>

      <form className="mt-8 flex gap-3" method="get">
        <Input
          aria-label="Search query"
          defaultValue={query}
          name="q"
          placeholder={
            authenticated
              ? "Search repositories, issues, projects…"
              : "Search public docs…"
          }
        />
        <Button type="submit">Search</Button>
      </form>

      <section aria-live="polite" className="mt-8 space-y-3">
        {!query ? (
          <p className="text-sm text-muted-foreground">輸入關鍵字開始搜尋。</p>
        ) : results.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
            目前 scope 內沒有符合的結果。
          </p>
        ) : (
          results.map((result) => (
            <Card key={`${result.type}:${result.id}`}>
              <CardContent className="flex items-start gap-4 p-5">
                <Badge variant="secondary">{result.type}</Badge>
                <div className="min-w-0">
                  <Link
                    className="font-medium hover:underline"
                    href={result.href as never}
                  >
                    {result.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {result.ownerLabel}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}
