import { test, expect } from '@playwright/test'
import dotenv from 'dotenv';

dotenv.config();

test('should load home page and log in successfully', async ({ page }) => {
    const password = process.env.PLAYWRIGHT_PASSWORD;
    await page.goto('https://app.todoist.com//');
    const title = await page.title()
    expect(title).toBe('Log in to Todoist');

    await page.fill('input[type="email"]', 'johnnyl111@hotmail.com.au');
    await page.fill('input[type="password"]', password);

    await page.click('button[type="submit"]');
});