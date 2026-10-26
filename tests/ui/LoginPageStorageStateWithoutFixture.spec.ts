import { test, expect } from '@playwright/test'


test('testing strorage state via login', async ({ browser }) => {
    const context = await browser.newContext({ storageState: '.playwright/auth.json' })
    const page = await context.newPage()
    await page.goto('/opencart/index.php?route=account/account')
    console.log(await page.title())

})