import Link from "next/link";
import { Bell, FolderGit2, Search } from "lucide-react";
import { Badge } from "@a-i/shadcn/ui/badge";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import { currentDashboard } from "./dashboard-composition";

export default async function DashboardPage() {
  const dashboard = await currentDashboard();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Personal Dashboard · @{dashboard.principal.handle}
          </p>
          <h1 className="mt-1 text-3xl font-semibold">
            歡迎回來，{dashboard.principal.displayName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            這是依目前 Principal 組合的 consumer read
            model；Repository、Notification 與 Activity 仍由各自 owner
            提供事實。
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/search">
            <Search />
            Search
          </Link>
        </Button>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Visible repositories</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <FolderGit2 className="text-muted-foreground" />
            <strong className="text-3xl">{dashboard.repositoryCount}</strong>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Notification inbox</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Bell className="text-muted-foreground" />
            <strong className="text-3xl">{dashboard.notificationCount}</strong>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Activity feed items</CardDescription>
          </CardHeader>
          <CardContent>
            <strong className="text-3xl">{dashboard.activityCount}</strong>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Repositories</h2>
          <Button asChild size="sm" variant="ghost">
            <Link href="/repositories">Open repository management</Link>
          </Button>
        </div>
        {dashboard.recentRepositories.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
            目前 Principal 沒有可見的 Repository。
          </p>
        ) : (
          <div className="mt-4 divide-y rounded-lg border">
            {dashboard.recentRepositories.map((repository) => (
              <Link
                className="flex items-start justify-between gap-4 p-4 hover:bg-muted/40"
                href={`/repositories?account=${repository.ownerAccountId}&repository=${repository.repositoryId}`}
                key={repository.repositoryId}
              >
                <span>
                  <strong className="block">{repository.name}</strong>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {repository.description}
                  </span>
                </span>
                <Badge variant="secondary">{repository.visibility}</Badge>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
