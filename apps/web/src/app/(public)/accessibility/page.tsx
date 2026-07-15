import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";

export default function AccessibilityPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground">Experience foundation</p>
      <h1 className="mt-2 text-4xl font-semibold">Accessibility</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>
          www.a-i.tw 以語意化
          HTML、鍵盤可操作控制項、可見焦點與可讀標籤作為介面基線。
        </p>
        <p>
          Accessibility preferences 與正式合規聲明尚未成為 runtime capability；
          本頁不宣稱未經驗證的符合等級。
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/docs/">閱讀公開文件</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">回到首頁</Link>
        </Button>
      </div>
    </main>
  );
}
