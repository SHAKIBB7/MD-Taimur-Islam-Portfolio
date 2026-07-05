import { expect, test } from "@playwright/test";

test.describe("Portfolio", () => {
  test("home page renders hero and core sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Taimur/i);
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  });

  test("projects page filters and searches", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
    await page.getByRole("button", { name: "Android" }).click();
    await expect(page.getByText(/No Android projects yet/i)).toBeVisible();
    await page.getByRole("button", { name: "All" }).click();
    await page.getByPlaceholder("Search projects…").fill("wordpress");
    await expect(page.getByText(/Stock Image/i).first()).toBeVisible();
  });

  test("project detail page renders from slug", async ({ page }) => {
    await page.goto("/projects/stock-image-resources-website");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Stock Image Resources Website",
    );
    await expect(page.getByRole("heading", { name: "Technologies" })).toBeVisible();
  });

  test("contact form validates before submitting", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByRole("alert").first()).toBeVisible();
  });

  test("keyboard navigation: skip link is focusable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByText("Skip to main content")).toBeFocused();
  });
});
