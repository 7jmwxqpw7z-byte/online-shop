import { test, expect } from '@playwright/test';
import { StorefrontPrimaryNavigationPage } from '../src/pages/features/storefront-primary-navigation-page/storefront-primary-navigation-page';
import { ShopPage } from '../src/pages/features/shop-page/shop-page';

test('Product Discovery', async ({ page }) => {

    test.step('Navigate main page', async () => {

        const storefrontPrimaryNavigationPage = StorefrontPrimaryNavigationPage.of(page.locator(`//div[@class='storefront-primary-navigation']`));

        await page.goto('https://fakestore.testelka.pl/');
        await storefrontPrimaryNavigationPage.navigateToMyAccountPage();
    });

    test.step('Search for products', async () => {

        const storefrontPrimaryNavigationPage = StorefrontPrimaryNavigationPage.of(page.locator(`//div[@class='storefront-primary-navigation']`));
        const shopPage = ShopPage.of(page.locator(`//div[@id='primary']`));
        await storefrontPrimaryNavigationPage.navigateToShopPage();
        await shopPage.useFastSearch('Windsurfing');
        await shopPage.adjustPriceFilter(100, 300);
        await shopPage.verifyFilteredProductsPriceRange(100, 300);     
    });

})