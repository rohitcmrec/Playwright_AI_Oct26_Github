import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'

test.describe('login feature', () => {

    test('perform login', async ({ page }) => {
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home', { waitUntil: 'domcontentloaded' })
        await page.waitForLoadState('load')
        const homePage = new HomePage(page);
        const loginPage = await homePage.clickLogin()
        const myAccountPage = await loginPage.performLogin('rohit1@ibm.com', '1234')
        const title = await myAccountPage.getMyAccountPageTitle();
        expect(title).toBe('My Account')

    })
})