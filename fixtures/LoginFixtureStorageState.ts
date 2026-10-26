import { test as base, expect } from '@playwright/test'
import { HomePage } from './../pages/HomePage'
import { MyAccountPage } from '../pages/MyAccountPage'

export const test = base.extend<{ myAccountPage: MyAccountPage }>({
    myAccountPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: '.playwright/auth.json' })
        const page = await context.newPage()

        await page.goto('/opencart/index.php?route=account/account')

        const myAccountPage = new MyAccountPage(page);
        await use(myAccountPage)

        await context.close()
    }
})

export { expect }