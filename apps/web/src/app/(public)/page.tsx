import Link from "next/link";
import { redirect } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@a-i/shadcn/ui/button";
import { currentPublicAuthentication } from "@/src/app/(public)/public-session-composition";

export default async function Home() {
  if (await currentPublicAuthentication()) redirect("/repositories");

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="flex h-16 items-center justify-between border-b bg-background px-6">
        <strong className="text-lg">a-i.tw</strong>
        <Button asChild>
          <Link href="/login">
            <LogIn data-icon="inline-start" />
            Login
          </Link>
        </Button>
      </header>
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm text-muted-foreground">
          Collaborative software development
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-6xl">
          Build, organize, and govern work from one home.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          登入後可在 Personal 與 Organization scope 間切換，並查看你可存取的
          repositories。
        </p>
      </section>
    </main>
  );
}
