import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function docsLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "www.a-i.tw",
    },
    links: [
      {
        text: "產品工作區",
        url: "/workspace",
      },
    ],
  };
}
