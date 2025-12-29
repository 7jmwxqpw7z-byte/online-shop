import {test} from '@playwright/test';
import { StorefrontPrimaryNavigationPage } from '../src/pages/features/storefront-primary-navigation-page/storefront-primary-navigation-page';
import { ShopPage } from '../src/pages/features/shop-page/shop-page';

test('Navigate to Product group', async ({ page }) => {

    test.step('Navigate to main page', async () => {

        const storefrontPrimaryNavigationPage = StorefrontPrimaryNavigationPage.of(page.locator(`//div[@class='storefront-primary-navigation']`));

        await page.goto('https://fakestore.testelka.pl/');
        await storefrontPrimaryNavigationPage.navigateToMyAccountPage();
    });

  test.step('Navigate to Shop page', async () => {

        const storefrontPrimaryNavigationPage = StorefrontPrimaryNavigationPage.of(page.locator(`//div[@class='storefront-primary-navigation']`)); 
        const shopPage = ShopPage.of(page.locator(`//div[@id='primary']`));
        await storefrontPrimaryNavigationPage.navigateToShopPage();
        await shopPage.selectProductCategory('Windsurfing');
    });

})
