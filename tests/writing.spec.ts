import { test, expect } from "@playwright/test";

test("writing page loads with post list", async ({ page }) => {
  await page.goto("/writing");
  await expect(page.getByRole("heading", { name: "Piecing Thoughtful Insights" })).toBeVisible();
});

test("writing page 2 exists", async ({ page }) => {
  await page.goto("/writing/2");
  await expect(page).not.toHaveURL(/404/);
  await expect(page.getByText("← Previous")).toBeVisible();
});

test("navigating to a post works", async ({ page }) => {
  await page.goto("/writing");
  await page.getByRole("link", { name: "Read Full Post" }).first().click();
  await expect(page).toHaveURL(/\/posts\//);
});
