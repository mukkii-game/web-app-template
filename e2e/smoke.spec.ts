import { expect, test } from '@playwright/test';

test('the starter renders and responds to input', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Web App Starter' }),
  ).toBeVisible();
  await expect(page.getByText('Ready to build your next idea.')).toBeVisible();

  const counter = page.getByRole('button', { name: 'Count: 0' });
  await counter.click();
  await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
});
