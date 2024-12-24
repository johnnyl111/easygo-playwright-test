import { test, expect, chromium } from '@playwright/test'

let browser;
let page;

test.describe('Browser Tests', () => {
    test.beforeAll(async () => {
        // Can change to true if you want headless. I've made healess false here so that you can see what happens in the browser as the test runs.
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage(); // Create a new page
        await page.goto('https://app.todoist.com/');
        await page.fill('input[type="email"]', 'johnnyl111@hotmail.com.au');
        await page.fill('input[type="password"]', 'easygo123');
        await page.click('button[type="submit"]');
    });

    test('should confirm logged in successfully', async () => {
        //Verify logged in by checking if sidebar exists
        const sidebarElement = page.locator('[data-testid="app-sidebar-container"]');
        //I find the website sometimes takes a while to load so just made it 20secs for now
        await expect(sidebarElement).toBeVisible({ timeout: 20000 });

        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'screenshots/screenshot_login_success.png' });
    });
    
    test('should update record successfully with current time', async () => {
        // check for the list item
        const taskContent = page.locator('div.task_content:has-text("I have updated the task record")');
        await expect(taskContent).toBeVisible();
        await taskContent.click();

        //modal opens
        const taskModal = page.locator('[data-testid="task-details-modal"]');
        await expect(taskModal).toBeVisible();

        //added .first() due to multiple elements found
        const actionHint = page.locator('[data-action-hint="task-detail-view-edit"]').first();
        await expect(actionHint).toBeVisible();
        await actionHint.click();
        const taskInputField = page.locator('[aria-label="Task name"]').first(); 
        const currentDateTime = new Date().toLocaleString();
        
        //update the task with current time
        const updatedText = `I have updated the task record at ${currentDateTime}`;
        await taskInputField.fill(updatedText);
    
        //save update
        const submitButton = page.locator('[data-testid="task-editor-submit-button"]');
        await expect(submitButton).toBeVisible();
        await submitButton.click();

        //close modal
        const closeTaskButton = page.locator('button[aria-label="Close task"]');
        await closeTaskButton.click();

        await page.screenshot({ path: 'screenshots/screenshot_task_updated.png' });
    });

        // Capture screenshot on failure
        test.afterEach(async ({ page }, testInfo) => {
            if (testInfo.status === 'failed') {
                await page.screenshot({
                    path: `screenshots/failed_test_${testInfo.title}.png`
                });
            }
        });
})
