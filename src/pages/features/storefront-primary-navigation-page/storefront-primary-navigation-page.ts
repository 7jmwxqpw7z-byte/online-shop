import { expect, Locator } from '@playwright/test';

export class StorefrontPrimaryNavigationPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): StorefrontPrimaryNavigationPage {
        return new StorefrontPrimaryNavigationPage(locator);
    }

    async navigateToHomePage(): Promise<void> {
        await this.locator.locator(`//div[@class='primary-navigation']//a[text()='Strona główna']`).click();
    }

    async navigateToShopPage(): Promise<void> {
        await this.locator.locator(`//div[@class='primary-navigation']//a[text()='Sklep']`).click();
    }

    async navigateToOrdersPage(): Promise<void> {
        await this.locator.locator(`//div[@class='primary-navigation']//a[text()='Zamówienie']`).click();
    }

    async navigateToCartPage(): Promise<void> {
        await this.locator.locator(`//div[@class='primary-navigation']//a[text()='Koszyk']`).click();
    }

    async navigateToMyAccountPage(): Promise<void> {
        await this.locator.locator(`//div[@class='primary-navigation']//a[text()='Moje konto']`).click();
    }

    async navigateToWishlistPage(): Promise<void> {
        await this.locator.locator(`//div[@class='primary-navigation']//a[text()='Lista życzeń']`).click();
    }

    async verifyPrimaryNavigationVisible(): Promise<void> {
        await expect(this.locator).toBeVisible();
    }

    async useFastSearch(query: string): Promise<void> {
        await this.locator.locator(`//input[@type='search']`).fill(query);
        await this.locator.press('Enter');
    }
}