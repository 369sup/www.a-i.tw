import { expect, test } from "@playwright/test";

test("the template workspace renders list, preview, and editor slots together", async ({
  page,
}) => {
  await page.goto("/templates/landing-page");
  await expect(
    page.getByRole("region", { name: "Sub-template list" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Sub-template preview" }),
  ).toContainText("Landing page");
  await expect(
    page.getByRole("region", { name: "Sub-template editor" }),
  ).toBeVisible();
});
