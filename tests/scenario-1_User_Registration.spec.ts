import {test} from '@playwright/test';
import { StorefrontPrimaryNavigationPage } from '../src/pages/features/storefront-primary-navigation-page/storefront-primary-navigation-page';
import { MyAccountPage } from '../src/pages/features';

test('User Registration', async ({ page }) => {

    test.step('Navigate to My Account page', async () => {

        const storefrontPrimaryNavigationPage = StorefrontPrimaryNavigationPage.of(page.locator(`//div[@class='storefront-primary-navigation']`));

        await page.goto('https://fakestore.testelka.pl/');
        await storefrontPrimaryNavigationPage.navigateToMyAccountPage();
  });


    test.step('Register a new user', async () => {
        
        const myAccountPage = MyAccountPage.of(page.locator(`//div[@id='primary']`));

        await myAccountPage.fillRegistrationForm('mr.test@inbox.com', 'VeryStrongPassword@123');
        await myAccountPage.verifyRegistrationSuccess('mr.test');

    });

});