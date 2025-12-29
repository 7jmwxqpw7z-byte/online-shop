import { expect, Locator } from '@playwright/test';

export class CartPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): CartPage {
        return new CartPage(locator);
    }
    
    async verifyProductInCart(productName: string): Promise<void> {
        await this.locator.locator(`//td[@class='product-name']//a[text()='${productName}']`).isVisible();
    }

    async setProductQuantity(quantity: string): Promise<void> {
        const quantityInput = this.locator.locator(`//input[@id='quantity_69527935c4fa8']`);
        await quantityInput.clear();
        await quantityInput.fill(quantity);
    }

    async updateCart(): Promise<void> {
        await this.locator.locator(`//button[@type='submit' and @name='update_cart' and @value='Zaktualizuj koszyk']`).click();
    }
}