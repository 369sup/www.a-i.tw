import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "www.a-i.tw",
    },
    links: [
      {
        text: "首頁",
        url: "/",
      },
    ],
  };
}
