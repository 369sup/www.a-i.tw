import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@a-i/shadcn/ui/card";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>驗證 Email</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Email ownership、verification challenge 與 delivery port
            尚未建立；此頁不會把網址參數視為已驗證事實。
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link href="/">回到首頁</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
