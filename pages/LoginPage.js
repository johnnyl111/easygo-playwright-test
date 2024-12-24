class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = 'input[type="email"]';
        this.passwordInput = 'input[type="password"]';
        this.submitButton = 'button[type="submit"]';
        this.sidebarElement = '[data-testid="app-sidebar-container"]';
    }

    async login(email, password) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.submitButton);
    }

    async verifySidebarVisible(timeout = 20000) {
        await this.page.locator(this.sidebarElement).waitFor({ state: 'visible', timeout });
    }

    async takeScreenshot(path) {
        await this.page.screenshot({ path });
    }
}

module.exports = { LoginPage };
