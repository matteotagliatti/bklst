import { expect, test } from "@playwright/test";

test("add book", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Search" }).click();
  await page.getByPlaceholder("Game of Thrones").click();
  await page.getByPlaceholder("Game of Thrones").fill("Game of Thrones");
  await page.getByPlaceholder("George R.R. Martin").click();
  await page.getByPlaceholder("George R.R. Martin").fill("George Martin");
  await page.getByPlaceholder("George R.R. Martin").press("Enter");
  await page
    .getByRole("link", {
      name: "A Game of Thrones George R. R. Martin A Game of Thrones",
    })
    .click();
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page).toHaveURL(/.*\/to-read/);
});

test("edit book", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "To Read" }).click();
  await page
    .getByRole("link", {
      name: "A Game of Thrones George R. R. Martin A Game of Thrones",
    })
    .click();
  await page.getByLabel("Status").selectOption("reading");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page).toHaveURL(/.*\/test/);
});

test("delete book", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "A Game of Thrones George R. R. Martin A Game of Thrones",
    })
    .click();
  await page.getByRole("link", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page).toHaveURL(/.*\/test/);
});
