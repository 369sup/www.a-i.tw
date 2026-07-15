import { expect, test } from "@playwright/test";

test("changes search scope from public documentation to viewer-visible products after sign-in", async ({
  page,
}) => {
  await page.goto("/search?q=research");
  await expect(page.getByText("Public documentation scope")).toBeVisible();
  await expect(page.getByText("research-notes", { exact: true })).toHaveCount(
    0,
  );

  await page.goto("/sign-in");
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/search?q=research");
  await expect(page.getByText("Viewer-visible product scope")).toBeVisible();
  await expect(page.getByText("research-notes", { exact: true })).toBeVisible();
});
