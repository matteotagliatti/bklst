import { expect, test } from "@playwright/test";

const authFile = "tests/user.json";

test("login", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByPlaceholder("yourname@email.com").click();
  await page
    .getByPlaceholder("yourname@email.com")
    .fill("test@matteotagliatti.it");
  await page.getByPlaceholder("yourname@email.com").press("Tab");
  await page.getByPlaceholder("Your password").fill("test1234");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL(/.*\/test/);
  await page.context().storageState({ path: authFile });
});
