import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('[data-testid="url-shortener-title"]').innerText()).toContain('URL Shortener');
});
