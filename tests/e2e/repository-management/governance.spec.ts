import { expect, test } from "@playwright/test";

async function login(
  page: import("@playwright/test").Page,
  loginName = "admin",
) {
  await page.goto("/sign-in");
  await page.getByLabel("Login").fill(loginName);
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.goto("/repositories");
  await expect(page).toHaveURL(/\/repositories/);
}

test("rejects invalid credentials and supports Login to Dashboard to Logout", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/sign-in$/);
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("wrong");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("登入名稱或密碼不正確。")).toBeVisible();
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText("Personal Dashboard")).toBeVisible();
  await page.getByRole("button", { name: "Open profile menu" }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await page.getByRole("button", { name: "Confirm logout" }).click();
  await expect(page).toHaveURL(/\/sign-in$/);
  await expect(page.getByText("登入", { exact: true })).toBeVisible();
  await page.goto("/repositories");
  await expect(page).toHaveURL(/\/sign-in$/);
});

test("account and repository governance flows through all parallel repository slots", async ({
  page,
}) => {
  const suffix = Date.now().toString(36);
  const accountName = `Compiler Guild ${suffix}`;
  const accountHandle = `compiler-guild-${suffix}`;
  const repositoryName = `design-notes-${suffix}`;
  const repositoryHomepage = `https://example.com/${repositoryName}`;
  await login(page);

  await expect(
    page.getByRole("complementary", { name: "Account rail" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Repository management" }),
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
  await page.getByPlaceholder("https://example.com").fill(repositoryHomepage);
  await page.getByRole("button", { name: "Create repository" }).click();
  await page
    .getByRole("link", { name: new RegExp(`^${repositoryName} private`) })
    .click();
  await expect(
    page.getByRole("heading", { name: repositoryName }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: repositoryHomepage }),
  ).toHaveAttribute("href", repositoryHomepage);
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
      .getByRole("region", { name: "Repository management" })
      .getByText("archived", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Reason").locator("..")).toContainText("owner");
});

test("repository management stacks without horizontal overflow on mobile", async ({
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
    page.getByRole("region", { name: "Repository management" }),
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

test("creates a Q&A Discussion, comments, and marks the accepted answer", async ({
  page,
}) => {
  const suffix = Date.now().toString(36);
  const title = `Architecture question ${suffix}`;
  const answer = `Keep the boundary explicit ${suffix}`;
  await login(page);
  await page.goto(
    "/repositories?account=account-ada&repository=repository-notes",
  );

  await page.getByPlaceholder("Discussion title").fill(title);
  await page
    .getByPlaceholder("Start a conversation")
    .fill("Where should this product invariant live?");
  await page.getByRole("button", { name: "Create Discussion" }).click();
  await expect(page.getByText(title, { exact: true })).toBeVisible();

  await page.getByPlaceholder("Add a comment").fill(answer);
  await page.getByRole("button", { name: "Add Comment" }).click();
  await expect(page.getByText(answer, { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Mark as Answer" }).click();
  await expect(
    page.getByText("Accepted answer", { exact: true }),
  ).toBeVisible();
});

test("stars and unstars a readable Repository without changing Watch controls", async ({
  page,
}) => {
  await login(page);
  await page.goto(
    "/repositories?account=account-analytical&repository=repository-roadmap",
  );

  await expect(
    page.getByText("Repository Star", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Watch all" })).toBeVisible();
  await page.getByRole("button", { name: "Star", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Starred", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Watch all" })).toBeVisible();

  await page.reload();
  await expect(
    page.getByRole("button", { name: "Starred", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Starred", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Star", exact: true }),
  ).toBeVisible();
});

test("keeps notification triage independent and unsubscribes by notification identity", async ({
  page,
}) => {
  const suffix = Date.now().toString(36);
  const issueTitle = `Notify Grace ${suffix}`;
  await login(page);
  await page.goto(
    "/repositories?account=account-analytical&repository=repository-roadmap",
  );

  await page.getByPlaceholder("Issue title").fill(issueTitle);
  await page
    .getByPlaceholder("Work description")
    .fill("Verify recipient-owned notification triage and unsubscribe.");
  await page.getByRole("button", { name: "Create Issue" }).click();
  const issue = page.getByText(new RegExp(`#\\d+ ${issueTitle}`));
  await expect(issue).toBeVisible();
  const issueCard = issue.locator("../..");
  await issueCard
    .locator('select[name="principalId"]')
    .selectOption("principal-grace");
  await issueCard.getByRole("button", { name: "Assign", exact: true }).click();

  await page.getByRole("button", { name: "Open profile menu" }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await page.getByRole("button", { name: "Confirm logout" }).click();
  await login(page, "grace");
  await page.goto("/notifications");

  const notification = page.getByText(`Assigned: ${issueTitle}`, {
    exact: true,
  });
  await expect(notification).toBeVisible();
  const notificationCard = page
    .locator('[data-slot="card"]')
    .filter({ has: notification });
  await notificationCard.getByRole("button", { name: "Save" }).click();
  await expect(notificationCard.getByText("unread · saved")).toBeVisible();
  await notificationCard.getByRole("button", { name: "Mark read" }).click();
  await expect(notificationCard.getByText("read · saved")).toBeVisible();
  await expect(
    notificationCard.getByRole("button", { name: "Unsave" }),
  ).toBeVisible();
  await notificationCard.getByRole("button", { name: "Unsubscribe" }).click();
  await expect(notification).not.toBeVisible();
  await expect(page.getByText("All caught up")).toBeVisible();
});
