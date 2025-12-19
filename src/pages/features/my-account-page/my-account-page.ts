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

    async fillRegistrationEmail(email: string): Promise<void> {
        await this.locator.locator(`//input[@type='email']`).fill(email);
    }

    async fillRegistrationPassword(password: string): Promise<void> {
        await this.locator.locator(`//div[@class="u-column2 col-2"]//input[@type='password']`).fill(password);
    }

    async submitRegistration(): Promise<void> {
        await this.locator.locator(`//div[@class="u-column2 col-2"]//button[@name='register']`).click();
    }

}