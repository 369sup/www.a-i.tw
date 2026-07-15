import { expect, test } from "@playwright/test";

test("registers and lists a private GitHub App from developer settings", async ({
  page,
}) => {
  const suffix = Date.now().toString(36);
  const appName = `Product Guide ${suffix}`;
  const homepageUrl = `https://example.com/apps/${suffix}`;
  const callbackUrl = `https://example.com/apps/${suffix}/callback`;

  await page.goto("/sign-in");
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  await page.getByRole("button", { name: "Open profile menu" }).click();
  await page.getByRole("menuitem", { name: "Settings" }).click();
  await page.getByRole("link", { name: /GitHub Apps/ }).click();
  await expect(page).toHaveURL(/\/settings\/apps$/);
  await expect(
    page.getByRole("heading", { name: "GitHub Apps" }),
  ).toBeVisible();

  await page.getByLabel("GitHub App name").fill(appName);
  await page
    .getByLabel("Description")
    .fill("A non-code product documentation assistant.");
  await page.getByLabel("Homepage URL").fill(homepageUrl);
  await page.getByLabel("Callback URL").fill(callbackUrl);
  await page.getByRole("button", { name: "Create GitHub App" }).click();

  const registration = page
    .locator('[data-slot="card"]')
    .filter({ hasText: appName });
  await expect(registration.getByText(appName, { exact: true })).toBeVisible();
  await expect(
    registration.getByText("private", { exact: true }),
  ).toBeVisible();
  await expect(
    registration.getByRole("link", { name: homepageUrl }),
  ).toHaveAttribute("href", homepageUrl);

  await page.reload();
  await expect(page.getByText(appName, { exact: true })).toBeVisible();
});
