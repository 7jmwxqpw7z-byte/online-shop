import { expect, Locator } from '@playwright/test';

export class MyAccountPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): MyAccountPage {
        return new MyAccountPage(locator);
    }

    async fillRegistrationForm(email: string, password: string): Promise<void> {
        await this.fillRegistrationEmail(email);
        await this.fillRegistrationPassword(password);
        await this.submitRegistration();
    }

    async fillLoginForm(username: string, password: string): Promise<void> {
        await this.fillLoginName(username);
        await this.fillLoginPassword(password);
        await this.submitLogin();
    }

    async fillRegistrationEmail(email: string): Promise<void> {
        await this.locator.locator(`//input[@type='email']`).fill(email);
    }

    async fillRegistrationPassword(password: string): Promise<void> {
        await this.locator.locator(`//div[@class="u-column2 col-2"]//input[@type='password']`).fill(password);
    }

    async submitRegistration(): Promise<void> {
        await this.locator.locator(`//div[@class="u-column2 col-2"]//button[@name='register']`).click();
    }

    async verifyRegistrationSuccess(userName: string): Promise<void> {
        await expect(this.locator.locator(`//p[contains(., '${userName}')]`)).toBeVisible();
    }

    async fillLoginName(username: string): Promise<void> {
        await this.locator.locator(`//div[@class="u-column1 col-1"]//input[@id='username']`).fill(username);
    }

    async fillLoginPassword(password: string): Promise<void> {
        await this.locator.locator(`//div[@class="u-column1 col-1"]//input[@id='password']`).fill(password);
    }
    
    async submitLogin(): Promise<void> {
        await this.locator.locator(`//div[@class="u-column1 col-1"]//button[@name='login']`).click();
    }

    async verifyLoginSuccess(userName: string): Promise<void> {
        await expect(this.locator.locator(`//p[contains(., '${userName}')]`)).toBeVisible();
    }

    async logout(): Promise<void> {
        await this.locator.locator(`//ul[@class='phoen_nav_tab']//a[contains(@href, 'wyloguj')]`).click();
    }


}