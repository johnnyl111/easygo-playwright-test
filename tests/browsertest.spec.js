import { test, expect } from '@playwright/test'

test('should load home page', async ({ page }) => {
    await page.goto('https://google.com.au/');
    const title = await page.title()
    expect(title).toBe('Google');
});