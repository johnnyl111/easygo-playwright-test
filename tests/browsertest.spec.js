import { test, expect } from '@playwright/test'

test('should load home page and log in', async ({ page }) => {
    await page.goto('https://app.todoist.com/');
    const title = await page.title();
    expect(title).toBe('Log in to Todoist');

    await page.fill('input[type="email"]', 'johnnyl111@hotmail.com.au');
    await page.fill('input[type="password"]', 'easygo123');

    await page.click('button[type="submit"]');
});