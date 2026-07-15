import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <section className="w-full max-w-lg rounded-xl border bg-background p-8 text-center shadow-sm">
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold">找不到這個頁面</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          這個網址不存在，或你目前無法存取它。
        </p>
        <Button asChild className="mt-6">
          <Link href="/">回到首頁</Link>
        </Button>
      </section>
    </main>
  );
}
