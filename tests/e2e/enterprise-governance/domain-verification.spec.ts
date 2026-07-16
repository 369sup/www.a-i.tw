import { expect, test } from "@playwright/test";

async function signIn(page: import("@playwright/test").Page, login = "admin") {
  await page.goto("/sign-in");
  await page.getByLabel("Login").fill(login);
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function signOut(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "Open profile menu" }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await page.getByRole("button", { name: "Confirm logout" }).click();
  await expect(page).toHaveURL(/\/sign-in$/);
}

test("starts, verifies, reloads and denies an Enterprise domain challenge", async ({
  page,
}) => {
  const suffix = Date.now().toString(36);
  const enterpriseName = `Domain Governance ${suffix}`;
  const domainName = `${suffix}.example.com`;

  await signIn(page);
  await page.goto("/settings/enterprises");
  await page.getByLabel("Name").fill(enterpriseName);
  await page.getByRole("button", { name: "Create enterprise" }).click();
  await expect(page.getByRole("link", { name: enterpriseName })).toBeVisible();

  await page.getByRole("link", { name: "Manage verified domains" }).click();
  await expect(page).toHaveURL(
    /\/settings\/enterprises\/enterprise-\d+\/domains$/,
  );
  const domainRoute = new URL(page.url()).pathname;
  await expect(
    page.getByRole("heading", { name: "Verified domains" }),
  ).toBeVisible();

  await page.getByLabel("Domain name").fill(domainName.toUpperCase() + ".");
  await page.getByRole("button", { name: "Start verification" }).click();
  await expect(page.getByText(domainName, { exact: true })).toBeVisible();
  await expect(page.getByText("Pending", { exact: true })).toBeVisible();
  await expect(
    page.getByText(`_a-i-domain-verification.${domainName}`, { exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Check authoritative DNS" }).click();
  await expect(page.getByText("Verified", { exact: true })).toBeVisible();
  await expect(page.getByText("Verified at", { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByText(domainName, { exact: true })).toBeVisible();
  await expect(page.getByText("Verified", { exact: true })).toBeVisible();

  await signOut(page);
  await signIn(page, "grace");
  const denied = await page.goto(domainRoute);
  expect(denied?.status()).toBe(500);
  await expect(
    page.getByRole("heading", { name: "Verified domains" }),
  ).not.toBeVisible();
});
