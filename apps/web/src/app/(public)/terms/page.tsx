import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground">Site policy foundation</p>
      <h1 className="mt-2 text-4xl font-semibold">服務條款</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>
          本頁保留 Terms 的公開入口，但目前沒有經核准且可作為 www.a-i.tw source
          of truth 的法律文本。
        </p>
        <p>
          Product behavior、授權政策與法律條款是不同責任；在正式文本發布前，
          runtime 規則與技術文件不會被包裝成使用者已同意的條款。
        </p>
      </div>
      <Button asChild className="mt-8" variant="outline">
        <Link href="/">回到首頁</Link>
      </Button>
    </main>
  );
}
