"use client";

import "./globals.css";

interface GlobalErrorRuntimeProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError(props: unknown) {
  const { error, unstable_retry: retryAction } =
    props as GlobalErrorRuntimeProps;
  return (
    <html lang="zh-Hant">
      <body className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <main className="w-full max-w-lg rounded-xl border bg-card p-8 shadow-sm">
          <title>發生錯誤 · www.a-i.tw</title>
          <h1 className="text-2xl font-semibold">無法完成這次要求</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            系統遇到未預期的錯誤。你可以重試，或稍後再回來。
          </p>
          {error.digest ? (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            onClick={() => retryAction()}
            type="button"
          >
            再試一次
          </button>
        </main>
      </body>
    </html>
  );
}
