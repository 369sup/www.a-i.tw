import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground">Site policy foundation</p>
      <h1 className="mt-2 text-4xl font-semibold">隱私權</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>
          本頁是隱私政策的 delivery 入口。目前 repository 尚未包含經核准的
          www.a-i.tw 法律政策文本，因此不會以 GitHub
          或其他服務的條款冒充本站政策。
        </p>
        <p>
          在政策 owner、適用範圍、資料處理目的、保存期限與聯絡窗口完成審核前，
          此頁只陳述目前可驗證的狀態。
        </p>
      </div>
      <Button asChild className="mt-8" variant="outline">
        <Link href="/">回到首頁</Link>
      </Button>
    </main>
  );
}
