import { expect, test } from "@playwright/test";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/workspace/);
}

test("rejects invalid credentials and supports Login to Profile to Logout", async ({
  page,
}) => {
  await page.goto("/workspace");
  await expect(page).toHaveURL(/\/$/);
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("wrong");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("登入名稱或密碼不正確。")).toBeVisible();
  await login(page);
  await expect(page.getByText("Profile", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(
    page.getByRole("heading", { name: "登入個人面板" }),
  ).toBeVisible();
});

test("account and repository governance flows through all parallel workspace slots", async ({
  page,
}) => {
  const suffix = Date.now().toString(36);
  const accountName = `Compiler Guild ${suffix}`;
  const accountHandle = `compiler-guild-${suffix}`;
  const repositoryName = `design-notes-${suffix}`;
  await login(page);

  await expect(
    page.getByRole("complementary", { name: "Account rail" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Repository workspace" }),
  ).toBeVisible();
  await expect(
    page.getByRole("complementary", { name: "Context inspector" }),
  ).toBeVisible();

  await page.getByText("New account", { exact: true }).click();
  await page.getByPlaceholder("Display name").fill(accountName);
  await page.getByPlaceholder("account-handle").fill(accountHandle);
  await page.locator('select[name="kind"]').selectOption("organization");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText(accountName, { exact: true })).toBeVisible();

  await page.getByRole("link", { name: new RegExp(accountName) }).click();
  await page.getByText("New repository", { exact: true }).click();
  await page.getByPlaceholder("repository-name").fill(repositoryName);
  await page
    .getByPlaceholder("Description")
    .fill("Governance without source code.");
  await page.getByRole("button", { name: "Create repository" }).click();
  await page.getByRole("link", { name: new RegExp(repositoryName) }).click();
  await expect(
    page.getByRole("heading", { name: repositoryName }),
  ).toBeVisible();
  await expect(
    page.getByText("Repository capability context", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("issue.create", { exact: true })).toBeVisible();

  await page.getByPlaceholder("Issue title").fill("Review launch plan");
  await page
    .getByPlaceholder("Work description")
    .fill("Track the non-code launch review.");
  await page.getByRole("button", { name: "Create Issue" }).click();
  await expect(page.getByText(/#1 Review launch plan/)).toBeVisible();

  await page.getByPlaceholder("Label name").fill("planning");
  await page.getByRole("button", { name: "Create Label" }).click();
  await page.getByRole("button", { name: "Apply Label" }).click();
  await page.getByRole("button", { name: "Assign", exact: true }).click();
  await expect(page.getByText(/1 assignees · 1 labels/)).toBeVisible();

  await page.getByRole("button", { name: "Archive repository" }).click();
  await expect(
    page
      .getByRole("region", { name: "Repository workspace" })
      .getByText("archived", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Reason").locator("..")).toContainText("owner");
});

test("workspace stacks without horizontal overflow on mobile", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await login(page);

  await expect(
    page.getByRole("complementary", { name: "Account rail" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Repository workspace" }),
  ).toBeVisible();
  await expect(
    page.getByRole("complementary", { name: "Context inspector" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(pageErrors).toEqual([]);
});
