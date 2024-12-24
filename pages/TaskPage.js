class TaskPage {
    constructor(page) {
        this.page = page;
        this.taskContentLocator = 'div.task_content:has-text("I have updated the task record")';
        this.taskModalLocator = '[data-testid="task-details-modal"]';
        this.actionHintLocator = '[data-action-hint="task-detail-view-edit"]';
        this.taskInputFieldLocator = '[aria-label="Task name"]';
        this.submitButtonLocator = '[data-testid="task-editor-submit-button"]';
        this.closeTaskButtonLocator = 'button[aria-label="Close task"]';
    }

    async openTask() {
        const taskContent = this.page.locator(this.taskContentLocator);
        await taskContent.click();
    }

    async verifyTaskModalVisible() {
        await this.page.locator(this.taskModalLocator).waitFor({ state: 'visible' });
    }

    async editTaskWithCurrentTime() {
        const actionHint = this.page.locator(this.actionHintLocator).first();
        await actionHint.click();
        const taskInputField = this.page.locator(this.taskInputFieldLocator).first();
        const currentDateTime = new Date().toLocaleString();
        const updatedText = `I have updated the task record at ${currentDateTime}`;
        await taskInputField.fill(updatedText);
        const submitButton = this.page.locator(this.submitButtonLocator);
        await submitButton.click();
    }

    async closeTask() {
        const closeTaskButton = this.page.locator(this.closeTaskButtonLocator);
        await closeTaskButton.click();
    }

    async takeScreenshot(path) {
        await this.page.screenshot({ path });
    }
}

module.exports = { TaskPage };
