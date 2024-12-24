const { test, chromium } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { TaskPage } = require('../pages/TaskPage');

let browser;
let page;
let loginPage;
let taskPage;

test.describe('Browser Tests', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage(); 
        loginPage = new LoginPage(page);
        taskPage = new TaskPage(page);
        await page.goto('https://app.todoist.com/');
    });

    test('should confirm logged in successfully', async () => {
        await loginPage.login('johnnyl111@hotmail.com.au', 'easygo123');
        await loginPage.verifySidebarVisible();
        await loginPage.takeScreenshot('screenshots/screenshot_login_success.png');
    });

    test('should update task successfully with current time', async () => {
        await taskPage.openTask();
        await taskPage.verifyTaskModalVisible();
        await taskPage.editTaskWithCurrentTime();
        await taskPage.closeTask();
        await taskPage.takeScreenshot('screenshots/screenshot_task_updated.png');
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'failed') {
            await page.screenshot({
                path: `screenshots/failed_test_${testInfo.title}.png`
            });
        }
    });

    test.afterAll(async () => {
        await browser.close();
    });
});
