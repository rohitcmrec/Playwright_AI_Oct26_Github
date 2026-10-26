import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { MyAccountPage } from '../pages/MyAccountPage'

export const test = base.extend<{ myAccountPage: MyAccountPage }>({
    myAccountPage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        const loginPage = await homePage.clickLogin()
        const myAccountPage = await loginPage.performLogin('rohit1@ibm.com', '1234')
        await use(myAccountPage)
    }
})

export { expect }