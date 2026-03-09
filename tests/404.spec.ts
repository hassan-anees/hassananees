import { test, expect } from "@playwright/test";

test("unknown route shows 404 page", async ({ page }) => {
  const response = await page.goto("/this-does-not-exist");
  expect(response?.status()).toBe(404);
});
