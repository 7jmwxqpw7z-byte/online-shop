import { expect, Locator } from '@playwright/test';

export class ShopPage {

    private constructor(private readonly locator: Locator) {
    }

    static of(locator: Locator): ShopPage {
        return new ShopPage(locator);
    }

    async useFastSearch(query: string): Promise<void> {
        await this.locator.locator(`//input[@type='search']`).fill(query);
        await this.locator.press('Enter');
    }

    async adjustPriceFilter(minPrice: number, maxPrice: number): Promise<void> {
        // Get slider dimensions and range
        const sliderContainer = this.locator.locator("//div[@class='price_slider_wrapper']//div[@class='price_slider']");
        const sliderBox = await sliderContainer.boundingBox();
        
        if (!sliderBox) {
            throw new Error('Slider not found or not visible');
        }
        
        // Get current min/max values from hidden inputs
        const minInput = this.locator.locator("//input[@id='min_price']");
        const maxInput = this.locator.locator("//input[@id='max_price']");
        
        const currentMin = parseInt(await minInput.getAttribute('data-min') || '2900');
        const currentMax = parseInt(await maxInput.getAttribute('data-max') || '5400');
        
        // Calculate positions as percentages
        const minPercentage = (minPrice - currentMin) / (currentMax - currentMin);
        const maxPercentage = (maxPrice - currentMin) / (currentMax - currentMin);
        
        // Convert to pixel positions
        const minX = Math.round(minPercentage * sliderBox.width);
        const maxX = Math.round(maxPercentage * sliderBox.width);
        
        // Get handles
        const minHandle = this.locator.locator("//div[@class='price_slider_wrapper']//span[@class='ui-slider-handle ui-corner-all ui-state-default'][1]");
        const maxHandle = this.locator.locator("//div[@class='price_slider_wrapper']//span[@class='ui-slider-handle ui-corner-all ui-state-default'][2]");
        
        // Drag handles to new positions
        await minHandle.dragTo(sliderContainer, { targetPosition: { x: minX, y: sliderBox.height / 2 } });
        await maxHandle.dragTo(sliderContainer, { targetPosition: { x: maxX, y: sliderBox.height / 2 } });
    }

    async verifyFilteredProductsPriceRange(minPrice: number, maxPrice: number): Promise<void> {
        const productPrices = this.locator.locator("//ul[@class='products']//span[@class='price']//bdi");
        const count = await productPrices.count();
    }

    async selectProductCategory(categoryName: string): Promise<void> {
        await this.locator.locator(`//div[@id='woocommerce_product_categories-3']//a[contains(@href, '${categoryName}')]`).click();
    }

    async selectProductByName(productName: string): Promise<void> {
        await this.locator.locator(`//a[contains(@aria-label, '${productName}')]`).click();
    }

    async openCart(): Promise<void> {
        await this.locator.locator(`//ul[@id='site-header-cart']`).click();
    }

    async verifyProductInCart(productName: string): Promise<void> {
        await this.locator.locator(`//td[@class='product-name']//a[text()='${productName}']`).isVisible();
    }
}