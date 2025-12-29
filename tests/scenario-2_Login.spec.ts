import {test} from '@playwright/test';
import { StorefrontPrimaryNavigationPage } from '../src/pages/features/storefront-primary-navigation-page/storefront-primary-navigation-page';
import { MyAccountPage } from '../src/pages/features';

test('Login and verify session', async ({ page }) => {

    test.step('Navigate to My Account page', async () => {

        const storefrontPrimaryNavigationPage = StorefrontPrimaryNavigationPage.of(page.locator(`//div[@class='storefront-primary-navigation']`));

        await page.goto('https://fakestore.testelka.pl/');
        await storefrontPrimaryNavigationPage.navigateToMyAccountPage();
  });

    test.step('Login to my account', async () => {
        // as precondition we need to have account created
        const myAccountPage = MyAccountPage.of(page.locator(`//div[@id='primary']`));

        await myAccountPage.fillLoginForm('mr.test@inbox.com', 'VeryStrongPassword@123');
    
        await page.keyboard.press('ControlOrMeta+r'); // refresh the page implemented for cross-platform compatibility (Ctrl on Windows/Linux, Cmd on Mac)
        await myAccountPage.verifyLoginSuccess('mr.test');
    });

    test.step('Verify session persistence after page reload', async () => {
        const myAccountPage = MyAccountPage.of(page.locator(`//div[@id='primary']`));
        await myAccountPage.verifyLoginSuccess('mr.test');
    });

    test.step('Logout from my account', async () => {
        const myAccountPage = MyAccountPage.of(page.locator(`//div[@id='primary']`));
        await myAccountPage.logout();
    });

});